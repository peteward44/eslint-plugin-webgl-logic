'use strict';

var noAsyncAwait = require( './rules/noAsyncAwait.js' );
var noMathRandom = require( './rules/noMathRandom.js' );
var noSetTimeout = require( './rules/noSetTimeout.js' );

module.exports = {
    rules: {
        "noAsyncAwait": noAsyncAwait,
		"noMathRandom": noMathRandom,
		"noSetTimeout": noSetTimeout
    },
	rulesConfig: {
        "noAsyncAwait": 2,
		"noMathRandom": 2,
		"noSetTimeout": 2
    }
};

