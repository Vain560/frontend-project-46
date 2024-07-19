import path from 'path';
import genDiff from '../bin/gendiff.js';

const getFixturePath = (filename) => path.join(__dirname, '.', '__fixtures__', filename);

test('genDiff', () => {
	const filepath1 = getFixturePath('file1.json');
	const filepath2 = getFixturePath('file2.json');
	const expected = `{
	- follow: false
	  host: hexlet.import
	- proxy: 123.234.53.22
	- timeuot: 50
	+ timeuot: 20
	+ verbose: true
}`;

    const result = genDiff(filepath1, filepath2);
    expect(result).toEqual(expected);
});
