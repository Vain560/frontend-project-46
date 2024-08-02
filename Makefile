install:
	npm ci
lint:
	npm run lint
publish:
	npm publish --dry-run
test:
	npx jest
test-coverage:
	npx jest --coverage --coverageProvider=v8