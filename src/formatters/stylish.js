import _ from 'lodash';

const getSpaces = (depth) => '    '.repeat(depth);

const marks = {
  openBracket: '{',
  closeBracket: '}',
  removed: '- ',
  added: '+ ',
  unmodified: '  ',
  nested: '  ',
};

const stringify = (node, depth) => {
  if (!_.isPlainObject(node)) return `${node}`;

  const indent = getSpaces(depth);
  const entries = Object.entries(node)
    .map(([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`);

  return `${marks.openBracket}\n${entries.join('\n')}\n${getSpaces(depth - 1)}${marks.closeBracket}`;
};

const stylish = (diffTree) => {
  const iter = (nodes, depth) => {
    const indent = getSpaces(depth).slice(2);

    return [
      marks.openBracket,
      ...nodes.map(({
        key, status, value, previous, current, children,
      }) => {
        const prefix = `${indent}${marks[status]}${key}`;

        switch (status) {
          case 'removed':
            return `${prefix}: ${stringify(value, depth + 1)}`;
          case 'added':
            return `${prefix}: ${stringify(value, depth + 1)}`;
          case 'updated':
            return [
              `${indent}${marks.removed}${key}: ${stringify(previous, depth + 1)}`,
              `${indent}${marks.added}${key}: ${stringify(current, depth + 1)}`,
            ].join('\n');
          case 'nested':
            return `${prefix}: ${iter(children, depth + 1)}`;
          default:
            return `${prefix}: ${stringify(value, depth + 1)}`;
        }
      }),
      `${getSpaces(depth - 1)}${marks.closeBracket}`,
    ].join('\n');
  };

  return iter(diffTree, 1);
};

export default stylish;
