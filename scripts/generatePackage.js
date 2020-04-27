const path = require("path");
const fs = require("fs");
const chalk = require("chalk");

const templates = require("./templates");
const { prettify } = require("./prettify");

async function generateFile({
  config,
  directoryPath,
  filePath,
  template,
  parser = "babel",
}) {
  console.log(chalk.green(`    Generating ${chalk.magenta(filePath)}`));
  const content =
    typeof templates[template] === "string"
      ? templates[template]
      : templates[template](config);

  const contentString =
    typeof content === "object" ? JSON.stringify(content) : content;
  const prettyFile =
    parser === "none"
      ? content
      : await prettify({
          content: contentString,
          parser,
          onError: (e) => {
            console.error(
              chalk.red(`
    Prettier failed to prettify ${chalk.white(filePath)}.
    
    ${e}`)
            );
          },
        });
  fs.writeFileSync(path.resolve(directoryPath, filePath), prettyFile);
}

function generatePackage(config) {
  const directoryPath = path.resolve(`${config.packageName}`);
  fs.mkdirSync(directoryPath);
  fs.mkdirSync(path.resolve(directoryPath, "src"));
  fs.mkdirSync(path.resolve(directoryPath, "src/modules"));
  fs.mkdirSync(path.resolve(directoryPath, "demo"));

  generateFile({
    config,
    directoryPath,
    filePath: ".babelrc",
    template: "babelrc",
    parser: "none",
  });

  if (config.useESLint) {
    generateFile({
      config,
      directoryPath,
      filePath: ".eslintrc.js",
      template: "eslintrc",
      parser: "none",
    });
  }

  generateFile({
    config,
    directoryPath,
    filePath: ".gitignore",
    template: "gitignore",
    parser: "none",
  });

  generateFile({
    config,
    directoryPath,
    filePath: "package.json",
    template: "packageJsonObject",
    parser: "json",
  });

  generateFile({
    config,
    directoryPath,
    filePath: "webpack.common.js",
    template: "webpackCommonTemplate",
  });

  generateFile({
    config,
    directoryPath,
    filePath: "webpack.dev.js",
    template: "webpackDevTemplate",
  });

  generateFile({
    config,
    directoryPath,
    filePath: "webpack.prod.js",
    template: "webpackProdTemplate",
  });

  generateFile({
    config,
    directoryPath,
    filePath: "README.md",
    template: "readme",
    parser: "none",
  });

  generateFile({
    config,
    directoryPath,
    filePath: "src/index.js",
    template: "indexTemplate",
  });

  generateFile({
    config,
    directoryPath,
    filePath: "src/index.spec.js",
    template: "indexTemplateSpec",
  });

  generateFile({
    config,
    directoryPath,
    filePath: "src/modules/counter.js",
    template: "counterTemplate",
  });

  generateFile({
    config,
    directoryPath,
    filePath: "src/modules/counter.spec.js",
    template: "counterTemplateSpec",
  });

  generateFile({
    config,
    directoryPath,
    filePath: "demo/index.html",
    template: "demoHTMLTemplate",
    parser: "none",
  });

  generateFile({
    config,
    directoryPath,
    filePath: "demo/index.js",
    template: "demoJSTemplate",
  });

  return;

  generateFile({
    config,
    directoryPath,
    filePath: ".npmrc",
    template: "npmrc",
    parser: "none",
  });

  generateFile({
    config,
    directoryPath,
    filePath: "jest.config.js",
    template: "jestConfig",
  });

  generateFile({
    config,
    directoryPath,
    filePath: "package.json",
    template: "packageJsonObject",
    parser: "json",
  });

  generateFile({
    config,
    directoryPath,
    filePath: "src/MyComponent.tsx",
    template: "srcFile",
  });

  generateFile({
    config,
    directoryPath,
    filePath: "src/styles/MyComponent.scss",
    template: "scssFile",
    parser: "scss",
  });

  generateFile({
    config,
    directoryPath,
    filePath: "src/__tests__/MyComponent_spec.tsx",
    template: "testFile",
  });

  if (config.useStorybook) {
    fs.mkdirSync(path.resolve(directoryPath, "src/__stories__"));
    generateFile({
      config,
      directoryPath,
      filePath: "src/__stories__/MyComponent.story.tsx",
      template: "storyFile",
    });
  }

  generateFile({
    config,
    directoryPath,
    filePath: "exports/MyComponent.ts",
    template: "exportFile",
  });

  console.log("");
}

module.exports = {
  generatePackage,
};
