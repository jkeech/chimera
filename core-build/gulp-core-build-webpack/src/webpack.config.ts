// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import * as Webpack from 'webpack';
// @ts-ignore
import * as WebpackDevServer from 'webpack-dev-server'; // eslint-disable-line
import { WebpackTask } from './WebpackTask';
import * as path from 'path';

// Note: this require may need to be fixed to point to the build that exports the gulp-core-build-webpack instance.
const webpackTask: WebpackTask = require('@microsoft/web-library-build').webpack;
const webpack: typeof Webpack = webpackTask.resources.webpack;

const isProduction: boolean = webpackTask.buildConfig.production;

// eslint-disable-next-line
const packageJSON: { name: string } = require('./package.json');

const webpackConfiguration: Webpack.Configuration = {
  context: __dirname,
  devtool: isProduction ? undefined : 'source-map',

  entry: {
    [packageJSON.name]: path.join(__dirname, webpackTask.buildConfig.libFolder, 'index.js')
  },

  output: {
    libraryTarget: 'umd',
    path: path.join(__dirname, webpackTask.buildConfig.distFolder),
    filename: `[name]${isProduction ? '.min' : ''}.js`
  },

  // The typings are missing the "object" option here (https://webpack.js.org/configuration/externals/#object)
  externals: {
    react: {
      amd: 'react',
      commonjs: 'react'
    },
    'react-dom': {
      amd: 'react-dom',
      commonjs: 'react-dom'
    }
  } as any, // eslint-disable-line @typescript-eslint/no-explicit-any

  plugins: [
    // new WebpackNotifierPlugin()
  ]
};

if (isProduction && webpackConfiguration.plugins) {
  webpackConfiguration.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        dead_code: true,
        warnings: false
      }
    })
  );
}

exports = webpackConfiguration;
