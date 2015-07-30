var path = require('path');

module.exports = {

  cache: true,

  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpg|svg)$/,
      loader: 'url-loader?limit=8192'
    }]
  }

};
