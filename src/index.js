import _ from 'lodash';
import readAndParse from './parsers.js';

const generateDiff = (filepath1, filepath2) => {
  const obj1 = readAndParse(filepath1);
  const obj2 = readAndParse(filepath2);

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  const body = sortedKeys.map((key) => {
    const val1 = `${key}: ${obj1[key]}`;
    const val2 = `${key}: ${obj2[key]}`;
    if (!Object.hasOwn(obj1, key)) return `  + ${val2}`;
    if (!Object.hasOwn(obj2, key)) return `  - ${val1}`;
    if (obj1[key] === obj2[key]) return `    ${val1}`;
    return `  - ${val1}\n  + ${val2}`;
  }).join('\n');
  const diff = `{\n${body}\n}`;

  return diff;
};

export default generateDiff;
