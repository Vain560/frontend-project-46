import _ from 'lodash';

const stringify = (node) => {
  if (_.isPlainObject(node)) {
    return '[complex value]';
  }
  if (typeof node === 'string') {
    return `'${node}'`;
  }
  return node;
};

export default (diffTree) => {
  const iter = (node, path = '') => node
    .map(({
      key, status, value, previous, current, children,
    }) => {
      const currentPath = path ? `${path}.${key}` : key;
      switch (status) {
        case 'removed':
          return `Property '${currentPath}' was removed`;
        case 'added':
          return `Property '${currentPath}' was added with value: ${stringify(value)}`;
        case 'updated':
          return `Property '${currentPath}' was updated. From ${stringify(previous)} to ${stringify(current)}`;
        case 'nested':
          return iter(children, currentPath);
        default:
          return null;
      }
    })
    .filter(Boolean)
    .join('\n');

  return iter(diffTree);
};
