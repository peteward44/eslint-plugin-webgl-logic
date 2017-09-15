'use strict';


module.exports = function(context) {
	return {
		"MemberExpression": (node) => {
			if ( node.object.name === "Math" && node.property.name === "random" ) {
				context.report( { node, message: "Math.Random is forbidden" } );
			} else if ( node.object.name === "_" || node.object.name === "lodash" ) {
				if ( node.property.name === "shuffle" ) {
					context.report( { node, message: "_.shuffle is forbidden as it uses Math.Random" } );
				} else if ( node.property.name === "sample" ) {
					context.report( { node, message: "_.sample is forbidden as it uses Math.Random" } );
				} else if ( node.property.name === "random" ) {
					context.report( { node, message: "_.random is forbidden as it uses Math.Random" } );
				} else if ( node.property.name === "sampleSize" ) {
					context.report( { node, message: "_.sampleSize is forbidden as it uses Math.Random" } );
				}
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
