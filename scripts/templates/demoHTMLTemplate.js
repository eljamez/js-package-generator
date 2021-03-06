const getDemoHTML = ({ packageName }) => {
  return `<!DOCTYPE html>
    <html>
      <head>
        <title>${packageName}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bulma@0.8.2/css/bulma.min.css"
        />
      </head>
      <body>
        <div class="hero is-primary">
          <div class="hero-body">
            <h1 class="title">${packageName}</h1>
            <h2 class="subtitle">Generated using <a href="https://www.jamesript.com/js-package-generator">js-package-generator</a></h2>
          </div>
        </div>
        <section class="section">
          <div class="columns">
            <div class="column is-one-third">
              <h2 class="title">Create your package.</h2>
              <h3 class="subtitle">And have fun.</h3>
              <ul class="list">
                <li class="list-item"><a href="https://babeljs.io/">Babel</a></li>
                <li class="list-item">
                  <a href="https://webpack.js.org/">Webpack</a>
                </li>
                <li class="list-item">
                  <a href="https://yarnpkg.com/lang/en/">Yarn</a>
                </li>
                <li class="list-item"><a href="https://eslint.org/">ESLint</a></li>
                <li class="list-item">
                  <a href="https://facebook.github.io/jest/">Jest</a>
                </li>
                <li class="list-item">
                  <a href="https://github.com/typicode/husky">Husky</a>
                </li>
              </ul>
            </div>
            <div class="column is-two-thirds has-text-centered">
              <h2 class="title">Example counter.</h2>
              <div class="container">
                <div class="columns">
                  <div class="column">
                    <button
                      id="decrementButton"
                      class="button has-background-danger"
                    >
                      ➖
                    </button>
                  </div>
                  <div class="column">
                    <h1 class="title is-1" id="count"></h1>
                  </div>
                  <div class="column">
                    <button
                      id="incrementButton"
                      class="button has-background-success"
                    >
                      ➕
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </body>
    </html>
    `;
};

module.exports = getDemoHTML;
