import {
  getPath,
  readFile,
  getFileFormat,
  parse,
} from './parsers.js';
import getFormatter from './formatters/index.js';
import generateDiff from './generatediff.js';

const gendiff = (filename1, filename2, formatName = 'stylish') => {
  const path1 = getPath(filename1);
  const obj1 = parse(readFile(path1), getFileFormat(filename1));

  const path2 = getPath(filename2);
  const obj2 = parse(readFile(path2), getFileFormat(filename2));

  const diff = generateDiff(obj1, obj2);
  const formatter = getFormatter(formatName);
  return formatter(diff);
};

export default gendiff;
