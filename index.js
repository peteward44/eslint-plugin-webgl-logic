'use strict';

var noAsyncAwait = require( './rules/noAsyncAwait.js' );
var noMathRandom = require( './rules/noMathRandom.js' );

module.exports = {
    rules: {
        "noAsyncAwait": noAsyncAwait,
		"noMathRandom": noMathRandom
    },
	rulesConfig: {
        "noAsyncAwait": 2,
		"noMathRandom": 2
    }
};

