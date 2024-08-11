import path from 'path';
import parseFile from './parser.js';
import formatDiff from './formatters/index.js';
import buildDiffTree from './buildDiffTree.js';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const getExtname = (filepath) => path.extname(filepath).toLowerCase();

export default (filepath1, filepath2, format = 'stylish') => {
  const path1 = getAbsolutePath(filepath1);
  const path2 = getAbsolutePath(filepath2);
  const ext1 = getExtname(path1);
  const ext2 = getExtname(path2);
  const data1 = parseFile(path1, ext1);
  const data2 = parseFile(path2, ext2);
  const diffTree = buildDiffTree(data1, data2);
  return formatDiff(diffTree, format);
};
