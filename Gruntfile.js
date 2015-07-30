'use strict';
var path = require('path');

module.exports = function (grunt) {

  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // configurable paths
  var pkgConfig = grunt.file.readJSON('package.json');

  // webpack
  var webpack = require('webpack');
	var webpackConfig = require('./webpack.config.js');

  // init
  grunt.initConfig({

    pkg: pkgConfig,

    webpack: {
			options: webpackConfig,
			build: {
        entry: {
          main: './' + pkgConfig.src + '/main.js'
        },
        output: {
          path: path.join(__dirname, pkgConfig.dist),
          publicPath: '',
          filename: '[name].js',
          chunkFilename: '[chunkhash].js'
        },
				plugins: [
					new webpack.DefinePlugin({
						'process.env': {
							// This has effect on the react lib size
							'NODE_ENV': JSON.stringify('production')
						}
					}),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.UglifyJsPlugin(),
          new webpack.optimize.OccurenceOrderPlugin(),
          new webpack.optimize.AggressiveMergingPlugin()
				],
        module: {
          loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
          }]
        }
			}
		},

		'webpack-dev-server': {
			options: {
        port: 3000,
				webpack: webpackConfig,
				publicPath: '/<%= pkg.dist %>/',
        contentBase: './<%= pkg.src %>/'
			},
			start: {
				keepAlive: true,
				webpack: {
          entry: [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            './' + pkgConfig.src + '/main.js'
          ],
					devtool: 'eval',
					debug: true,
          // hot: true,
          historyApiFallback: true,
          output: {
            path: path.join(__dirname, pkgConfig.dist),
            publicPath: '<%= pkg.dist %>/',
            filename: '[name].js',
            chunkFilename: '[chunkhash].js'
          },
          plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
          ],
          module: {
            loaders: [{
              test: /\.jsx?$/,
              loaders: ['react-hot', 'babel'],
              include: path.join(__dirname, 'src')
            }]
          }
				}
			}
		},

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= pkg.dist %>'
          ]
        }]
      }
    },

    copy: {
      dist: {
        src: '<%= pkg.src %>/index.html',
        dest: '<%= pkg.dist %>/index.html',
        options: {
          process: function (content, srcpath) {
            return content.replace('dist/main.js', 'main.js');
          }
        }
      }
    }

  });

	// Production build
	grunt.registerTask('prod', [
    'clean:dist',
    'copy:dist',
    'webpack:build'
  ]);

  // The development server (the recommended option for development)
	grunt.registerTask('default', [
    'webpack-dev-server:start'
  ]);

  // Heroku
  // hook for https://github.com/mbuchetics/heroku-buildpack-nodejs-grunt
	grunt.registerTask('heroku', [
    'prod'
  ]);

};
