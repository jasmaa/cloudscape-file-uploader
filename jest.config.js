module.exports = {
  transformIgnorePatterns: ["node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
  },
  modulePathIgnorePatterns: ["examples"],
  testEnvironment: "jsdom",
};
