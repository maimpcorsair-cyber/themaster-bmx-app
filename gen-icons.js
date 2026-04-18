const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svg = '<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg"><rect width="512" height="512" fill="#000"/><text x="256" y="200" font-family="Arial" font-size="60" font-weight="bold" fill="white" text-anchor="middle">THE</text><text x="256" y="270" font-family="Arial" font-size="70" font-weight="bold" fill="white" text-anchor="middle">MASTER</text><rect x="100" y="290" width="312" height="6" fill="white"/><text x="256" y="360" font-family="Arial" font-size="40" font-weight="bold" fill="white" text-anchor="middle">BMX SCHOOL</text><text x="256" y="420" font-family="Arial" font-size="24" fill="#888" text-anchor="middle">สอนปั่นจักรยาน BMX</text></svg>';

const base = './android/app/src/main/res/';
const dirs = ['mdpi','hdpi','xhdpi','xxhdpi','xxxhdpi'];

async function main() {
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  
  for (const dir of dirs) {
    const d = base + dir;
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  }
  
  const sizes = { mdpi: 48, hdpi: 72, xhdpi: 96, xxhdpi: 144, xxxhdpi: 192 };
  
  for (const [dir, size] of Object.entries(sizes)) {
    const resized = await sharp(buf).resize(size, size).toBuffer();
    fs.writeFileSync(base + dir + '/ic_launcher.png', resized);
    fs.writeFileSync(base + dir + '/ic_launcher_round.png', resized);
  }
  
  for (const dir of dirs) {
    fs.writeFileSync(base + dir + '/ic_launcher_foreground.png', buf);
  }
  
  console.log('All icons generated!');
}

main().catch(e => { console.error(e); process.exit(1); });