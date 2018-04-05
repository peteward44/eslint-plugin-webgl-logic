'use strict';

var noAsyncAwait = require( './rules/noAsyncAwait.js' );
var noMathRandom = require( './rules/noMathRandom.js' );
var noSetTimeout = require( './rules/noSetTimeout.js' );
var maxLinesPerFunction = require( './rules/maxLinesPerFunction.js' );

module.exports = {
    rules: {
        "noAsyncAwait": noAsyncAwait,
		"noMathRandom": noMathRandom,
		"noSetTimeout": noSetTimeout,
		"maxLinesPerFunction": maxLinesPerFunction
    },
	rulesConfig: {
        "noAsyncAwait": 2,
		"noMathRandom": 2,
		"noSetTimeout": 2,
		"maxLinesPerFunction": 1
    }
};

