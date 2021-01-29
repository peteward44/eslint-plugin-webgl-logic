module.exports = {
	"extends": "plugin:webgl-logic/default",
	"rules": {
		"max-lines-per-function": 0,
		"webgl-logic/noSetTimeout": 0,
		"webgl-logic/noAsyncAwait": 0,
		"no-restricted-properties": [2, {
			"object": "it",
			"property": "only",
			"message": "Do not commit it.only() calls to master."
		},
		{
			"object": "describe",
			"property": "only",
			"message": "Do not commit describe.only() calls to master."
		}],
		"jsdoc/require-description": 0,
		"jsdoc/require-jsdoc": [1, { "require": { "ClassDeclaration": true, "ClassExpression": true, "FunctionDeclaration": true, "MethodDefinition": true } }]
	},
	"globals": {
		"global": false
	},
	"env": {
		"amd": true,
		"mocha": true,
		"es6": true,
		"node": true,
		"browser": true
	}
};
