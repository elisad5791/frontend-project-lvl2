import { readFileSync } from 'fs';
import _ from 'lodash';

const generateDiff = (filepath1, filepath2) => {
  const filecontent1 = readFileSync(filepath1, 'utf8');
  const filecontent2 = readFileSync(filepath2, 'utf8');

  const json1 = JSON.parse(filecontent1);
  const json2 = JSON.parse(filecontent2);
  const keys1 = Object.keys(json1);
  const keys2 = Object.keys(json2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  const body = sortedKeys.map((key) => {
    const val1 = `${key}: ${json1[key]}`;
    const val2 = `${key}: ${json2[key]}`;
    if (!Object.hasOwn(json1, key)) return `  + ${val2}`;
    if (!Object.hasOwn(json2, key)) return `  - ${val1}`;
    if (json1[key] === json2[key])  return `    ${val1}`;
    return `  - ${val1}\n  + ${val2}`;
  }).join('\n');
  const diff = `{\n${body}\n}`;

  console.log(diff);
};

export default generateDiff;
