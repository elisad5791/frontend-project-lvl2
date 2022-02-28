/* global test, expect */

import { readFileSync } from 'fs';
import path from 'path';
import generateDiff from '../src/index.js';

const getFixturesPath = (filename) => path.resolve('__fixtures__', filename);

test.each(['json', 'yml'])('generateDiff', (ext) => {
  const filenameStylish = getFixturesPath('result_stylish.txt');
  const filenamePlain = getFixturesPath('result_plain.txt');
  const filenameJson = getFixturesPath('result_json.txt');

  const resultStylish = readFileSync(filenameStylish, 'utf8');
  const resultPlain = readFileSync(filenamePlain, 'utf8');
  const resultJson = readFileSync(filenameJson, 'utf8');

  const filename1 = getFixturesPath(`file1.${ext}`);
  const filename2 = getFixturesPath(`file2.${ext}`);

  expect(generateDiff(filename1, filename2, 'stylish')).toEqual(resultStylish);
  expect(generateDiff(filename1, filename2, 'plain')).toEqual(resultPlain);
  expect(generateDiff(filename1, filename2, 'json')).toEqual(resultJson);
});
