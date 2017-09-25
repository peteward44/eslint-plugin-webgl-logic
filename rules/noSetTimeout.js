'use strict';

var forbidden = ["setTimeout", "clearTimeout", "setInterval", "clearInterval"];
var globalObjectNames = ["window", "global"];

module.exports = function(context) {
	return {
		"CallExpression": (node) => {
			if ( forbidden.indexOf( node.callee.name ) >= 0 ) {
				context.report( { node, message: "global " + node.callee.name + " method is forbidden" } );
			}
		},
		"MemberExpression": (node) => {
			if ( globalObjectNames.indexOf( node.object.name ) >= 0 && forbidden.indexOf( node.property.name ) >= 0 ) {
				context.report( { node, message: "global " + node.property.name + " method is forbidden" } );
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
