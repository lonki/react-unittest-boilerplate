const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const projectRoot = path.resolve(__dirname, '../');

module.exports = {
  mode: 'development',
  devtool: 'inline-eval-cheap-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../src'),
    ],
    extensions: ['.js'],
    alias: {
      src: path.resolve(projectRoot, 'src'),
      test: path.resolve(projectRoot, 'test'),
    },
  },
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
  },

  plugins: [
    // 檢查是否有循環依賴
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
    }),
  ],
};
