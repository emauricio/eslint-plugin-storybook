/**
 * @fileoverview Component property should be set
 * @author Yann Braga
 */
"use strict";

const { docsUrl } = require("../utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: "The component property should be set",
      categories: ['csf'],
      recommended: false,
      recommendedConfig: 'warn',
      url: docsUrl('csf-component'), // URL to the documentation page for this rule
    },
    messages: {
      description: 'Missing component property.'
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      ExportDefaultDeclaration: function (node) {
        // Typescript 'TSAsExpression' has properties under declaration.expression
        const metaProperties = node.declaration.properties || node.declaration.expression.properties

        if (!metaProperties) {
          return
        }

        const component = metaProperties.find((prop) => prop.key.name === 'component')

        if (!component) {
          context.report({
            node,
            messageId: 'description'
          })
        }
      },
    };
  },
};