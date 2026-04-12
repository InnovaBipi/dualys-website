#!/usr/bin/env node
/**
 * Hook: brand-color-validator.js
 * Validates that TSX components only use on-brand Tailwind colors.
 *
 * Supports Claude Code hook protocol (stdin JSON) and CLI argument.
 * Exit code 2 = block the operation (Claude Code hook convention).
 *
 * Dualys Brand Colors (Figma redesign 2026):
 * - primary-* (black scale)
 * - accent-* (blue #4F61E7, Pantone 2132 C)
 * - neutral-* (blue-tinted grays, from Figma design system)
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

  // Check hardcoded hex colors (excluding brand palette)
  // Brand palette: primary (black), accent (blue), neutral (blue-tinted grays)
  const allowedHex = new Set([
    // Core
    '#000000', '#ffffff', '#fff', '#000',
    // Accent scale (Figma brand01-10)
    '#eef0fd', '#d8dbfb', '#b5bbfa', '#8f97f4', '#6b77ee',
    '#4f61e7', '#3d4fd6', '#2d3ec0', '#1e2ea8', '#111e8c', '#091268',
    // Neutral scale (Figma neutral01-12, blue-tinted)
    '#f7f8fa', '#eceef3', '#d5d9e4', '#b0b6c8', '#7e86a0',
    '#555d78', '#3a4157', '#252b3e', '#161928', '#080b15', '#010203',
  ]);
  const hexMatches = content.match(/#[0-9a-fA-F]{3,6}(?![0-9a-fA-F])/g);

  if (hexMatches) {
    const invalid = hexMatches.filter(hex => !allowedHex.has(hex.toLowerCase()));
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
