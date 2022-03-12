import path from 'path';
import { readFileSync } from 'fs';
import parse from './parsers.js';
import buildDiff from './builddiff.js';
import getFormatting from './formatters/index.js';

const getPath = (filename) => path.resolve(process.cwd(), filename);

const readFile = (filepath) => readFileSync(filepath, 'utf8');

const getFileFormat = (filename) => path.extname(filename).slice(1);

const gendiff = (filename1, filename2, formatName = 'stylish') => {
  const path1 = getPath(filename1);
  const obj1 = parse(readFile(path1), getFileFormat(filename1));

  const path2 = getPath(filename2);
  const obj2 = parse(readFile(path2), getFileFormat(filename2));

  const diff = buildDiff(obj1, obj2);
  const formattedDiff = getFormatting(diff, formatName);
  return formattedDiff;
};

export default gendiff;
