"use strict";

var noAsyncAwait = require("../rules/noAsyncAwait.js");
var noMathRandom = require("../rules/noMathRandom.js");
var RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();

ruleTester.run("noAsyncAwait", noAsyncAwait, {
	valid: [
		"function name() { var monkey = 33; }"
	],

	invalid: [
		{
			code: "async function name() {}",
			parser: 'babel-eslint',
			errors: [ { message: "Async/Await is forbidden" } ]
		},
		{
			code: "async () => {}",
			parser: 'babel-eslint',
			errors: [ { message: "Async/Await is forbidden" } ]
		},
		{
			code: "async function name() { await waitOnFunction(); }",
			parser: 'babel-eslint',
			errors: [ { message: "Async/Await is forbidden" } ]
		}
	]
});

ruleTester.run("noMathRandom", noMathRandom, {
	valid: [
		"function name() { Math.floor( 4.5 ); }",
		"var val = Math2.random();",
		"var val = Math.random2();",
		"var val = _.shuffle1();",
		"var val = _.sample1();",
		"var val = __.shuffle();",
		"var val = lodush.sbuffle();",
		"var val = _.random_()"
	],

	invalid: [
		{
			code: "function name() { var num = Math.random(); }",
			errors: [ { message: "Math.Random is forbidden" } ]
		},
		{
			code: "var funcptr = Math.random;",
			errors: [ { message: "Math.Random is forbidden" } ]
		},
		{
			code: "function name() { var num = _.shuffle(); }",
			errors: [ { message: "_.shuffle is forbidden as it uses Math.Random" } ]
		},
		{
			code: "var funcptr = _.shuffle;",
			errors: [ { message: "_.shuffle is forbidden as it uses Math.Random" } ]
		},
		{
			code: "function name() { var num = lodash.shuffle(); }",
			errors: [ { message: "_.shuffle is forbidden as it uses Math.Random" } ]
		},
		{
			code: "var funcptr = lodash.shuffle;",
			errors: [ { message: "_.shuffle is forbidden as it uses Math.Random" } ]
		},
		{
			code: "function name() { var num = lodash.sample(); }",
			errors: [ { message: "_.sample is forbidden as it uses Math.Random" } ]
		},
		{
			code: "var funcptr = lodash.sample;",
			errors: [ { message: "_.sample is forbidden as it uses Math.Random" } ]
		},
		{
			code: "function name() { var num = lodash.sampleSize(); }",
			errors: [ { message: "_.sampleSize is forbidden as it uses Math.Random" } ]
		},
		{
			code: "var funcptr = lodash.sampleSize;",
			errors: [ { message: "_.sampleSize is forbidden as it uses Math.Random" } ]
		},
		{
			code: "function name() { var num = lodash.random(); }",
			errors: [ { message: "_.random is forbidden as it uses Math.Random" } ]
		},
		{
			code: "var funcptr = lodash.random;",
			errors: [ { message: "_.random is forbidden as it uses Math.Random" } ]
		}
	]
});
