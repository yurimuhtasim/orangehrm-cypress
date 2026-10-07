const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultBrowser: 'chrome',

  e2e: {
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});