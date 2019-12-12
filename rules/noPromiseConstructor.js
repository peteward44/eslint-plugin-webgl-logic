'use strict';

module.exports = function( context ) {
	return {
		"NewExpression": ( node ) => {
			const isUsingGlobal = (node.callee.type === "MemberExpression" && node.callee.property.name === "Promise" && ( node.callee.object.name === "window" || node.callee.object.name === "global"));
			if (node.callee.name === "Promise" || isUsingGlobal ) {
				context.report({ node, message: "Promise constructor is forbidden" });
			}
		}
	};
};

module.exports.schema = [
	{
		"type": "object",
		"properties": {},
		"additionalProperties": false
	}
];
