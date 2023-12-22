const { defineConfig } = require("cypress");
const sqlServer = require('cypress-sql-server');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.db = {
        userName: "sqlServerDB",
        password: "1234",
        server: "MSI",
        options: {
          database: "cypressAutomation",
          encrypt: true,
          rowCollectionOnRequestCompletion : true
        }
      }
      tasks = sqlServer.loadDBPlugin(config.db);
      on('task', tasks);
    },
    baseUrl: 'https://automationexercise.com/',
    specPattern: 'cypress/e2e/*.cy.js',
    redirectionLimit: 50
  },
});
