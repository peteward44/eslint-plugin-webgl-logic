module.exports = {
	"extends": "plugin:webgl-logic/default",
	"plugins": [
		"webgl-logic"
	],
	"rules": {
		"webgl-logic/noMathRandom": 0,
		"webgl-logic/noSetTimeout": 0,
		"no-console": 0
	},
	"globals": {
		"global": false
	},
	"env": {
		"amd": true,
		"mocha": true,
		"es6": true,
		"node": true
	}
};
