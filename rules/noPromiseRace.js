'use strict';


module.exports = function( context ) {
    return {
        "MemberExpression": ( node ) => {
            if ( node.object.name === "Promise" && node.property.name === "race" ) {
                context.report( { node, message: "Promise.race is forbidden" } );
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
