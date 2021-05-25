const path = require("path");

module.exports = {
  mode: "production",
  // adding separate modules entry so it can be used in webpack configs as commonjs
  entry: { main: "./src/index.js", modules: "./src/modules.js" },
  output: {
    path: path.resolve("lib"),
    filename: "[name].js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "@babel/plugin-transform-runtime",
              "@babel/plugin-proposal-class-properties"
            ]
          }
        }
      }
    ]
  }
};
