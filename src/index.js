import _ from 'lodash';
import parseFile from './parser.js';
import formatDiff from './formatters/index.js';

const buildDiffTree = (obj1, obj2) => {
  const keys = _.sortBy(_.uniq([...Object.keys(obj1), ...Object.keys(obj2)]));
  return keys.map((key) => {
    const [val1, val2] = [obj1[key], obj2[key]];

    if (_.isPlainObject(val1) && _.isPlainObject(val2)) {
      return { key, status: 'nested', children: buildDiffTree(val1, val2) };
    }

    if (Object.prototype.hasOwnProperty.call(obj1, key)
    && Object.prototype.hasOwnProperty.call(obj2, key)) {
      return val1 === val2
        ? { key, status: 'unmodified', value: val1 }
        : {
          key, status: 'updated', previous: val1, current: val2,
        };
    }

    return Object.prototype.hasOwnProperty.call(obj1, key)
      ? { key, status: 'removed', value: val1 }
      : { key, status: 'added', value: val2 };
  });
};

export default (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  const diffTree = buildDiffTree(data1, data2);
  return formatDiff(diffTree, format);
};
