/** @type {import('jest').Config} */
module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: ["**/*.test.ts?(x)", "**/*.test.js?(x)"],
  transform: {
    "^.+\\.(t|j)sx?$": "babel-jest",
  },
  testEnvironment: "jsdom",
  setupFiles: ["<rootDir>/test/polyfills.js"],
  setupFilesAfterEnv: ["<rootDir>/test/setupTests.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|scss)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|svg|webp|mp3|mp4)$":
      "<rootDir>/test/__mocks__/fileMock.js",
  },
  transformIgnorePatterns: ["/node_modules/(?!(@testing-library|nanoid)/)"],
  clearMocks: true,
  verbose: false,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx,js,jsx}",
    "!src/**/index.{ts,tsx,js,jsx}",
    "!src/**/types.{ts,tsx}",
  ],
};
