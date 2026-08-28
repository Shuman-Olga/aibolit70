const { merge } = require("webpack-merge");
const common = require("./common.js");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const plugins = [
  new MiniCssExtractPlugin({
    filename: "css/[name].[contenthash].css",
  }),
  new BundleAnalyzerPlugin({
    analyzerMode: "static",
    openAnalyzer: false,
    reportFilename: "bundle-report.html",
  }),
];

module.exports = merge(common, {
  mode: "production",
  plugins,
  devtool: false,
  output: {
    chunkFilename: "js/[name].[contenthash].chunk.js",
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: true,
          compress: true,
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              svgo: false,
            },
          ],
        },
      }),
    ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        react: {
          // test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "react",
          priority: 20,
        },
        vendor: {
          // test: /node_modules/,
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: 10,
        },
      },
    },

    runtimeChunk: "single",
  },
});
