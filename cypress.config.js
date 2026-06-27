const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config);

  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    }),
  );

  return config;
}

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com',
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents,
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 12000,
    requestTimeout: 15000,
    responseTimeout: 30000,
    video: true,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false,
    retries: {
      runMode: 1,
      openMode: 0
    },
    env: {
      trelloActionUrl: 'https://api.trello.com/1/actions/592f11060f95a3d3d46a987a',
      searchProduct: 'dress'
    }
  }
});
