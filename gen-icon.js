const sharp = require('sharp');
const fs = require('fs');

async function generateIcon(size) {
  const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="#000000"/>
    <text x="${size/2}" y="${size*0.45}" font-family="Arial" font-size="${size*0.12}" font-weight="bold" fill="white" text-anchor="middle">THE MASTER</text>
    <rect x="${size*0.2}" y="${size*0.5}" width="${size*0.6}" height="${size*0.015}" fill="white"/>
    <text x="${size/2}" y="${size*0.58}" font-family="Arial" font-size="${size*0.055}" font-weight="bold" fill="white" text-anchor="middle">BMX SCHOOL</text>
    <text x="${size/2}" y="${size*0.66}" font-family="Arial" font-size="${size*0.04}" fill="#888888" text-anchor="middle">สอนปั่นจักรยาน BMX</text>
    <circle cx="${size*0.2}" cy="${size*0.8}" r="${size*0.08}" stroke="white" stroke-width="3" fill="none"/>
    <circle cx="${size*0.8}" cy="${size*0.8}" r="${size*0.08}" stroke="white" stroke-width="3" fill="none"/>
    <path d="M${size*0.2},${size*0.8} L${size*0.35},${size*0.65} L${size*0.5},${size*0.6} L${size*0.65},${size*0.65} L${size*0.8},${size*0.8}" stroke="white" stroke-width="3" fill="none"/>
    <circle cx="${size*0.5}" cy="${size*0.45}" r="${size*0.05}" fill="white"/>
  </svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

async function main() {
  const sizes = [
    ['mipmap-mdpi/ic_launcher.png', 48],
    ['mipmap-hdpi/ic_launcher.png', 72],
    ['mipmap-xhdpi/ic_launcher.png', 96],
    ['mipmap-xxhdpi/ic_launcher.png', 144],
    ['mipmap-xxxhdpi/ic_launcher.png', 192],
  ];
  const base = './android/app/src/main/res/';
  for (const [name, size] of sizes) {
    fs.writeFileSync(base + name, await generateIcon(size));
  }
  fs.writeFileSync(base + 'mipmap-hdpi/ic_launcher_foreground.png', await generateIcon(512));
  console.log('Done');
}
main().catch(console.error);