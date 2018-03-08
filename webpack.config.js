const HtmlWebPackPlugin = require("html-webpack-plugin"),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {loader: "babel-loader"},
        ],
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
          use:['css-loader','sass-loader']
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
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8000,
            name: '[name].[ext]',
            outputPath: 'img/'
          },
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/'
          }
        }]
      },
      {
        test: /.*\.(gif|png|jpe?g)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/'},
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new ExtractTextPlugin({
      filename:'./styles.css'
    }),
    new CopyWebpackPlugin([
      {
        from: ('bower_components/webcomponentsjs/*.*'),
        to: 'bower_components/webcomponentsjs/[name].[ext]'
      },
      {
        from: ('src/components/**/*.html'),
        to: 'components/[name].[ext]'
      },
      {
        from: ('src/img/*.*'),
        to: 'img/[name].[ext]'
      }
    ])
  ],
};