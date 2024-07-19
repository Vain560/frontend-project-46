#!/usr/bin/env node

import { Command } from 'commander';
import parseFile from '../src/parser.js'
import _ from 'lodash';

const program = new Command();

const genDiff = (filepath1, filepath2) => {
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

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
  	const result = genDiff(filepath1, filepath2);
  	console.log(result);
  })
  .parse(process.argv);

if (program.args.length < 2) program.help();
