const { join } = require('path');

module.exports = {
  context: __dirname,
  entry: './src/main.ts',
  target: 'node',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: 'source-map',
  output: {
    path: join(__dirname, 'dist-rspack'),
    filename: 'main.js',
    clean: true,
    library: {
      type: 'commonjs2',
    },
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'builtin:swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
              decorators: true,
            },
            transform: {
              legacyDecorator: true,
              decoratorMetadata: true,
            },
            target: 'es2021',
          },
        },
      },
      {
        test: /\.(graphql|proto)$/,
        type: 'asset/resource',
        generator: {
          // Future assertions should preserve runtime resolve calls and rewrite
          // their specifiers to these emitted asset filenames.
          filename: 'assets/[path][name][ext]',
        },
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  experiments: {
    topLevelAwait: true,
  },
  externalsPresets: {
    node: true,
  },
};
