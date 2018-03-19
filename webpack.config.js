var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

const PATHS = {
    app: path.join(__dirname, "src"),
    build: path.join(__dirname, "dist"),
};

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  context: PATHS.app,

  entry: "./js/client.js",
  output: {
    path: PATHS.build, 
    filename: "client.min.js"
  },

  devServer: {
    inline: true,
    host: '127.0.0.1', // in this section, I have tried to change IP address by server IP
    port: 3000
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.template.ejs',
      inject: 'body',
    }),

  ],
};
