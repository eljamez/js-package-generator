#!/usr/bin/env node

const chalk = require("chalk");
const { prompt } = require("./readline");
const { generatePackage } = require("./generatePackage");

const truthyAnswer = (ans) => ans.toLowerCase().includes("y", "yes");

async function displayPrompts() {
  const config = {
    name: "USER",
    packageName: "js-pkg",
    description: "a package built with js-package-generator",
    useJest: true,
    useESLint: true,
    useHusky: true,
  };

  console.clear();

  console.log(
    chalk.cyan(`
    Welcome to the...

    ░░░░▒█░▒█▀▀▀█░░░▒█▀▀█░█▀▀▄░█▀▄░█░▄░█▀▀▄░█▀▀▀░█▀▀░░░▒█▀▀█░█▀▀░█▀▀▄░█▀▀░█▀▀▄░█▀▀▄░▀█▀░▄▀▀▄░█▀▀▄
    ░░░░▒█░░▀▀▀▄▄░░░▒█▄▄█░█▄▄█░█░░░█▀▄░█▄▄█░█░▀▄░█▀▀░░░▒█░▄▄░█▀▀░█░▒█░█▀▀░█▄▄▀░█▄▄█░░█░░█░░█░█▄▄▀
    ░▒█▄▄█░▒█▄▄▄█░░░▒█░░░░▀░░▀░▀▀▀░▀░▀░▀░░▀░▀▀▀▀░▀▀▀░░░▒█▄▄▀░▀▀▀░▀░░▀░▀▀▀░▀░▀▀░▀░░▀░░▀░░░▀▀░░▀░▀▀

    Cool, Let's get some info...
    
    Much of this is to build your ${chalk.bold.magenta(
      `package.json`
    )} file, which can be changed after generating.`)
  );
  config.name =
    (await prompt(
      chalk.green(`
    What is your name?
    
    ${chalk.white("")}`)
    )) || config.name;

  config.packageName =
    (await prompt(
      chalk.green(`
    What is the name of your package / library?
    
    ${chalk.white("")}`)
    )) || config.packageName;

  config.description =
    (await prompt(
      chalk.green(`
    Describe ${chalk.magenta(config.packageName)} in one sentence.
    
    ${chalk.white("")}`)
    )) || config.description;

  config.repo = await prompt(
    chalk.green(`
    What is the repository URL (Github url) ?
    
    ${chalk.white("")}`)
  );

  /*TODO add options.

  const useJestAnswer = await prompt(
    chalk.green(`
    Would you like to use ${chalk.magenta(`Jest`)} for unit testing?
    
    y/N: `)
  );

  config.useJest = truthyAnswer(useJestAnswer);

  const useESLintAnswer = await prompt(
    chalk.green(`
    Would you like to use ${chalk.magenta(`ESLint`)}?
    
    y/N: `)
  );

  config.useESLint = truthyAnswer(useESLintAnswer);

  const useHuskyAnswer = await prompt(
    chalk.green(`
    Would you like to use ${chalk.magenta(`Husky`)} for Pre-commit checks?
    
    y/N: `)
  );

  config.useHusky = truthyAnswer(useHuskyAnswer);
*/
  console.log(`
  
  
  `);

  generatePackage(config);

  console.log(
    chalk.green(
      `
        
      ${chalk.bold.cyan(`🎉 Congratulations ${config.name} 🎉`)},
      
      Your JavaScript Package ${chalk.bold.cyan(
        config.packageName
      )} has been created in ${chalk.italic.cyan(`./${config.packageName}`)}.

      Next steps include...

      1) \`cd ${config.packageName}\` 
      2) \`yarn install\` and \`yarn start\`
      3) reviewing your README.md, package.json
      4) editing the code to your specifications
      5) \`yarn build\`
      6) publishing to NPM \`npm publish\`

      ${chalk.italic.cyan(
        `"Ya know, Yarn or NPM, both work fantastically" - Spiderman`
      )}

      ENJOY!

      ${chalk.bold.blue(
        `p.s. please consider ⭐️starring⭐️ ${chalk.italic(
          `https://github.com/eljamez/js-package-generator`
        )} 😁`
      )}

      ${chalk.bold.blue(
        `Sincerely, James ${chalk.italic(`https://www.jamescript.com`)}`
      )}
      `
    )
  );
}

displayPrompts();
