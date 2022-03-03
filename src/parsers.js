import { readFileSync } from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const getPath = (filename) => path.resolve(process.cwd(), filename);

const readFile = (filepath) => readFileSync(filepath, 'utf8');

const getFileFormat = (filename) => path.extname(filename).slice(1);

const parse = (data, format) => {
  const parsers = { yml: yaml.load, json: JSON.parse };
  return parsers[format](data);
};

export {
  getPath,
  readFile,
  getFileFormat,
  parse,
};
