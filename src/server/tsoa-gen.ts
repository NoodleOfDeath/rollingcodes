import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

execSync('tsoa spec -c tsoa.config.json', { stdio: 'inherit' });

const TARGET = path.resolve('static', 'openapi.json');
console.log(TARGET);

console.log('Replacing bad names in openapi.json');
const contents = fs.readFileSync(TARGET, 'utf8');
fs.writeFileSync(
  TARGET, 
  contents
    .replace(/%[a-fA-F0-9]{2}/g, (_) => '-')
  , 'utf8'
);