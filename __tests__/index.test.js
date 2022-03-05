import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '../src/index.js';

const getFixturesPath = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.join(__dirname, '..', '__fixtures__', filename);
};

test.each(['json', 'yml'])('gendiff', (ext) => {
  const filenameStylish = getFixturesPath('result_stylish.txt');
  const filenamePlain = getFixturesPath('result_plain.txt');
  const filenameJson = getFixturesPath('result_json.txt');

  const resultStylish = readFileSync(filenameStylish, 'utf8');
  const resultPlain = readFileSync(filenamePlain, 'utf8');
  const resultJson = readFileSync(filenameJson, 'utf8');

  const filename1 = getFixturesPath(`file1.${ext}`);
  const filename2 = getFixturesPath(`file2.${ext}`);

  expect(gendiff(filename1, filename2, 'stylish')).toEqual(resultStylish);
  expect(gendiff(filename1, filename2, 'plain')).toEqual(resultPlain);
  expect(gendiff(filename1, filename2, 'json')).toEqual(resultJson);
});
