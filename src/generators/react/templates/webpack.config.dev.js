const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const entriesPath = path.join(__dirname, 'src/entries');

const extractCss = new ExtractTextPlugin('[name].css');

const entries = {};
const traverse = function(dir) {
  const handleFile = function (filePath) {
    const info = path.parse(filePath);
    //只处理js文件
    if (info.ext === '.js' || info.ext === '.jsx') {
      entries[(path.relative(entriesPath, info.dir) + '/' + info.name).replace(/^\//, '')] = [
        'react-hot-loader/patch',
        './' + path.relative(__dirname, filePath)
      ];
    }
    
  }
  var stat = fs.statSync(dir);
  if (stat.isDirectory()) {
    fs.readdirSync(dir).map(function(filename) {
      traverse(path.join(dir, filename));
    });
  } else {
    handleFile(dir);
  }
}
 
traverse(entriesPath);
 
module.exports = {
  entry: entries,
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: [
        'babel-loader'
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader'
      ]
    }, {
      test: /\.less$/,
      use: extractCss.extract([
        'css-loader',
        'postcss-loader',
        'less-loader'
      ])
    }, {
      test: /\.(png|jpg|jpeg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: './image/[name].[ext]'
        }
      }]
    }, {
      test: /\.(ttf|eot|woff|woff2|otf|svg)/,
      use: [{
        loader: 'file-loader',
        options: {
          name: './font/[name].[ext]'
        }
      }]
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('common'),
    extractCss,
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    alias: {
      _: path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.jsx', '.json']
  },
  devServer: {
    contentBase: './build',
    hot: true,
    port: 8888,
    disableHostCheck: true,
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
}