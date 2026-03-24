#!/usr/bin/env node
/**
 * Hook: brand-color-validator.js
 * Validates that TSX components only use on-brand Tailwind colors.
 *
 * Supports Claude Code hook protocol (stdin JSON) and CLI argument.
 * Exit code 2 = block the operation (Claude Code hook convention).
 *
 * Dualys Brand Colors:
 * - primary-* (black scale)
 * - accent-* (blue #4F61E7)
 * - neutral-* (grays)
 * - semantic: success, warning, destructive, info
 *
 * Banned colors: purple, violet, indigo, pink, rose, fuchsia, cyan, sky, lime, orange
 */

const fs = require('fs');
const path = require('path');

function validate(filePath) {
  // Only validate TSX/JSX files in src/
  if (!filePath) { process.exit(0); }
  const normalized = filePath.replace(/\\/g, '/');
  if (!normalized.includes('/src/') || !normalized.match(/\.(tsx|jsx)$/)) {
    process.exit(0);
  }

  let content;
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    process.exit(0); // File might not exist yet during Write preview
  }

  const violations = [];

  // Banned Tailwind color families
  const bannedColors = [
    'purple', 'violet', 'indigo',
    'pink', 'rose', 'fuchsia',
    'cyan', 'sky', 'lime', 'orange',
    'teal', 'emerald'
  ];

  const colorPrefixes = ['bg', 'text', 'border', 'from', 'to', 'via', 'ring', 'outline', 'fill', 'stroke', 'divide', 'placeholder'];

  for (const color of bannedColors) {
    for (const prefix of colorPrefixes) {
      const pattern = new RegExp(`${prefix}-${color}(-\\d+)?`, 'g');
      const matches = content.match(pattern);
      if (matches) {
        violations.push({
          type: 'OFF-BRAND',
          classes: [...new Set(matches)],
          suggestion: `Replace ${color}-* with accent-*, neutral-*, or primary-*`
        });
      }
    }
  }

  // Check hardcoded hex colors (excluding brand)
  const allowedHex = ['#000000', '#ffffff', '#fff', '#000', '#4f61e7', '#4F61E7'];
  const hexMatches = content.match(/#[0-9a-fA-F]{3,6}(?![0-9a-fA-F])/g);

  if (hexMatches) {
    const invalid = hexMatches.filter(hex =>
      !allowedHex.includes(hex.toLowerCase()) && !allowedHex.includes(hex.toUpperCase())
    );
    if (invalid.length > 0) {
      violations.push({
        type: 'HARDCODED-COLOR',
        classes: [...new Set(invalid)],
        suggestion: 'Use Tailwind tokens: primary-*, accent-*, neutral-*'
      });
    }
  }

  const fileName = path.basename(filePath);

  if (violations.length === 0) {
    process.exit(0);
  }

  // Output violations to stderr (Claude Code reads stderr for hook feedback)
  let msg = `\nBRAND COLOR VIOLATIONS: ${fileName}\n`;
  msg += '─'.repeat(50) + '\n';
  let total = 0;
  violations.forEach(v => {
    msg += `[${v.type}] ${v.classes.join(', ')}\n`;
    msg += `   Fix: ${v.suggestion}\n`;
    total += v.classes.length;
  });
  msg += '─'.repeat(50) + '\n';
  msg += `${total} violations. Use: primary-*, accent-*, neutral-*, or semantic colors.\n`;

  process.stderr.write(msg);
  // Exit 2 = block the operation in Claude Code hooks
  process.exit(2);
}

// Main: determine file path from CLI arg, env var, or stdin
const directPath = process.argv[2] || process.env.CLAUDE_FILE_PATH;

if (directPath) {
  validate(directPath);
} else {
  // Read from stdin async (Claude Code hook protocol: JSON on stdin)
  let data = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (chunk) => { data += chunk; });
  process.stdin.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      validate(parsed.tool_input?.file_path || '');
    } catch {
      process.exit(0);
    }
  });
}
