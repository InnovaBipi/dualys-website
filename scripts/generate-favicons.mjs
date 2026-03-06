import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const logoPath = join(publicDir, 'logo.png');

async function generateFavicons() {
  console.log('Reading logo from:', logoPath);

  const logo = sharp(logoPath);
  const metadata = await logo.metadata();
  console.log('Logo dimensions:', metadata.width, 'x', metadata.height);

  // For favicons, we need to create a square crop centered on the image
  // The logo is wide, so we'll take a center portion
  const size = Math.min(metadata.width, metadata.height);
  const left = Math.floor((metadata.width - size) / 2);
  const top = Math.floor((metadata.height - size) / 2);

  // Generate favicon-16x16.png
  await sharp(logoPath)
    .resize(16, 16, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .toFile(join(publicDir, 'favicon-16x16.png'));
  console.log('Generated favicon-16x16.png');

  // Generate favicon-32x32.png
  await sharp(logoPath)
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .toFile(join(publicDir, 'favicon-32x32.png'));
  console.log('Generated favicon-32x32.png');

  // Generate apple-touch-icon.png (180x180 with padding)
  await sharp(logoPath)
    .resize(160, 160, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .extend({
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .toFile(join(publicDir, 'apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');

  // Generate OG image (1200x630)
  // Create a white background with the logo centered
  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
    .composite([
      {
        input: await sharp(logoPath)
          .resize(800, 200, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
          .toBuffer(),
        gravity: 'center'
      }
    ])
    .png()
    .toFile(join(publicDir, 'og-image.png'));
  console.log('Generated og-image.png');

  console.log('All favicons generated successfully!');
}

generateFavicons().catch(console.error);
