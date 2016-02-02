var path = require('path');
var join = path.join.bind(path, __dirname);

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
        test:/\.jsx?$/,
        loader:'babel',
        include:join('src')
    }
      ,{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpg|svg)$/,
      loader: 'url-loader?limit=8192'
    }]
  }

};
