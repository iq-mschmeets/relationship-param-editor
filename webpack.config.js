'use strict';

const webpack = require('webpack');
const pkg = require('./package.json');

const env = process.env.NODE_ENV;
const config = {
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['src', 'node_modules'],
  },
  output: {
    library: 'RelationParamEditor',
    libraryTarget: 'var',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        }

      },
      {
          test: /\.css$/,
        loader:'style-loader!css-loader'
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
  externals: {
    // Don't package React with the component.
    react: 'React',
    postal: 'postal'
    // If your component depends on external utility libraries like lodash,
    // you might want to add them here.
    // Refer to https://webpack.js.org/configuration/externals/ for more info.
  }


};

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      comments: false,
      compress: {
        drop_console: true,
      },
      mangle: {
        screw_ie8 : true,
        keep_fnames: true,
      },
    })
  );
}



module.exports = config;
