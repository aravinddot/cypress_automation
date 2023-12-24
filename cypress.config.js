const { defineConfig } = require("cypress");
const mysql = require("mysql");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        queryDb: (query) => {
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
    redirectionLimit: 50
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
