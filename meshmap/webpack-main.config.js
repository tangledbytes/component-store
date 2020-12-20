/**
 * generates:
 *  - dist/main.js
 */
const webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.EnvironmentPlugin({
      "process.env.NODE_ENV": process.env.NODE_ENV
    })
  ],
  entry: {
    main: "./src/index.js"
  },
  output: {
    libraryTarget: "commonjs"
  },
  externals: [
    "react",
    /^@material-ui\/(core|icons|lab)[/a-zA-Z]*/,
    "notistack"
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
