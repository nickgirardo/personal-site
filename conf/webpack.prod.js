const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  output: {
    publicPath: '/',
    // NOTE for some reason this dir seems to be based on the location of this file
    // all other paths seem to be based on the repo root
    path: path.resolve(__dirname, '../build'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.jsx', '.tsx'],
  },
  module: {
    rules: [
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
  optimization: {
    minimize: true,
  },
}

