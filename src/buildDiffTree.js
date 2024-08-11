import _ from 'lodash';

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

export default buildDiffTree;
