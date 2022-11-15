const webpack = require("webpack");
const LdfConsolePlugin = require("../plugins/ldf-console-plugin");

const devConfig = (path) => {
  return {
    devtool: "cheap-module-eval-source-map",
    mode: "development",
    devServer: {
      contentBase: path + "/dist",
      open: true,
      hot: true,
      historyApiFallback: true,
      publicPath: "/",
      port: 8888,
      inline: true,
      proxy: {},
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new LdfConsolePlugin({ dec: 1 }),
    ],
  };
};

module.exports = devConfig;
