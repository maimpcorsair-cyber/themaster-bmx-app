const sharp = require('sharp');
const fs = require('fs');

const svg = `<svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg">
  <rect width="1024" height="1024" fill="#000000"/>
  <text x="512" y="460" font-family="Arial, sans-serif" font-size="120" font-weight="bold" fill="white" text-anchor="middle">THE MASTER</text>
  <rect x="212" y="512" width="600" height="8" fill="white"/>
  <text x="512" y="600" font-family="Arial, sans-serif" font-size="64" font-weight="bold" fill="white" text-anchor="middle">BMX SCHOOL</text>
  <text x="512" y="680" font-family="Arial, sans-serif" font-size="40" fill="#888888" text-anchor="middle">สอนปั่นจักรยาน BMX</text>
  <circle cx="200" cy="800" r="80" stroke="white" stroke-width="16" fill="none"/>
  <circle cx="824" cy="800" r="80" stroke="white" stroke-width="16" fill="none"/>
  <path d="M200,800 L360,640 L512,600 L664,640 L824,800" stroke="white" stroke-width="16" fill="none"/>
  <circle cx="512" cy="460" r="48" fill="white"/>
</svg>`;

async function main() {
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  
  const res = './android/app/src/main/res/';
  const sizes = [48, 72, 96, 144, 192, 512];
  const dirs = ['mdpi', 'hdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi'];
  
  for (const dir of dirs) {
    for (const size of sizes) {
      const name = `${dir}/ic_launcher.png`;
      const roundName = `${dir}/ic_launcher_round.png`;
      const fgName = `${dir}/ic_launcher_foreground.png`;
      
      const resized = await sharp(buf).resize(size, size).toBuffer();
      fs.writeFileSync(res + name, resized);
      fs.writeFileSync(res + roundName, resized);
      if (size <= 96) fs.writeFileSync(res + fgName, buf);
    }
  }
  fs.writeFileSync(res + 'xxxhdpi/ic_launcher_foreground.png', buf);
  console.log('done');
}

main().catch(console.error);