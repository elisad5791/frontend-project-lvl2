import {
  getPath,
  readFile,
  getFileFormat,
  parse,
} from './parsers.js';
import getFormatting from './formatters/index.js';
import buildDiff from './builddiff.js';

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
