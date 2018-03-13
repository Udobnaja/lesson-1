const HtmlWebPackPlugin = require("html-webpack-plugin"),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      CopyWebpackPlugin = require('copy-webpack-plugin'),
      CleanWebpackPlugin = require('clean-webpack-plugin'),
      autoprefixer = require('autoprefixer');

module.exports = {
  entry: { styles: './src/styles.scss', feed: './src/feed.scss', index: './src/index.js'},
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /bower_components/],
        use: ['babel-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test:/\.(s*)css$/,
        use: ExtractTextPlugin.extract({
          fallback:'style-loader',
          use:[
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  autoprefixer({
                    browsers:['ie >= 8', 'last 4 version']
                  })
                ],
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                sourceMapContents: true
              }
            }]
        })
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        exclude: [/src\/fonts/],
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img'
          }
        }]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        exclude: [/src\/fonts/],
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              outputPath: 'img',
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
            },
          }
        ]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      inject: false,
    }),
    new ExtractTextPlugin({
      filename:'./[name].css'
    }),
    new CopyWebpackPlugin([
      {
        from: ('bower_components/webcomponentsjs/*.js'),
        to: 'bower_components/webcomponentsjs/[name].[ext]'
      },
      {
        from: ('src/components/**/*.*'),
        to: 'components/[name].[ext]'
      },
      {
        from: ('server/api/**/*.*'),
        to: 'api/feed/[name].[ext]'
      },
    ])
  ],
  devtool : "source-map"
};