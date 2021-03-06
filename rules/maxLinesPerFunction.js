'use strict';

/**
 * @fileoverview A rule to set the maximum number of line of code in a function.
 * @author Pete Ward <peteward44@gmail.com>
 * @see https://github.com/eslint/eslint/issues/9842
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const astUtils = require("../ast-utils");

//------------------------------------------------------------------------------
// Constants
//------------------------------------------------------------------------------

const OPTIONS_SCHEMA = {
    type: "object",
    properties: {
		max: {
			type: "integer",
			minimum: 0
		},
        ignoreComments: {
            type: "boolean"
        },
		skipBlankLines: {
			type: "boolean"
		}
    },
    additionalProperties: false
};

const OPTIONS_OR_INTEGER_SCHEMA = {
    oneOf: [
        OPTIONS_SCHEMA,
        {
            type: "integer",
            minimum: 1
        }
    ]
};

/**
 * Tells if a comment encompasses the entire line.
 * @param {string} line The source line with a trailing comment
 * @param {number} lineNumber The one-indexed line number this is on
 * @param {ASTNode} comment The comment to remove
 * @returns {boolean} If the comment covers the entire line
 */
function isFullLineComment(line, lineNumber, comment) {
	const start = comment.loc.start,
		end = comment.loc.end,
		isFirstTokenOnLine = !line.slice(0, comment.loc.start.column).trim();

	return comment &&
		(start.line < lineNumber || (start.line === lineNumber && isFirstTokenOnLine)) &&
		(end.line > lineNumber || (end.line === lineNumber && end.column === line.length));
}

/**
 * Given a list of comment nodes, return the line numbers for those comments.
 * @param {Array} comments An array of comment nodes.
 * @returns {Map.<string,Node>} An array of line numbers containing comments.
 */
function getCommentLineNumbers(comments) {
	const lines = new Map();
	if ( !comments ) {
		return lines;
	}
	comments.forEach(comment => {
		for (let i = comment.loc.start.line; i <= comment.loc.end.line; i++) {
			lines.set(i, comment);
		}
	});
	
	return lines;
}
		
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "enforce a maximum number of line of code in a function",
            category: "Stylistic Issues",
            recommended: false,
            url: "https://eslint.org/docs/rules/max-lines-per-function"
        },

        schema: [
			OPTIONS_OR_INTEGER_SCHEMA
		]
    },

    create(context) {
		const sourceCode = context.getSourceCode();
		const commentLineNumbers = getCommentLineNumbers( sourceCode.getAllComments() );
		const lines = sourceCode.lines;
		
		const option = context.options[0];
        let maxLines = 200;
		let ignoreComments = true;
		let skipBlankLines = true;

        if (typeof option === "object") {
			if (option.hasOwnProperty("max") && typeof option.max === "number") {
				 maxLines = option.max;
			} else if (option.hasOwnProperty("maximum") && typeof option.maximum === "number") {
				maxLines = option.maximum;
			}
			if (option.hasOwnProperty("ignoreComments") && typeof option.ignoreComments === "boolean") {
				ignoreComments = option.ignoreComments;
			}
			if (option.hasOwnProperty("skipBlankLines") && typeof option.skipBlankLines === "boolean") {
				skipBlankLines = option.skipBlankLines;
			}
        } else if (typeof option === "number") {
            maxLines = option;
        }

        /**
         * Count the lines in the function
         * @returns {void}
         * @private
         */
        function processFunction(node) {
			let lineCount = 0;
			for ( let i=node.loc.start.line-1; i<node.loc.end.line; ++i ) {
				const line = lines[i];
				if (ignoreComments) {
					if ( commentLineNumbers.has( i + 1 ) && isFullLineComment( line, i+1, commentLineNumbers.get( i + 1 ) ) ) {
						continue;
					}
				}
				if (skipBlankLines) {
					if (line.match( /^\s*$/ )) {
						continue;
					}
				}
				lineCount++;
			}

			if (lineCount > maxLines) {
				const name = astUtils.getFunctionNameWithKind(node);
				context.report({
                    node,
                    message: "{{name}} has too many lines ({{lineCount}}). Maximum allowed is {{maxLines}}.",
                    data: { name, lineCount, maxLines }
                });
			}
        }

        //--------------------------------------------------------------------------
        // Public API
        //--------------------------------------------------------------------------

        return {
            FunctionDeclaration: processFunction,
            FunctionExpression: processFunction,
            ArrowFunctionExpression: processFunction
        };
    }
};
