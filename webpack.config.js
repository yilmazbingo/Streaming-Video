const path = require("path");
const webpack = require("webpack");
require("dotenv").config({ path: "development.env" });

module.exports = {
  entry: { main: "./src/client/app.js" },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name]-bundle.js",
    publicPath: "/",
  },
  mode: "development",
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: [/node_modules/, /joi-browser/],
      },
      {
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  // devtool: "cheap-module-eval-source-map",
  devServer: {
    //contentBase lets tell the devs server where it can find our public file.
    contentBase: path.join(__dirname, "public"),
    // HistoryApiFallback tells devserver that we are going to be handling routing via our client side code.
    historyApiFallback: true,
  },
  plugins: [
    new webpack.EvalSourceMapDevToolPlugin(),
    new webpack.DefinePlugin({
      "process.env.CLIENT_ID": JSON.stringify(process.env.CLIENT_ID),
    }),
  ],
};
