const webpack = require("webpack");
const rimraf = require("rimraf");
const { copyFile } = require("fs");
const path = require("path");
const webpackConfig = require("../webpack.config");

const pipeline = [];

pipeline.push(() => {
  rimraf.sync("dist");
});

pipeline.push(() => {
  webpack(webpackConfig, err => {
    if (err) throw err;

    if (process.argv.length > 3) {
      // Copy files from source to destinatiom
      process.argv.slice(2, process.argv.length - 1).forEach(src => {
        src = path.resolve(__dirname, "..", src);
        const filename = src.split(path.sep)[src.split(path.sep).length - 1];
        const dest = path.resolve(
          __dirname,
          "..",
          process.argv[process.argv.length - 1],
          filename
        );
        copyFile(src, dest, err => {
          if (err) throw err;
          console.log("Copied", src, "to", dest);
        });
      });
    }
  });
});

// Begin processing
pipeline.forEach(fn => fn());
