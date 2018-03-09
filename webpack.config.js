const HtmlWebPackPlugin = require("html-webpack-plugin"),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      CopyWebpackPlugin = require('copy-webpack-plugin'),
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
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
              plugins: [
                autoprefixer({
                  browsers:['ie >= 8', 'last 4 version']
                })
              ],
              sourceMap: true
              }
            },
            'sass-loader']
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
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img'
          }
        }]
      },
      {
        test: /.*\.(gif|png|jpe?g)$/i,
        exclude: [/fonts/],
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
};