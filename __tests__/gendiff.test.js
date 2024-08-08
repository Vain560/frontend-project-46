import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getfixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFixtureFile = (filename) => readFileSync(getfixturePath(filename), 'utf8').trim();
const diff = (filepath1, filepath2) => {
  const path1 = getfixturePath(filepath1);
  const path2 = getfixturePath(filepath2);
  return genDiff(path1, path2);
};

const tests = [
  {
    file1: 'filepath1.json',
    file2: 'filepath2.json',
    title: 'JSON',
    format: 'stylish'
  },
  {
    file1: 'filepath1.yml',
    file2: 'filepath2.yml',
    title: 'YML',
    format: 'stylish'
  },
  {
    file1: 'filepath1.json',
    file2: 'filepath2.yml',
    title: 'mixed',
    format: 'stylish'
  }
];

test.each(tests)('TEST: $title', ({
  file1, file2, format
}) => {
  const result = diff(file1, file2, format);
  const expected = readFixtureFile('expected.txt');
  expect(result).toBe(expected);
});