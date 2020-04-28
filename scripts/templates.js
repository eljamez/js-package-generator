const indexTemplate = require("./templates/indexTemplate");
const indexTemplateSpec = require("./templates/indexTemplateSpec");
const counterTemplate = require("./templates/counterTemplate");
const counterTemplateSpec = require("./templates/counterTemplateSpec");
const getDemoHTML = require("./templates/demoHTMLTemplate");
const demoJSTemplate = require("./templates/demoJSTemplate");
const getReadme = require("./templates/readmeTemplate");
const webpackCommonTemplate = require("./templates/webpackCommonTemplate");
const getWebpackDev = require("./templates/webpackDevTemplate");
const webpackProdTemplate = require("./templates/webpackProdTemplate");

module.exports = {
  babelrc: `{
    "presets": ["@babel/preset-env"]
  }`,
  eslintrc: `
    module.exports = {
      root: true,
      parserOptions: {
        parser: "babel-eslint",
        sourceType: "module",
        ecmaVersion: 6,
      },
      env: {
        browser: true,
        amd: true,
        node: true,
        "jest/globals": true,
        es6: true,
      },
      globals: { module: false },
      extends: "eslint:recommended",
      plugins: ["jest"],
    };
  `,
  gitignore: `
    .DS_Store
    node_modules/
    yarn-debug.log
    yarn-error.log
    coverage/
  `,
  readme: ({ packageName, description }) =>
    getReadme({
      packageName,
      description,
    }),
  webpackCommonTemplate,
  webpackDevTemplate: ({ packageName }) => getWebpackDev({ packageName }),
  webpackProdTemplate,
  indexTemplate,
  indexTemplateSpec,
  counterTemplate,
  counterTemplateSpec,
  demoHTMLTemplate: ({ packageName }) => getDemoHTML({ packageName }),
  demoJSTemplate,
  packageJsonObject: ({
    packageName,
    name,
    description,
    useJest,
    useESLint,
    useHusky,
  }) => {
    const jsonFields = {};

    const scripts = {
      build: "webpack --config webpack.prod.js",
      start: "webpack-dev-server --port 8031 --open --config webpack.dev.js",
      lint: "eslint *.js src/*.js src/*/*.js ",
      precommit: "yarn build && yarn lint && yarn test",
      prepush: "yarn lint && yarn test",
    };

    const devDependencies = {
      "@babel/cli": "^7.0.0",
      "@babel/core": "^7.0.0",
      "@babel/preset-env": "^7",
      "babel-core": "^7.0.0-bridge.0",
      "babel-loader": "^8.0.0",
      "clean-webpack-plugin": "^3.0.0",
      "html-webpack-plugin": "^4.2.1",
      prettier: "^2.0.5",
      "regenerator-runtime": "^0.11.1",
      "uglifyjs-webpack-plugin": "^1.2.5",
      webpack: "^4.43.0",
      "webpack-cli": "^3.3.11",
      "webpack-dev-server": "^3.10.3",
      "webpack-merge": "^4.2.2",
    };

    if (useJest) {
      scripts.test = "jest";
      devDependencies.jest = "^25.5.0";
      if (useESLint) {
        devDependencies["eslint-plugin-jest"] = "^23.8.2";
      }
      devDependencies["babel-jest"] = "^25.5.0";
      jsonFields.jest = {
        verbose: true,
        testURL: "http://localhost/",
      };
    }

    if (useESLint) {
      scripts.lint = "eslint *.js src/*.js src/*/*.js ";
      devDependencies.eslint = "^6.8.0";
      devDependencies["eslint-config-standard"] = "^14.1.1";
      devDependencies["eslint-loader"] = "^4.0.2";
      devDependencies["eslint-plugin-import"] = "^2.20.2";
      devDependencies["eslint-plugin-jest"] = "^23.8.2";
      devDependencies["eslint-plugin-node"] = "^11.1.0";
      devDependencies["eslint-plugin-promise"] = "^4.2.1";
      devDependencies["eslint-plugin-standard"] = "^4.0.1";
    }

    if (useHusky) {
      scripts.precommit = "yarn build && yarn lint && yarn test";
      scripts.prepush = "yarn lint && yarn test";
      devDependencies.husky = "^4.2.5";
    }

    return {
      name: packageName,
      description,
      author: name,
      main: "lib/index.min.js",
      version: "1.0.0",
      author: name,
      scripts,
      devDependencies,
      ...jsonFields,
    };
  },
};
