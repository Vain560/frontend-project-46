#!/usr/bin/env node

import { Command } from 'commander';
import parseFile from '../src/parser.js'

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2, options) => {
  	const data1 = parseFile(filepath1);
  	const data2 = parseFile(filepath2);

  	console.log('Data from File1', data1);
    console.log('Data from File2', data2);
    console.log('Format:', options.format);
  })
  .parse(process.argv);

if (program.args.length < 2) program.help();
