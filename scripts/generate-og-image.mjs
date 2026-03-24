import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

async function generateOgImage() {
  const width = 1200;
  const height = 630;

  // Brand colors
  const black = '#000000';
  const accent = '#4F61E7';
  const white = '#FFFFFF';

  // Create OG image with SVG overlay
  const svgContent = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- Background: black -->
      <rect width="${width}" height="${height}" fill="${black}"/>

      <!-- Accent accent decorative elements -->
      <circle cx="1100" cy="100" r="200" fill="${accent}" opacity="0.15"/>
      <circle cx="100" cy="530" r="150" fill="${accent}" opacity="0.1"/>

      <!-- Accent line separator -->
      <rect x="100" y="300" width="80" height="4" fill="${accent}"/>

      <!-- Title: "dualys" brand text -->
      <text x="100" y="250" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="bold" fill="${white}">
        dual<tspan fill="${accent}">y</tspan>s
      </text>

      <!-- Tagline -->
      <text x="100" y="370" font-family="Arial, Helvetica, sans-serif" font-size="32" fill="${white}" opacity="0.9">
        Building Dual Capabilities
      </text>
      <text x="100" y="415" font-family="Arial, Helvetica, sans-serif" font-size="32" fill="${white}" opacity="0.9">
        for the Industry
      </text>

      <!-- Subtitle -->
      <text x="100" y="490" font-family="Arial, Helvetica, sans-serif" font-size="20" fill="${white}" opacity="0.6">
        Consultora estratégica para el sector defensa europeo
      </text>

      <!-- Website URL -->
      <text x="100" y="560" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="${accent}">
        dualys.eu
      </text>

      <!-- Accent dot (brand element) -->
      <rect x="188" y="265" width="8" height="8" fill="${accent}"/>
    </svg>
  `;

  await sharp(Buffer.from(svgContent))
    .png()
    .toFile(join(publicDir, 'og-image.png'));

  console.log('OG image generated: public/og-image.png (1200x630)');
}

generateOgImage().catch(console.error);
