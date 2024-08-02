import parseFile from './parser.js'
import _ from 'lodash';

export default (filepath1, filepath2) => {
	const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const allKeys = _.union(Object.keys(data1), Object.keys(data2)).sort();

  const diff = allKeys.map((key) => {
  	if(!_.has(data2, key)) return `  - ${key}: ${data1[key]}`;
  	if(!_.has(data1, key)) return `  + ${key}: ${data2[key]}`;
  	if (data1[key] !== data2[key]) return [`  - ${key}: ${data1[key]}`, `  + ${key}: ${data2[key]}`];
  	return `    ${key}: ${data1[key]}`;
  }).flat();

  return`{\n${diff.join(`\n`)}\n}`;
};