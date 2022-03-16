import { test, expect, beforeAll } from '@jest/globals';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '../src/index.js';

const getFixturesPath = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.join(__dirname, '..', '__fixtures__', filename);
};

let resultStylish;
let resultPlain;
let resultJson;

beforeAll(() => {
  resultStylish = readFileSync(getFixturesPath('result_stylish.txt'), 'utf8');
  resultPlain = readFileSync(getFixturesPath('result_plain.txt'), 'utf8');
  resultJson = readFileSync(getFixturesPath('result_json.txt'), 'utf8');
});

test.each(['json', 'yml'])('gendiff', (ext) => {
  const filename1 = getFixturesPath(`file1.${ext}`);
  const filename2 = getFixturesPath(`file2.${ext}`);

  expect(gendiff(filename1, filename2, 'stylish')).toEqual(resultStylish);
  expect(gendiff(filename1, filename2, 'plain')).toEqual(resultPlain);
  expect(gendiff(filename1, filename2, 'json')).toEqual(resultJson);
});
