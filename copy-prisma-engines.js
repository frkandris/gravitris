const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, 'node_modules/@prisma/engines');
const target = path.join(__dirname, 'node_modules/.prisma/client');

if (fs.existsSync(source)) {
  console.log('Copying Prisma engines...');
  const files = fs.readdirSync(source);
  files.forEach(file => {
    if (file.includes('libquery_engine-rhel-openssl')) {
      const srcFile = path.join(source, file);
      const destFile = path.join(target, file);
      fs.copyFileSync(srcFile, destFile);
      console.log(`Copied ${file}`);
    }
  });
  console.log('Prisma engines copied successfully');
}
