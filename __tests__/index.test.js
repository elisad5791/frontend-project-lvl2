/* global test, expect, beforeEach */

import { readFileSync } from 'fs';
import path from 'path';
import generateDiff from '../src/index.js';

const getFixturesPath = (filename) => path.resolve('__fixtures__', filename);

let result;

beforeEach(() => {
  const resultname = getFixturesPath('file_result.txt');
  result = readFileSync(resultname, 'utf8');
});

test('json', () => {
  const filename1 = getFixturesPath('file1.json');
  const filename2 = getFixturesPath('file2.json');
  expect(generateDiff(filename1, filename2)).toBe(result);
});

test('yml', () => {
  const filename1 = getFixturesPath('file1.yml');
  const filename2 = getFixturesPath('file2.yml');
  expect(generateDiff(filename1, filename2)).toBe(result);
});
