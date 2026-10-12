import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Create clean, high-contrast LoupeCare Brand SVG
const brandSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f766e" />
      <stop offset="50%" stop-color="#0d9488" />
      <stop offset="100%" stop-color="#115e59" />
    </linearGradient>
    <linearGradient id="lensGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#99f6e4" stop-opacity="0.4" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#042f2e" flood-opacity="0.4" />
    </filter>
  </defs>

  <!-- Squircle Background -->
  <rect width="512" height="512" rx="128" fill="url(#bgGrad)" />

  <!-- Outer Protective Medical Ring -->
  <circle cx="256" cy="256" r="180" fill="none" stroke="#2dd4bf" stroke-width="4" stroke-dasharray="12 8" opacity="0.4" />

  <!-- Shield Shape -->
  <path d="M256 90 L370 140 C370 250 256 340 256 340 C256 340 142 250 142 140 Z" fill="#ffffff" fill-opacity="0.12" filter="url(#shadow)" />

  <!-- Surgical Loupe Optical Bar & Dual Barrel Lenses -->
  <g transform="translate(0, 20)">
    <!-- Bridge Titanium Frame -->
    <path d="M190 220 Q 256 200 322 220" stroke="#f0fdfa" stroke-width="14" stroke-linecap="round" fill="none" />
    <circle cx="256" cy="208" r="8" fill="#5eead4" />

    <!-- Left Barrel Lens -->
    <g transform="translate(170, 240)">
      <circle cx="0" cy="0" r="54" fill="#042f2e" stroke="#ccfbf1" stroke-width="8" />
      <circle cx="0" cy="0" r="42" fill="url(#lensGrad)" />
      <ellipse cx="-12" cy="-12" rx="16" ry="8" fill="#ffffff" opacity="0.8" transform="rotate(-30 -12 -12)" />
      <!-- Crosshair / reticle -->
      <line x1="-16" y1="0" x2="16" y2="0" stroke="#0f766e" stroke-width="2" opacity="0.6" />
      <line x1="0" y1="-16" x2="0" y2="16" stroke="#0f766e" stroke-width="2" opacity="0.6" />
    </g>

    <!-- Right Barrel Lens -->
    <g transform="translate(342, 240)">
      <circle cx="0" cy="0" r="54" fill="#042f2e" stroke="#ccfbf1" stroke-width="8" />
      <circle cx="0" cy="0" r="42" fill="url(#lensGrad)" />
      <ellipse cx="-12" cy="-12" rx="16" ry="8" fill="#ffffff" opacity="0.8" transform="rotate(-30 -12 -12)" />
      <!-- Crosshair / reticle -->
      <line x1="-16" y1="0" x2="16" y2="0" stroke="#0f766e" stroke-width="2" opacity="0.6" />
      <line x1="0" y1="-16" x2="0" y2="16" stroke="#0f766e" stroke-width="2" opacity="0.6" />
    </g>

    <!-- Center Precision Medical Cross -->
    <g transform="translate(256, 270)">
      <rect x="-8" y="-24" width="16" height="48" rx="5" fill="#2dd4bf" />
      <rect x="-24" y="-8" width="48" height="16" rx="5" fill="#2dd4bf" />
    </g>
  </g>

  <!-- Typography "LC" Badge at bottom -->
  <text x="256" y="440" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" fill="#ccfbf1" text-anchor="middle" letter-spacing="4">LOUPÈCARE</text>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'icon.svg'), brandSvg);
console.log('Wrote public/icon.svg');

// Simple solid CRC32 and PNG Chunk encoder
function createPNG(width, height, r, g, b, innerSizeRatio = 0.8) {
  // We construct a PNG image buffer with teal background and distinct emblem
  const rowLength = width * 4 + 1; // 1 filter byte + 4 bytes per pixel (RGBA)
  const rawData = Buffer.alloc(rowLength * height);

  const cx = width / 2;
  const cy = height / 2;
  const radius = (width / 2) * innerSizeRatio;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowLength;
    rawData[rowOffset] = 0; // Filter type 0 (None)

    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Check if inside inner symbol (cross or double circles)
      const isLeftEye = Math.hypot(x - (cx - width * 0.18), y - cy) < width * 0.12;
      const isRightEye = Math.hypot(x - (cx + width * 0.18), y - cy) < width * 0.12;
      const isCrossV = Math.abs(dx) < width * 0.03 && Math.abs(dy - height * 0.08) < height * 0.09;
      const isCrossH = Math.abs(dx) < width * 0.09 && Math.abs(dy - height * 0.08) < height * 0.03;

      if (isLeftEye || isRightEye) {
        // Lens glass light teal / white
        rawData[pixelOffset] = 230;     // R
        rawData[pixelOffset + 1] = 255; // G
        rawData[pixelOffset + 2] = 250; // B
        rawData[pixelOffset + 3] = 255; // A
      } else if (isCrossV || isCrossH) {
        // Mint cross
        rawData[pixelOffset] = 45;      // R
        rawData[pixelOffset + 1] = 212; // G
        rawData[pixelOffset + 2] = 191; // B
        rawData[pixelOffset + 3] = 255; // A
      } else if (dist < radius) {
        // Main Teal Base (#0d9488)
        rawData[pixelOffset] = r;
        rawData[pixelOffset + 1] = g;
        rawData[pixelOffset + 2] = b;
        rawData[pixelOffset + 3] = 255;
      } else {
        // Background
        rawData[pixelOffset] = Math.max(0, r - 20);
        rawData[pixelOffset + 1] = Math.max(0, g - 25);
        rawData[pixelOffset + 2] = Math.max(0, b - 20);
        rawData[pixelOffset + 3] = 255;
      }
    }
  }

  const compressedData = zlib.deflateSync(rawData);

  // PNG Signature
  const pngHeader = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR Chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // bit depth 8
  ihdrData.writeUInt8(6, 9); // color type RGBA (6)
  ihdrData.writeUInt8(0, 10); // compression method 0
  ihdrData.writeUInt8(0, 11); // filter method 0
  ihdrData.writeUInt8(0, 12); // interlace method 0

  const ihdrChunk = makeChunk('IHDR', ihdrData);
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([pngHeader, ihdrChunk, idatChunk, iendChunk]);
}

function makeChunk(type, data) {
  const length = data.length;
  const chunk = Buffer.alloc(4 + 4 + length + 4);
  chunk.writeUInt32BE(length, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const crc = crc32(chunk.subarray(4, 8 + length));
  chunk.writeUInt32BE(crc >>> 0, 8 + length);
  return chunk;
}

// CRC32 implementation
function crc32(buf) {
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ (-1)) >>> 0;
}

const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

// Generate PNG sizes
// Brand teal: R=13, G=148, B=136 (#0d9488)
const pwa192 = createPNG(192, 192, 13, 148, 136, 0.85);
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), pwa192);

const pwa512 = createPNG(512, 512, 13, 148, 136, 0.85);
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), pwa512);

// Maskable with safe padding (0.65 inner ratio)
const pwaMaskable = createPNG(512, 512, 13, 148, 136, 0.65);
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), pwaMaskable);

const appleTouch = createPNG(180, 180, 13, 148, 136, 0.85);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleTouch);

// Favicon
const favicon = createPNG(32, 32, 13, 148, 136, 0.85);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), favicon);

console.log('Generated all PWA compliant icons in /public successfully.');
