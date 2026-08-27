const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const CopyPlugin = require("copy-webpack-plugin");

const ROOT_DIR = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT_DIR, "src");
const STATIC_DIR = path.join(ROOT_DIR, "static");
const PUBLIC_DIR = path.join(ROOT_DIR, "public");
const BUILD_DIR = path.join(ROOT_DIR, "build");

const plugins = [
  new CopyPlugin({
    patterns: [{ from: STATIC_DIR, to: BUILD_DIR }],
  }),
  new HtmlWebpackPlugin({
    template: path.join(PUBLIC_DIR, "index.html"),
    filename: "index.html",
    scriptLoading: "defer",
  }),
  new FaviconsWebpackPlugin({
    logo: path.resolve(PUBLIC_DIR, "favicon.png"),
    prefix: "/favicons/",
    outputPath: path.resolve(BUILD_DIR, "favicons"),
    mode: "webapp",
    inject: (htmlPlugin) =>
      path.basename(htmlPlugin.options.filename) === "index.html",
    favicons: {
      icons: {
        favicons: true,
        appleIcon: true,
        appleStartup: false,
        android: true,
      },
    },
    cache: {
      type: "filesystem",
    },
  }),

  new webpack.ProvidePlugin({
    React: "react",
  }),

  new Dotenv({
    path: "./.env",
  }),
];

module.exports = {
  plugins,
  entry: path.join(SRC_DIR, "index.js"),
  output: {
    path: BUILD_DIR,
    publicPath: "/",
    assetModuleFilename: "assets/[name].[contenthash][ext]",
    clean: true,
    filename: "js/[name].[contenthash].js",
  },
  performance: {
    hints: "warning",
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  resolve: {
    alias: {
      "@": SRC_DIR,
    },
    extensions: [".js", ".jsx", "json"],
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(jpe?g|webp|avif|png|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/img/[name].[contenthash][ext]",
        },
      },
      {
        test: /\.(pdf|txt|docx)$/,
        type: "asset/resource",
        generator: {
          filename: "docs/[name][ext]",
        },
      },

      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        exclude: /node_modules/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name].[contenthash][ext]",
        },
      },
    ],
  },
};
