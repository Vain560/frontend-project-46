import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getfixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFixtureFile = (filename) => readFileSync(getfixturePath(filename), 'utf8').trim();
const diff = (filepath1, filepath2, format) => {
  const path1 = getfixturePath(filepath1);
  const path2 = getfixturePath(filepath2);
  return genDiff(path1, path2, format);
};

const tests = [
  {
    file1: 'filepath1.json',
    file2: 'filepath2.json',
    title: 'without format',
    ext: 'stylish.txt',
  },
  {
    file1: 'filepath1.json',
    file2: 'filepath2.json',
    title: 'Stylish json',
    format: 'stylish',
    ext: 'stylish.txt',
  },
  {
    file1: 'filepath1.yml',
    file2: 'filepath2.yml',
    title: 'Stylish yml',
    format: 'stylish',
    ext: 'stylish.txt',
  },
  {
    file1: 'filepath1.json',
    file2: 'filepath2.yml',
    title: 'Plain',
    format: 'plain',
    ext: 'plain.txt',
  },
  {
    file1: 'filepath1.json',
    file2: 'filepath2.yml',
    title: 'JSON',
    format: 'json',
    ext: 'json.txt',
  },
];

test.each(tests)('TEST: $title', ({
  file1, file2, format, ext,
}) => {
  const result = diff(file1, file2, format);
  const expected = readFixtureFile(ext);
  expect(result).toBe(expected);
});
