import fs from 'fs';
import path from 'path';

export default (filepath) => {
	const absolutePath = path.resolve(process.cwd(), filepath);
	const fileContent = fs.readFileSync(absolutePath, 'utf-8');
	const ext = path.extname(filepath).toLowerCase();

	if (ext ==='.json') return JSON.parse(fileContent);
	else throw new Error(`Unsupported file format: ${ext}`);
};

