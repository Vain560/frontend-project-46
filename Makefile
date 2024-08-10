install:
	npm ci
    npm install eslint-config-airbnb-base
lint:
	npx eslint .
publish:
	npm publish --dry-run
test:
	npx jest
test-coverage:
	npx jest --coverage --coverageProvider=v8
