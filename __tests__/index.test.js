import { test, expect, describe } from '@jest/globals';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '../src/index.js';

const getFixturesPath = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.join(__dirname, '..', '__fixtures__', filename);
};

const readFile = (filename) => readFileSync(getFixturesPath(filename), 'utf8');

describe.each(['stylish', 'plain', 'json'])('output format %s', (format) => {
  const result = readFile(`result_${format}.txt`);

  test.each(['json', 'yml'])('file format %s', (ext) => {
    const filename1 = getFixturesPath(`file1.${ext}`);
    const filename2 = getFixturesPath(`file2.${ext}`);
    expect(gendiff(filename1, filename2, format)).toEqual(result);
  });
});
