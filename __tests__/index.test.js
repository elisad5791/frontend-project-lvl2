/* global test, expect, beforeEach */

import { readFileSync } from 'fs';
import path from 'path';
import generateDiff from '../src/index.js';

const getFixturesPath = (filename) => path.resolve('__fixtures__', filename);

let result1, result2, result3;

beforeEach(() => {
  const resultname1 = getFixturesPath('file_result.txt');
  const resultname2 = getFixturesPath('media_result.txt');
  const resultname3 = getFixturesPath('user_result.txt');
  result1 = readFileSync(resultname1, 'utf8');
  result2 = readFileSync(resultname2, 'utf8');
  result3 = readFileSync(resultname3, 'utf8');
});

test('json', () => {
  const filename1 = getFixturesPath('file1.json');
  const filename2 = getFixturesPath('file2.json');
  const filename3 = getFixturesPath('media1.json');
  const filename4 = getFixturesPath('media2.json');
  const filename5 = getFixturesPath('user1.json');
  const filename6 = getFixturesPath('user2.json');
  
  expect(generateDiff(filename1, filename2)).toBe(result1);
  expect(generateDiff(filename3, filename4)).toBe(result2);
  expect(generateDiff(filename5, filename6)).toBe(result3);
});

test('yml', () => {
  const filename1 = getFixturesPath('file1.yml');
  const filename2 = getFixturesPath('file2.yml');
  const filename3 = getFixturesPath('media1.yml');
  const filename4 = getFixturesPath('media2.yml');
  const filename5 = getFixturesPath('user1.yml');
  const filename6 = getFixturesPath('user2.yml');

  expect(generateDiff(filename1, filename2)).toBe(result1);
  expect(generateDiff(filename3, filename4)).toBe(result2);
  expect(generateDiff(filename5, filename6)).toBe(result3);
});
