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
  
  // Generate foreground (512x512)
  fs.writeFileSync(res + 'mipmap-hdpi/ic_launcher_foreground.png', buf);
  fs.writeFileSync(res + 'mipmap-mdpi/ic_launcher_foreground.png', buf);
  fs.writeFileSync(res + 'mipmap-xhdpi/ic_launcher_foreground.png', buf);
  fs.writeFileSync(res + 'mipmap-xxhdpi/ic_launcher_foreground.png', buf);
  fs.writeFileSync(res + 'mipmap-xxxhdpi/ic_launcher_foreground.png', buf);
  console.log('Created foreground icons');
  
  // Generate launcher icons for each density
  const densities = [
    { dir: 'mdpi', size: 48 },
    { dir: 'hdpi', size: 72 },
    { dir: 'xhdpi', size: 96 },
    { dir: 'xxhdpi', size: 144 },
    { dir: 'xxxhdpi', size: 192 },
  ];
  
  for (const d of densities) {
    const resized = await sharp(buf).resize(d.size, d.size).toBuffer();
    fs.writeFileSync(res + d.dir + '/ic_launcher.png', resized);
    fs.writeFileSync(res + d.dir + '/ic_launcher_round.png', resized);
    fs.writeFileSync(res + d.dir + '/ic_launcher_foreground.png', buf); // Use full size for foreground
    console.log('Created ' + d.dir + ' icons (' + d.size + 'px)');
  }
  
  console.log('All icons generated!');
}

main().catch(e => { console.error(e); process.exit(1); });