'use strict';

module.exports = function (config) {

	var configuration = {

		basePath: '',

		frameworks: ['jasmine'],

		files: [
			'./public/build/test*.js',
		],

		reporters: ['progress', 'coverage'],
		preprocessors: {
			'./public/build/test*.js':['coverage']
		},

		port: 9876,
		colors: true,
		autoWatch: false,
		singleRun: false,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,
		plugins: [
			'karma-jasmine',
			'karma-chrome-launcher',
			'karma-coverage'
		],
		browsers: ['Chrome'],
		customLaunchers: {
			Chrome_travis_ci: {
				base: 'Chrome',
				flags: ['--no-sandbox']
			}
		},
		coverageReporter: {
			type: 'html',
			dir: 'public/coverage/'
		}
	};

	if (process.env.TRAVIS) {
		configuration.browsers = ['Chrome_travis_ci']
	}

	config.set(configuration)
};