'use strict';


module.exports = function( context ) {
	return {
		"MemberExpression": ( node ) => {
			if ( node.object.name === "Promise" && node.property.name === "all" ) {
				context.report( { node, message: "Promise.all is forbidden" } );
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
