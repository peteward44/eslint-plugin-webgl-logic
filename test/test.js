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
		"var val = Math.random2();"
	],

	invalid: [
		{
			code: "function name() { var num = Math.random(); }",
			errors: [ { message: "Math.Random is forbidden" } ]
		},
		{
			code: "var funcptr = Math.random;",
			errors: [ { message: "Math.Random is forbidden" } ]
		}
	]
});
