import fs from 'fs';
import path from 'path';

export default (filepath) => {
	const absolutePath = path.resolve(process.cwd(), filepath);
	const fileContent = fs.readFileSync(absolutePath, 'utf-8');
	const ext = path.extname(filepath).toLowerCase();

	let data;
	if (ext ==='.json') data = JSON.parse(fileContent);
	else throw new Error(`Unsupported file format: ${ext}`);

	return data;
};

