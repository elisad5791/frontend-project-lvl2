/* global test, expect */

import path from 'path';
import { readFileSync } from 'fs';
import generateDiff from '../src/index.js';

const getFixturesPath = (filename) => path.resolve('__fixtures__', filename);

test('file', () => {
  const filename1 = getFixturesPath('file1.json');
  const filename2 = getFixturesPath('file2.json');
  const resultname = getFixturesPath('file_result.txt');
  const result = readFileSync(resultname, 'utf8');
  expect(generateDiff(filename1, filename2)).toBe(result);
});

test('user', () => {
  const filename1 = getFixturesPath('user1.json');
  const filename2 = getFixturesPath('user2.json');
  const resultname = getFixturesPath('user_result.txt');
  const result = readFileSync(resultname, 'utf8');
  expect(generateDiff(filename1, filename2)).toBe(result);
});

test('media', () => {
  const filename1 = getFixturesPath('media1.json');
  const filename2 = getFixturesPath('media2.json');
  const resultname = getFixturesPath('media_result.txt');
  const result = readFileSync(resultname, 'utf8');
  expect(generateDiff(filename1, filename2)).toBe(result);
});
