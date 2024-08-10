import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const fileContent = readFileSync(absolutePath, 'utf-8');
  const ext = path.extname(filepath).toLowerCase();

  if (ext === '.json') return JSON.parse(fileContent);
  if (ext === '.yml' || ext === '.yaml') return yaml.load(fileContent);
  throw new Error(`Unsupported file format: ${ext}`);
};
