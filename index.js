'use strict';

var noAsyncAwait = require( './rules/noAsyncAwait.js' );
var noMathRandom = require( './rules/noMathRandom.js' );
var noPromiseAll = require( './rules/noPromiseAll.js' );
var noPromiseConstructor = require( './rules/noPromiseConstructor.js' );
var noPromiseRace = require( './rules/noPromiseRace.js' );
var noSetTimeout = require( './rules/noSetTimeout.js' );
var maxLinesPerFunction = require( './rules/maxLinesPerFunction.js' );

module.exports = {
	rules: {
		"noAsyncAwait": noAsyncAwait,
		"noMathRandom": noMathRandom,
		"noPromiseAll": noPromiseAll,
		"noPromiseConstructor": noPromiseConstructor,
		"noPromiseRace": noPromiseRace,
		"noSetTimeout": noSetTimeout,
		"maxLinesPerFunction": maxLinesPerFunction
	},
	rulesConfig: {
		"noAsyncAwait": 2,
		"noMathRandom": 2,
		"noPromiseAll": 2,
		"noPromiseConstructor": 2,
		"noPromiseRace": 2,
		"noSetTimeout": 2,
		"maxLinesPerFunction": 1
	}
};

