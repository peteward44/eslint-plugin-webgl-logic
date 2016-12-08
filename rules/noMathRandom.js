'use strict';


module.exports = function(context) {
	return {
		"MemberExpression": (node) => {
			if ( node.object.name === "Math" && node.property.name === "random" ) {
				context.report( { node, message: "Math.Random is forbidden" } );
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
