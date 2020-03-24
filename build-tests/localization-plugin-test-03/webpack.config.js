'use strict';

const path = require('path');
const webpack = require('webpack');
const {
  JsonFile,
  FileSystem
} = require('@rushstack/node-core-library');

const { LocalizationPlugin } = require('@rushstack/localization-plugin');
const { SetPublicPathPlugin } = require('@rushstack/set-webpack-public-path-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolveMissingString(localeNames, localizedResourcePath) {
  let contextRelativePath = path.relative(__dirname, localizedResourcePath);
  contextRelativePath = contextRelativePath.replace(/\\/g, '/'); // Convert Windows paths to Unix paths
  if (!contextRelativePath.startsWith('.')) {
    contextRelativePath = `./${contextRelativePath}`;
  }

  const result = {};
  for (const localeName of localeNames) {
    const expectedCombinedStringsPath = path.resolve(__dirname, 'localization', localeName, 'combinedStringsData.json');
    if (FileSystem.exists(expectedCombinedStringsPath)) {
      const loadedCombinedStringsPath = JsonFile.load(expectedCombinedStringsPath);
      result[localeName] = loadedCombinedStringsPath[contextRelativePath];
    }
  }
  return result;
}

module.exports = function(env) {
  const configuration = {
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: require.resolve('ts-loader'),
          exclude: /(node_modules)/,
          options: {
            compiler: require.resolve('@microsoft/rush-stack-compiler-3.5/node_modules/typescript'),
            logLevel: 'ERROR',
            configFile: path.resolve(__dirname, 'tsconfig.json')
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    entry: {
      'localization-test-A': path.join(__dirname, 'src', 'indexA.ts'),
      'localization-test-B': path.join(__dirname, 'src', 'indexB.ts'),
      'localization-test-C': path.join(__dirname, 'src', 'indexC.ts'),
      'localization-test-D': path.join(__dirname, 'src', 'indexD.ts')
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name]_[locale]_[contenthash].js',
      chunkFilename: '[id].[name]_[locale]_[contenthash].js'
    },
    optimization: {
      minimize: true
    },
    plugins: [
      new webpack.optimize.ModuleConcatenationPlugin(),
      new LocalizationPlugin({
        localizedData: {
          defaultLocale: {
            localeName: 'en-us'
          },
          translatedStrings: {
            "es-es": {
              "./src/strings1.loc.json": {
                "string1": "la primera cadena"
              },
              "./src/chunks/strings2.loc.json": "./localization/es-es/chunks/strings2.loc.json",
              "./src/strings4.loc.json": {
                "string1": "\"Cadena con comillas\""
              },
              "./src/strings5.resx": {
                "string1": "La primera cadena RESX",
                "stringWithQuotes": "\"Cadena RESX con comillas\""
              },
              "./src/chunks/strings6.resx": {
                "string": "cadena RESX"
              }
            }
          },
          resolveMissingTranslatedStrings: resolveMissingString,
          passthroughLocale: {
            usePassthroughLocale: true
          },
          pseudolocales: {
            'qps-ploca': {
              append: '',
              prepend: ''
            },
            'qps-ploc': {
              append: '##--!!]',
              prepend: '[!!--##'
            }
          }
        },
        typingsOptions: {
          generatedTsFolder: path.resolve(__dirname, 'temp', 'loc-json-ts'),
          sourceRoot: path.resolve(__dirname, 'src'),
          exportAsDefault: true
        },
        localizationStats: {
          dropPath: path.resolve(__dirname, 'temp', 'localization-stats.json')
        }
      }),
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
        analyzerMode: 'static',
        reportFilename: path.resolve(__dirname, 'temp', 'stats.html'),
        generateStatsFile: true,
        statsFilename: path.resolve(__dirname, 'temp', 'stats.json'),
        logLevel: 'error'
      }),
      new SetPublicPathPlugin({
        scriptName: {
          useAssetName: true
        }
      }),
      new HtmlWebpackPlugin()
    ]
  };

  return configuration;
}
