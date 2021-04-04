const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: "./src/main.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/index.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                {
                  targets: { // 兼容的目标浏览器
                    chrome: '80',
                  },
                  'corejs': '3', // 当前corejs使用的版本
                  useBuiltIns: 'usage'
                }
              ]
            }
          },
          "ts-loader"
        ],
      },
    ],
  },
  devServer: {
    hot: true,
    compress: true,
    port: 8989,
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
    template: './src/index.html',
  }),
  new CleanWebpackPlugin()
],
  resolve: {
    extensions: ['.ts', '.wasm', '.mjs', '.js', '.json'],
  }
};
