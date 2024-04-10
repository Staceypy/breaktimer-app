/**
 * Base webpack config used across other specific configs
 */

const path = require("path");
const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

// const rules = require("./webpack.rules");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
// const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

// const assets = ["static"];
// const copyPlugins = new CopyWebpackPlugin({
//   patterns: assets.map((asset) => ({
//     from: path.resolve(__dirname, "src", asset),
//     to: path.resolve(__dirname, ".webpack/renderer", asset),
//   })),
// });

module.exports = {
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        loader: "esbuild-loader",
        options: {
          loader: "tsx",
          target: "es2019",
        },
      },
      // Loads common image formats
      {
        test: /\.(png|jpe?g|svg)$/,
        loader: "url-loader",
        options: {
          // Inline images smaller than 10kb as data URIs
          limit: 10000,
        },
      },
      // Loads common image formats
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      },
    ],
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    fallback: { path: require.resolve("path-browserify") },
    extensions: [".js", ".ts", ".tsx", ".json", ".png"],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "production",
    }),

    new ForkTsCheckerWebpackPlugin(),
  ],
};
