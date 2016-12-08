'use strict';


module.exports = function(context) {
	return {
		"ArrowFunctionExpression": (node) => {
			if (node.async) {
				context.report({ node, message: 'Async/Await is forbidden' });
			}
		},
		"CallExpression": (node) => { // dont know if this is correct but kept it from example
			if (node.callee.name === 'async') {
				context.report({ node, message: 'Async/Await is forbidden' });
			}
		},
		"FunctionDeclaration": (node) => {
			if (node.async) {
				context.report({ node, message: 'Async/Await is forbidden' });
			}
		}
    };
};

module.exports.schema = [
	{
		"type": "object",
		"properties": {
		},
		"additionalProperties": false
	}
];
