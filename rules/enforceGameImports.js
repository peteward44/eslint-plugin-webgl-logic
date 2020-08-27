// Copied from https://github.com/eslint/eslint/blob/4111d21a046b73892e2c84f92815a21ef4db63e1/lib/rules/no-restricted-imports.js#L208 and adapted for
// more flexible name matching

/**
 * @fileoverview Restrict usage of specified node imports.
 * @author Guy Ellis
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const arrayOfStrings = {
    type: "array",
    items: { type: "string" },
    uniqueItems: true
};

const arrayOfStringsOrObjects = {
    type: "array",
    items: {
        anyOf: [
            { type: "string" },
            {
                type: "object",
                properties: {
                    name: { type: "string" },
                    message: {
                        type: "string",
                        minLength: 1
                    },
                    importNames: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    }
                },
                additionalProperties: false,
                required: ["name"]
            }
        ]
    },
    uniqueItems: true
};

module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description: "disallow specified modules when loaded by `import`",
            category: "ECMAScript 6",
            recommended: false,
            url: ""
        },

        messages: {
            path: "'{{importSource}}' import is restricted from being used.",
            // eslint-disable-next-line eslint-plugin/report-message-format
            pathWithCustomMessage: "'{{importSource}}' import is restricted from being used. {{customMessage}}",

            patterns: "'{{importSource}}' import is restricted from being used by a pattern.",

            everything: "* import is invalid because '{{importNames}}' from '{{importSource}}' is restricted.",
            // eslint-disable-next-line eslint-plugin/report-message-format
            everythingWithCustomMessage: "* import is invalid because '{{importNames}}' from '{{importSource}}' is restricted. {{customMessage}}",

            importName: "'{{importName}}' import from '{{importSource}}' is restricted.",
            // eslint-disable-next-line eslint-plugin/report-message-format
            importNameWithCustomMessage: "'{{importName}}' import from '{{importSource}}' is restricted. {{customMessage}}"
        },

        schema: {
            anyOf: [
                arrayOfStringsOrObjects,
                {
                    type: "array",
                    items: [{
                        type: "object",
                        properties: {
                            paths: arrayOfStringsOrObjects,
                            patterns: arrayOfStrings
                        },
                        additionalProperties: false
                    }],
                    additionalItems: false
                }
            ]
        }
    },

    create(context) {
        const sourceCode = context.getSourceCode();
        const options = Array.isArray(context.options) ? context.options : [];
        const isPathAndPatternsObject =
            typeof options[0] === "object" &&
            (Object.prototype.hasOwnProperty.call(options[0], "paths") || Object.prototype.hasOwnProperty.call(options[0], "patterns"));

        const restrictedPaths = (isPathAndPatternsObject ? options[0].paths : context.options) || [];

        const restrictedPathMessages = restrictedPaths.reduce((memo, importSource) => {
            if (typeof importSource === "string") {
                memo[importSource] = { message: null };
            } else {
                memo[importSource.name] = {
                    message: importSource.message,
                    importNames: importSource.importNames
                };
            }
            return memo;
        }, {});

        /**
         * Report a restricted path.
         * @param {string} importSource path of the import
         * @param {Map<string,Object[]>} importNames Map of import names that are being imported
         * @param {node} node representing the restricted path reference
         * @returns {void}
         * @private
         */
        function checkRestrictedPathAndReport(importSource, importNames, node) {
            if (!Object.prototype.hasOwnProperty.call(restrictedPathMessages, importSource)) {
                return;
            }

            const customMessage = restrictedPathMessages[importSource].message;
            const restrictedImportNames = restrictedPathMessages[importSource].importNames;

            if (restrictedImportNames) {
                if (importNames.has("*")) {
                    const specifierData = importNames.get("*")[0];

                    context.report({
                        node,
                        messageId: customMessage ? "everythingWithCustomMessage" : "everything",
                        loc: specifierData.loc,
                        data: {
                            importSource,
                            importNames: restrictedImportNames,
                            customMessage
                        }
                    });
                }

                restrictedImportNames.forEach(importName => {
                    if (importNames.has(importName)) {
                        const specifiers = importNames.get(importName);

                        specifiers.forEach(specifier => {
                            context.report({
                                node,
                                messageId: customMessage ? "importNameWithCustomMessage" : "importName",
                                loc: specifier.loc,
                                data: {
                                    importSource,
                                    customMessage,
                                    importName
                                }
                            });
                        });
                    }
                });
            } else {
                context.report({
                    node,
                    messageId: customMessage ? "pathWithCustomMessage" : "path",
                    data: {
                        importSource,
                        customMessage
                    }
                });
            }
        }

        /**
         * Report a restricted path specifically for patterns.
         * @param {node} node representing the restricted path reference
         * @returns {void}
         * @private
         */
        function reportPathForPatterns(node) {
            const importSource = node.source.value.trim();
			
			const match = importSource.match( /_([^_]*)$/ );
			const suffix = match ? match[1] : '';
            context.report({
                node,
                message: `${importSource} should be replaced with Game_${suffix}`
            });
        }

        /**
         * Check if the given importSource is restricted by a pattern.
         * @param {string} importSource path of the import
         * @returns {boolean} whether the variable is a restricted pattern or not
         * @private
         */
        function isRestrictedPattern(importSource) {
			const match = importSource.match( /(.*)(_Client|_Logic|_Assets|_Shared)(\/.*)?$/i );
			if ( match ) {
				return !['Game', 'Client', 'Shared', 'Logic', 'Assets'].includes( match[1] ); // needs exception made for Shared_Logic module
			}
			return false;
		}

        /**
         * Checks a node to see if any problems should be reported.
         * @param {ASTNode} node The node to check.
         * @returns {void}
         * @private
         */
        function checkNode(node) {
            const importSource = node.source.value.trim();
            const importNames = new Map();

            if (node.type === "ExportAllDeclaration") {
                const starToken = sourceCode.getFirstToken(node, 1);

                importNames.set("*", [{ loc: starToken.loc }]);
            } else if (node.specifiers) {
                for (const specifier of node.specifiers) {
                    let name;
                    const specifierData = { loc: specifier.loc };

                    if (specifier.type === "ImportDefaultSpecifier") {
                        name = "default";
                    } else if (specifier.type === "ImportNamespaceSpecifier") {
                        name = "*";
                    } else if (specifier.imported) {
                        name = specifier.imported.name;
                    } else if (specifier.local) {
                        name = specifier.local.name;
                    }

                    if (name) {
                        if (importNames.has(name)) {
                            importNames.get(name).push(specifierData);
                        } else {
                            importNames.set(name, [specifierData]);
                        }
                    }
                }
            }

            checkRestrictedPathAndReport(importSource, importNames, node);

            if (isRestrictedPattern(importSource)) {
                reportPathForPatterns(node);
            }
        }

        return {
            ImportDeclaration: checkNode,
            ExportNamedDeclaration(node) {
                if (node.source) {
                    checkNode(node);
                }
            },
            ExportAllDeclaration: checkNode
        };
    }
};
