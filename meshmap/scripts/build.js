const webpack = require("webpack");
const rimraf = require("rimraf");
const webpackConfig = require("../webpack.config");
const Pipeline = require("./pipeline");

const OUTPUT_DIR = "dist";

async function cleanup() {
  console.log("Cleaning up...");
  rimraf.sync(OUTPUT_DIR);
}

async function compile() {
  console.log("Starting compilation...");

  const compiler = webpack(webpackConfig);
  return new Promise((res, reject) => {
    compiler.run((err, stats) => {
      console.log(stats.toString());

      if (err) reject(err);
      if (stats.hasErrors()) reject(Error("error compiling"));

      res();
    });
  });
}

const pipeline = new Pipeline();

// Setup pipeline
pipeline.add(cleanup);
pipeline.add(compile);

pipeline.process();
