import { readFileSync } from 'fs';
import yaml from 'js-yaml';

export default (absolutePath, extname) => {
  const fileContent = readFileSync(absolutePath, 'utf-8');
  switch (extname) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yml':
    case '.yaml':
      return yaml.load(fileContent);
    default:
      throw new Error('Sorry, this format do not support!');
  }
};
