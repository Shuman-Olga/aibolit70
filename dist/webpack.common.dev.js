"use strict";

var webpack = require("webpack");

var path = require("path");

var HtmlWebpackPlugin = require("html-webpack-plugin");

var MiniCssExtractPlugin = require("mini-css-extract-plugin");

var FileManagerPlugin = require("filemanager-webpack-plugin");

var FaviconsWebpackPlugin = require("favicons-webpack-plugin");

var Dotenv = require("dotenv-webpack");

var ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

var BUILD_DIR = path.resolve(__dirname, "build");
var PUBLIC_DIR = path.resolve(__dirname, "public");
var STATIC_DIR = path.resolve(__dirname, "static");
var devServer = {
  port: 3000,
  hot: true,
  open: true,
  historyApiFallback: true,
  compress: true,
  allowedHosts: "all",
  client: {
    overlay: {
      errors: true,
      warnings: true
    },
    progress: true
  },
  devMiddleware: {
    writeToDisk: true
  },
  "static": [{
    directory: path.join(BUILD_DIR, "favicons")
  }]
};
var plugins = [new FileManagerPlugin({
  events: {
    onStart: {
      "delete": [BUILD_DIR]
    },
    onEnd: {
      copy: [{
        source: STATIC_DIR,
        destination: BUILD_DIR
      }]
    }
  }
}), new HtmlWebpackPlugin({
  template: path.join(PUBLIC_DIR, "index.html"),
  filename: "index.html"
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
      appleStartup: false,
      // Apple startup images.
      android: true,
      // Android homescreen icon.
      favicons: true,
      // Regular favicons.
      coast: false,
      // Opera Coast icon.
      firefox: false,
      // Firefox OS icons.
      windows: false,
      // Windows 8 tile icons.
      yandex: false // Yandex browser icon.

    }
  },
  cache: false // Disallow caching the assets across webpack builds.

}), // new MiniCssExtractPlugin({
//   filename: "[name].[contenthash].css",
// }),
new webpack.ProvidePlugin({
  React: "react"
}), new Dotenv({
  path: "./.env"
}), new webpack.HotModuleReplacementPlugin() // For page reloading
];

if (process.env.SERVE) {
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
  devServer: devServer,
  plugins: plugins,
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path: BUILD_DIR,
    publicPath: "/",
    assetModuleFilename: "assets/[hash][ext][query]",
    clean: true,
    filename: "index.js"
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src")
    },
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [{
      test: /\.(html)$/,
      use: ["html-loader"]
    }, {
      test: /\.(s[ac]|c)ss$/i,
      use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
    }, {
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
        filename: "assets/img/[hash][ext]"
      }
    }, {
      test: /\.(pdf|txt)$/,
      type: "asset/resource",
      generator: {
        filename: "assets/docs/[hash][ext]"
      }
    }, {
      test: /\.docx$/,
      use: [{
        loader: "docx-loader",
        options: {
          removeLinks: true
        }
      }]
    }, {
      test: /\.(woff2?|eot|ttf|otf)$/i,
      exclude: /node_modules/,
      type: "asset/resource",
      generator: {
        filename: "assets/fonts/[hash][ext]"
      }
    }]
  }
};