import _ from 'lodash';

const stringify = (node) => 
  _.isPlainObject(node) ? '[complex value]' : typeof node === 'string' ? `'${node}'` : node;

export default (diffTree) => {
  const iter = (node, path = '') => 
    node.map(({ key, status, value, previous, current, children }) => {
      const currentPath = path ? `${path}.${key}` : key;  // Формируем currentPath без удаления первого символа
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
