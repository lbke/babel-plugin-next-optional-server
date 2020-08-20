// For Jest + TS
// @see https://jestjs.io/docs/en/getting-started#using-typescript
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
};
