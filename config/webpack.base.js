const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const htmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HappyPack = require("happypack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devConfig = require("./webpack.dev");
const proConfig = require("./webpack.pro");

const BaseConfig = (path) => {
  return {
    entry: {
      main: "./src/index.js",
    },
    output: {
      path: path.require(__dirname, "/dist"),
      filename: "[name].js",
    },
    resolve: {
      extenions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      alias: {
        "@": path.resolve(__dirname, "/src"),
      },
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          include: path.resolve(__dirname, "/src"),
          use: ["happypack/loader?id=babel"],
        },
        {
          test: /\.tsx?$/,
          use: {
            loader: "ts-loader",
          },
        },
        {
          test: /\.scss$/,
          use: [
            "css-hot-loader",
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: [require("autoprefixer")],
              },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|eot|woff|woff2)$/,
          use: {
            loader: "file-loader",
            options: {
              esModule: false,
              name: "[name]_[hash].[ext]",
              outputPath: "imgs/",
              limit: 2048,
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            "css-hot-loader",
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: [require("autoprefixer")],
              },
            },
          ],
        },
      ],
    },
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
    plugins: [
      new htmlWebpackPlugin({
        filename: "index.html",
        template: "./index.html",
      }),
      new CleanWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      new HappyPack({
        id: "babel",
        loaders: ["babel-loader?cacheDirectory"],
        verbose: false,
      }),
    ],
  };
};

module.exports = function (path) {
  return (type) => {
    if (type === "start") {
      return merge(BaseConfig(path), devConfig(path));
    } else {
      return merge(BaseConfig(path), proConfig);
    }
  };
};
