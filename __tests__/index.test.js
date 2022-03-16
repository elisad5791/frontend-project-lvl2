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

const result = {};

beforeAll(() => {
  result.stylish = readFileSync(getFixturesPath('result_stylish.txt'), 'utf8');
  result.plain = readFileSync(getFixturesPath('result_plain.txt'), 'utf8');
  result.json = readFileSync(getFixturesPath('result_json.txt'), 'utf8');
});

test.each(['json', 'yml'])('gendiff', (ext) => {
  const filename1 = getFixturesPath(`file1.${ext}`);
  const filename2 = getFixturesPath(`file2.${ext}`);

  expect(gendiff(filename1, filename2, 'stylish')).toEqual(result.stylish);
  expect(gendiff(filename1, filename2, 'plain')).toEqual(result.plain);
  expect(gendiff(filename1, filename2, 'json')).toEqual(result.json);
});
