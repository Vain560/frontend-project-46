import stylish from './stylish.js';
import plain from './plain.js';

export default (diffTree, format) => {
  if (format === 'stylish') return stylish(diffTree);
  if (format === 'plain') return plain(diffTree);
  throw new Error(`Unknown format: ${format}`);
}
