const { merge } = require("webpack-merge");
const webpack = require("webpack");

const common = require("./common.js");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const plugins = [
  new ReactRefreshWebpackPlugin(),
  new webpack.HotModuleReplacementPlugin(),
];

const devServer = {
  port: 3000,
  hot: true,
  open: true,
  historyApiFallback: true,
  compress: true,
  client: {
    overlay: {
      errors: true,
      warnings: true,
    },
    progress: true,
  },
};

module.exports = merge(common, {
  mode: "development",
  target: "web",
  devServer,
  plugins,
  devtool: "cheap-module-source-map",

  output: {
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]ss|css)$/i,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
    ],
  },
});
