const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.jsx', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tex$/i,
        use: [
          '@svgr/webpack',
          'mathjax-loader',
        ],
      },
      {
        test: /\.png$/i,
        use: 'file-loader',
      },
      {
        test: /\.raw$/i,
        use: 'raw-loader',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../build'),
    historyApiFallback: {
      disableDotRule: true,
      index: '/',
    },
  },
  watchOptions: {
    ignored: /node_modules/,
  },
}

