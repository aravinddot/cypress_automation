const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const addCucumberPreprocessorPlugin =
	require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;
const createEsbuildPlugin =
	require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
module.exports = defineConfig({
	e2e: {
		async setupNodeEvents(on, config) {
			const bundler = createBundler({
				plugins: [createEsbuildPlugin(config)],
			});

			on("file:preprocessor", bundler);
			await addCucumberPreprocessorPlugin(on, config);

			return config;
		},
		retries: {
			experimentalStrategy: 'detect-flake-and-pass-on-threshold',
			experimentalOptions: {
			  maxRetries: 2,
			  passesRequired: 2,
			},
			openMode: true,
			runMode: true,
		  },
		baseUrl: 'https://automationexercise.com/',
		specPattern: 'src/feature/*.feature',
		fixturesFolder: 'src/fixtures',
		redirectionLimit: 50,
		chromeWebSecurity: true,
		defaultCommandTimeout: 70000,
		execTimeout: 60000,
		pageLoadTimeout: 60000,
		viewportHeight: 720,
		viewportWidth: 1280,
	},
});
