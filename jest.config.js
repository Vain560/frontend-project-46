export default () => {
	testEnvironment: 'node',
	collectCoverage: true,
	coverageDirectory: 'coverage',
	testMatch: [`**/?(*.)+(spec|test).[jt]s?(x)`]
}