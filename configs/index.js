module.exports = {
	"extends": [
		"plugin:webgl-logic/plugins-base",
		"plugin:jsdoc/recommended"
	],
	"rules": {
		"webgl-logic/noMathRandom": 2,
		"webgl-logic/noSetTimeout": 2,
		"webgl-logic/enforceGameImports": 2,
		"max-lines-per-function": [2, { "max": 200, "skipBlankLines": true, "skipComments": true }],
		"max-classes-per-file": [2, 2],
		"no-async-promise-executor": 0,
		"arrow-parens": 0,
		"prefer-object-spread": 0,

		// TODO: Use this to replace webgl-logic/noMathRandom and webgl-logic/noSetTimeout at some point.
	//  "no-restricted-properties": [2,
	//      {
	//          "object": "Math",
	//          "property": "random",
	//          "message": "Use the random functions provided by the library instead."
	//      },
	//      { "object": "global", "property": "setTimeout" },
	//      { "object": "global", "property": "clearTimeout" },
	//      { "object": "global", "property": "setInterval" },
	//      { "object": "global", "property": "clearInterval" },
	//      { "object": "window", "property": "setTimeout" },
	//      { "object": "window", "property": "clearTimeout" },
	//      { "object": "window", "property": "setInterval" },
	//      { "object": "window", "property": "clearInterval" }
	//  ],
	//  "no-restricted-globals": [2, "setTimeout", "clearTimeout", "setInterval", "clearInterval"],

		"prefer-destructuring": 0,
		"no-restricted-properties": 0,
		
		// jsdoc rules
		"jsdoc/require-property": 0,
		"jsdoc/check-access": 1,
		"jsdoc/check-alignment": 1,
		"jsdoc/check-values": 1,
		"jsdoc/check-syntax": 1,
		"jsdoc/empty-tags": 1,
		"jsdoc/implements-on-classes": 1,
		"jsdoc/require-description": [1, { "exemptedBy": ["constructor"], "contexts": ["ClassDeclaration", "ClassExpression", "FunctionDeclaration", "FunctionExpression", "MethodDefinition"] } ],
		"jsdoc/require-returns-description": 0,
		"jsdoc/require-returns": [1, { "exemptedBy": ["member"] }],
		"jsdoc/require-jsdoc": [1, { "require": { "ClassDeclaration": true, "ClassExpression": true, "FunctionDeclaration": true, "FunctionExpression": true, "MethodDefinition": true } }],
		"jsdoc/require-hyphen-before-param-description": 1,
		"jsdoc/require-property-description": 1,
		"jsdoc/require-property-name": 1,
		"jsdoc/require-property-type": 1,
		
		// These would be nice to turn on at some point in the future but would require significant changes to get them to work properly
		"jsdoc/no-undefined-types": 0,
		"jsdoc/check-types": 0,
		"jsdoc/check-tag-names": 0,
		
		// disable these
		"no-param-reassign": 0,
		"quotes": 0,
		"arrow-body-style": 0,
		"prefer-template": 0,
		"object-shorthand": 0,
		"no-unreachable": 0, // temp until we know how to deal with #ifdefs
		"no-empty": 0,
		"no-else-return": 0,
		"no-tabs": 0,
		"dot-notation": 0,
		"func-names": 0,
		"import/no-unresolved": 0,
		"import/no-extraneous-dependencies": 0,
		"no-plusplus": 0,
		"no-lonely-if": 0,
		"no-continue": 0,
		"linebreak-style": 0,
		"class-methods-use-this": 0,
		"import/no-absolute-path": 0,
		"no-prototype-builtins": 0,
		"no-useless-constructor": 0,
		"import/prefer-default-export": 0, // TODO: Pete needs to go through existing code to fix this when enabled

		"import/extensions": [2, "always", {"ignorePackages": true}],
		
		// enable these as warnings
		"space-infix-ops": 1,
		"space-before-function-paren": [1, { "anonymous": "never", "named": "never" }],
		"space-in-parens": [1, "always", { "exceptions": ["empty"] }], // would be nice to turn to always, but be ok with ( (2-1) ). Right now it'd have to be ((2-1)) or ( ( 2 - 1 ) )
		"spaced-comment": [1, "always"],
		"max-len": [1, 300],
		"indent": [1, "tab", { "SwitchCase": 1, "ignoreComments": true }],
		"quote-props": [1, "consistent"],
		"no-trailing-spaces": 1,

		// enable these as errors
		"strict": 2,
		"constructor-super": 2,
		"no-unused-vars": [2, { "vars": "local", "args": "none" }],
		"comma-dangle": [2, "never"],
		"no-console": 2,
		"no-bitwise": 2,
		"no-mixed-operators": [
			2,
			{ "allowSamePrecedence": true }
		],
		"no-unused-expressions": [2, { "allowTernary": true }],
		"no-underscore-dangle": [2, { "allowAfterThis": true }], // Only allow underscore dangling when part of an object
		"no-empty-function": 2,
		// Same as airbnb config but with ForInStatement removed
		"no-restricted-syntax": [
			2,
			"DebuggerStatement",
			//      'ForInStatement',
			"LabeledStatement",
			"WithStatement"
		],
		// Disallow variables starting with numberOf
		"id-match": [
			2,
			"^(?!(_numberOf|numberOf)).*$",
			{
				"properties": true
			}
		],
		"sort-class-members/sort-class-members": [
			2,
			{
				"order": [
					"[static-properties]",
					"[static-methods]",
					"constructor",
					"destroy",
					"[properties]",
					"[conventional-private-properties]",
					"[getters]",
					"[setters]",
					"[accessor-pairs]",
					"[event-handlers]",
					"[methods]",
					"[conventional-private-methods]"
				],
				"accessorPairPositioning": "getThenSet",
				"groups": {
					"event-handlers": [{ "name": "/_on.+/", "type": "method" }]
				}
			}
		],
		"no-await-in-loop": 0,
		"no-return-await": 0,
		"no-multi-assign": 0,

		"no-multiple-empty-lines": [ 1, { "max": 2, "maxEOF": 1 } ],
		"operator-linebreak": [ 1, "before" ],
		"object-curly-newline": 0,
		"function-paren-newline": 0
	},
	"globals": {
		"global": false
	},
	"env": {
		"es6": true,
		"node": true,
		"browser": true
	}
};

