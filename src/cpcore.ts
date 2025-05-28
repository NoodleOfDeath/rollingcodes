import fs from 'fs';
import p from 'path';

const ENV = process.argv[2];
const EXC = process.argv[3];

if (!ENV) {
  throw new Error('Missing environment argument');
}

const SRC = p.resolve('../core');
const DST = p.resolve('./src/core');

const filter = (src: string) => {
  if (/\/client/.test(src) && ENV !== 'client') {
    return false;
  }
  if (EXC && new RegExp(EXC).test(src)) {
    return false;
  }
  return true;
};

if (fs.existsSync(DST)) {
  fs.rmSync(DST, { recursive: true });
}
fs.mkdirSync(DST, { recursive: true });
fs.cpSync(SRC, DST, { filter, recursive: true });
