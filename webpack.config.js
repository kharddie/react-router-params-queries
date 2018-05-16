const debug = process.env.NODE_ENV !== "production"; //if developement
console.log("This is the Webpack 4 'mode':" + process.env.NODE_ENV);
const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
    port: 4050
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      },
      
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },

      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader","postcss-loader"],  //******* use[] instead of loaders[]
      },

      {
        test: /\.(png|jpg|svg)$/,
        loader: "url-loader",
        options: {
          name: '[name].[ext]',
          outputPath: 'images/'
        }
      },



    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.template.ejs',
      inject: 'body',
    }),
    new CleanWebpackPlugin(PATHS.build),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css",
      options: {
        plugins: () => [require("autoprefixer")()],
    }
    }),
    new webpack.NamedModulesPlugin(),
    new CopyWebpackPlugin([
      { from: PATHS.app + '/images', to: 'images' }
    ]),

  ],
};

