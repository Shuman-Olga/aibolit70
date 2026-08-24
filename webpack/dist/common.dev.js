"use strict";

var webpack = require("webpack");

var path = require("path");

var HtmlWebpackPlugin = require("html-webpack-plugin");

var FileManagerPlugin = require("filemanager-webpack-plugin");

var FaviconsWebpackPlugin = require("favicons-webpack-plugin");

var Dotenv = require("dotenv-webpack");

var CopyPlugin = require("copy-webpack-plugin");

var ROOT_DIR = path.resolve(__dirname, "..");
var SRC_DIR = path.join(ROOT_DIR, "src");
var STATIC_DIR = path.join(ROOT_DIR, "static");
var PUBLIC_DIR = path.join(ROOT_DIR, "public");
var BUILD_DIR = path.join(ROOT_DIR, "build");
var plugins = [new CopyPlugin({
  patterns: [{
    from: STATIC_DIR,
    to: BUILD_DIR
  }]
}), new HtmlWebpackPlugin({
  template: path.join(PUBLIC_DIR, "index.html"),
  filename: "index.html",
  scriptLoading: "defer"
}), new FaviconsWebpackPlugin({
  logo: path.resolve(PUBLIC_DIR, "favicon.png"),
  prefix: "/favicons/",
  outputPath: path.resolve(BUILD_DIR, "favicons"),
  mode: "webapp",
  inject: function inject(htmlPlugin) {
    return path.basename(htmlPlugin.options.filename) === "index.html";
  },
  favicons: {
    icons: {
      appleIcon: true,
      // Apple touch icons.
      android: true,
      // Android homescreen icon.
      favicons: true // Regular favicons.

    }
  },
  cache: {
    type: "filesystem"
  }
}), new webpack.ProvidePlugin({
  React: "react"
}), new Dotenv({
  path: "./.env"
})];
module.exports = {
  plugins: plugins,
  entry: path.join(SRC_DIR, "index.js"),
  output: {
    path: BUILD_DIR,
    publicPath: "/",
    assetModuleFilename: "assets/[name].[contenthash][ext]",
    clean: true,
    filename: "js/[name].[contenthash].js"
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  resolve: {
    alias: {
      "@": SRC_DIR
    },
    extensions: [".js", ".jsx", "json"]
  },
  module: {
    rules: [{
      test: /\.m?jsx?$/i,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          cacheDirectory: true
        }
      }
    }, {
      test: /\.(jpe?g|webp|avif|png|gif|svg)$/i,
      type: "asset/resource",
      generator: {
        filename: "assets/img/[name].[contenthash][ext]"
      }
    }, {
      test: /\.(pdf|txt|docx)$/,
      type: "asset/resource",
      generator: {
        filename: "docs/[name][ext]"
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)$/i,
      exclude: /node_modules/,
      type: "asset/resource",
      generator: {
        filename: "assets/fonts/[name].[contenthash][ext]"
      }
    }]
  }
};