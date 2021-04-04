const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: "./src/main.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/index.js",
    clean: true,
    environment: {
      arrowFunction: false,
    }
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
              cacheDirectory: true,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: { // 兼容的目标浏览器
                      chrome: '80',
                      ie: '11',
                    },
                    'corejs': '3', // 当前corejs使用的版本
                    useBuiltIns: 'usage' // 按需加载core-js
                  }
                ]
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
    extensions: ['.ts', '.js', '.json'],
  }
};
