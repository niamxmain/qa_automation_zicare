const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "ozjv4z",
  reporter: "cypress-mochawesome-reporter",
  e2e: {
    baseUrl: "https://www.saucedemo.com/v1",
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    videosFolder: "cypress/video",
    defaultCommandTimeout: 5000,
    trashAssetsBeforeRuns: false,
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
});
