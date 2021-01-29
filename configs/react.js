module.exports = {
	"extends": [
		"plugin:webgl-logic/default",
		"plugin:react/recommended"
	],
	"plugins": [
		"react"
	],
	"settings": {
		"react": {
			"version": "16.8"
		}
	},
	"rules": {
		"webgl-logic/noMathRandom": 0,
		"webgl-logic/noSetTimeout": 0,
		"no-console": 0,

		"no-return-assign": [2, "except-parens"],

		// ignore react rules for now until we find time to refactor LanguageGUI and AnimationBuilder
		"react/prop-types": 0,
		"react/no-deprecated": 0,
		"react/no-direct-mutation-state": 0,
		"react/no-find-dom-node": 0,
		"react/jsx-key": 0
	},
	"globals": {
		"global": false
	},
	"env": {
		"es6": true,
		"browser": true
	}
};
