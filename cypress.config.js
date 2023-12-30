const { defineConfig } = require("cypress");
const mysql = require("mysql");
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    ignoreVideos: false,
    videoOnFailOnly: true,
    inlineAssets: true,
    saveAllAttempts: false,
    debug: true,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // require plugin
      require('cypress-mochawesome-reporter/plugin')(on);
      on('before:run', async (details) => {
        console.log('override before:run');
        await beforeRunHook(details);
      });
      on('after:run', async () => {
        console.log('override after:run');
        await afterRunHook();
      });

      // db connection
      on("task", {
        queryDb: (query) => {
          console.log(query);
          return queryTestDb(query, config)
        },
      });
    },
    "env": {
      "db": {
        "server": '127.0.0.1',
        user: "root",
        password: "Aravind@03",
        database: "mydemo"
      }
    },

    baseUrl: 'https://automationexercise.com/',
    specPattern: 'cypress/e2e/*.cy.js',
    redirectionLimit: 50,
    pageLoadTimeout: 100000
  },
});

function queryTestDb(query, config) {
  // creates a new mysql connection using credentials from cypress.json
  const connection = mysql.createConnection(config.env.db);
  // start connection to db
  connection.connect();
  // exec query + disconnect to db as a promise
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error);
      else {
        connection.end();
        // console log results
        return resolve(results);
      }
    });
  });
}

