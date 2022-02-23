import { readFileSync } from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const readAndParse = (filepath) => {
  const filecontent = readFileSync(filepath, 'utf8');
  const format = path.extname(filepath);
  const parse = format === '.yml' ? yaml.load : JSON.parse;
  const obj = parse(filecontent);
  return obj;
};

export default readAndParse;
