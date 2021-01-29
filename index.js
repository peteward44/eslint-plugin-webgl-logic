'use strict';

// rules
var noAsyncAwait = require( './rules/noAsyncAwait.js' );
var noMathRandom = require( './rules/noMathRandom.js' );
var noPromiseAll = require( './rules/noPromiseAll.js' );
var noPromiseConstructor = require( './rules/noPromiseConstructor.js' );
var noPromiseRace = require( './rules/noPromiseRace.js' );
var noSetTimeout = require( './rules/noSetTimeout.js' );
var maxLinesPerFunction = require( './rules/maxLinesPerFunction.js' );
var enforceGameImports = require( './rules/enforceGameImports.js' );

// configs
var def = require( './configs/index.js' );
var logic = require( './configs/logic.js' );
var pluginsBase = require( './configs/plugins-base.js' );
var react = require( './configs/react.js' );
var test = require( './configs/test.js' );
var tool = require( './configs/tool.js' );


module.exports = {
	rules: {
		"noAsyncAwait": noAsyncAwait,
		"noMathRandom": noMathRandom,
		"noPromiseAll": noPromiseAll,
		"noPromiseConstructor": noPromiseConstructor,
		"noPromiseRace": noPromiseRace,
		"noSetTimeout": noSetTimeout,
		"maxLinesPerFunction": maxLinesPerFunction,
		"enforceGameImports": enforceGameImports
	},
	rulesConfig: {
		"noAsyncAwait": 2,
		"noMathRandom": 2,
		"noPromiseAll": 2,
		"noPromiseConstructor": 2,
		"noPromiseRace": 2,
		"noSetTimeout": 2,
		"maxLinesPerFunction": 1,
		"enforceGameImports": 2
	},
	configs: {
		"default": def,
		logic: logic,
		"plugins-base": pluginsBase,
		react: react,
		test: test,
		tool: tool
	}
};

