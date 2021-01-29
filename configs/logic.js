module.exports = {
	"extends": "plugin:webgl-logic/default",
	"rules": {
		// Forbid lodash library, server side must use lodash-server instead
		"no-restricted-imports": [
			"error",
			{
				"paths": ["lodash"],
				"patterns": ["Client_*"]
			}
		],
		"webgl-logic/noAsyncAwait": 2,
		"webgl-logic/noPromiseAll": 2,
		"webgl-logic/noPromiseRace": 2
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
