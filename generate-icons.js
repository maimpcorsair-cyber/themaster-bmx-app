const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateIcon(size) {
  // Create a simple icon with black background and text
  // Since we can't use SVG, create a programmatic icon
  
  const svg = `
  <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="#000000"/>
    <text x="${size/2}" y="${size*0.45}" font-family="Arial, sans-serif" font-size="${size*0.12}" font-weight="bold" fill="white" text-anchor="middle">THE MASTER</text>
    <rect x="${size*0.2}" y="${size*0.5}" width="${size*0.6}" height="${size*0.015}" fill="white"/>
    <text x="${size/2}" y="${size*0.58}" font-family="Arial, sans-serif" font-size="${size*0.055}" font-weight="bold" fill="white" text-anchor="middle">BMX SCHOOL</text>
    <text x="${size/2}" y="${size*0.66}" font-family="Arial, sans-serif" font-size="${size*0.04}" fill="#888888" text-anchor="middle">สอนปั่นจักรยาน BMX</text>
    
    <!-- Left wheel -->
    <circle cx="${size*0.2}" cy="${size*0.8}" r="${size*0.08}" stroke="white" stroke-width="3" fill="none"/>
    <!-- Right wheel -->
    <circle cx="${size*0.8}" cy="${size*0.8}" r="${size*0.08}" stroke="white" stroke-width="3" fill="none"/>
    <!-- Frame -->
    <path d="M${size*0.2},${size*0.8} L${size*0.35},${size*0.65} L${size*0.5},${size*0.6} L${size*0.65},${size*0.65} L${size*0.8},${size*0.8}" stroke="white" stroke-width="3" fill="none"/>
    <!-- Rider head -->
    <circle cx="${size*0.5}" cy="${size*0.45}" r="${size*0.05}" fill="white"/>
  </svg>`;

  return sharp(Buffer.from(svg)).png().toBuffer();
}

async function main() {
  const sizes = [
    { name: 'mipmap-mdpi/ic_launcher.png', size: 48 },
    { name: 'mipmap-mdpi/ic_launcher_round.png', size: 48 },
    { name: 'mipmap-hdpi/ic_launcher.png', size: 72 },
    { name: 'mipmap-hdpi/ic_launcher_round.png', size: 72 },
    { name: 'mipmap-xhdpi/ic_launcher.png', size: 96 },
    { name: 'mipmap-xhdpi/ic_launcher_round.png', size: 96 },
    { name: 'mipmap-xxhdpi/ic_launcher.png', size: 144 },
    { name: 'mipmap-xxhdpi/ic_launcher_round.png', size: 144 },
    { name: 'mipmap-xxxhdpi/ic_launcher.png', size: 192 },
    { name: 'mipmap-xxxhdpi/ic_launcher_round.png', size: 192 },
  ];

  const basePath = './android/app/src/main/res/';
  
  // Generate launcher icons
  for (const { name, size } of sizes) {
    const buffer = await generateIcon(size);
    const filePath = path.join(basePath, name);
    fs.writeFileSync(filePath, buffer);
    console.log(`Generated: ${name} (${size}x${size})`);
  }
  
  // Generate adaptive icon foreground (larger for adaptive)
  const adaptiveBuffer = await generateIcon(512);
  fs.writeFileSync(path.join(basePath, 'mipmap-hdpi/ic_launcher_foreground.png'), adaptiveBuffer);
  fs.writeFileSync(path.join(basePath, 'mipmap-mdpi/ic_launcher_foreground.png'), adaptiveBuffer);
  fs.writeFileSync(path.join(basePath, 'mipmap-xhdpi/ic_launcher_foreground.png'), adaptiveBuffer);
  fs.writeFileSync(path.join(basePath, 'mipmap-xxhdpi/ic_launcher_foreground.png'), adaptiveBuffer);
  fs.writeFileSync(path.join(basePath, 'mipmap-xxxhdpi/ic_launcher_foreground.png'), adaptiveBuffer);
  
  console.log('All icons generated!');
}

main().catch(console.error);