module.exports = `
    "build": "webpack --config webpack.prod.js",
    "start": "webpack-dev-server --port 8031 --open --config webpack.dev.js",
    "test": "jest",
    "lint": "eslint *.js src/*.js src/*/*.js ",
    "precommit": "yarn build && yarn lint && yarn test",
    "commitmsg": "commitlint -e $GIT_PARAMS",
    "prepush": "yarn lint && yarn test"
    `;
