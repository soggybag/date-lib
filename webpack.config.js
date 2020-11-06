// const path = require('path');

// module.exports = [
//   'source-map'
// ].map(devtool => ({
//   mode: 'development',
//   entry: './src/index.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'webpack-numbers.js'
//   },
//   devtool,
//   optimization: {
//     runtimeChunk: true
//   }
// }));

const { resolve } = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const isDevelopment = process.env.NODE_ENV !== 'production'

const config = {
  entry: {
    main: resolve('./src/index.ts')
  },
  output: {
    path: resolve(__dirname, 'dist'),
    library: 'D',
    libraryTarget: 'umd',
    filename: 'd.js',
    auxiliaryComment: 'D Date'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: ['awesome-typescript-loader?module=es6'],
        exclude: [/node_modules/]
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        enforce: 'pre'
      },
        {
          test: /\.html$/,
          use: [
          {
            loader: 'html-loader',
            options: { minimize: !isDevelopment }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  }
}

module.exports = config