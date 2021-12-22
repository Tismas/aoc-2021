module.exports = {
  roots: ["<rootDir>/src"],
  setupFiles: ["./src/framework/index.ts"],
  testMatch: ["**/?(*.)+(spec|test|tests).+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
