/**
 * @fileoverview Deprecated hierarchy separator
 * @author Yann Braga
 */
'use strict'

const { docsUrl } = require("../utils")

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: 'Deprecated hierachy separator in title property',
      categories: ['csf'],
      recommended: true,
      recommendedConfig: 'warn',
      url: docsUrl('hierarchy-separator'), // URL to the documentation page for this rule
    },
    messages: {
      fixSuggestion: 'Use correct separators',
      deprecatedHierarchySeparator: 'Deprecated hierachy separator in title property: {{metaTitle}}.',
    },
  },
  create: function (context) {
    return {
      ExportDefaultDeclaration: function (node) {
        // Typescript 'TSAsExpression' has properties under declaration.expression
        const metaProperties = node.declaration.properties || node.declaration.expression.properties

        if (!metaProperties) {
          return
        }

        const titleNode = metaProperties.find((prop) => prop.key.name === 'title')

        if (!titleNode) {
          return;
        }

        const metaTitle = titleNode.value.raw

        if (metaTitle.includes('|') || metaTitle.includes('.')) {
          context.report({
            node,
            messageId: 'deprecatedHierarchySeparator',
            data: { metaTitle },
            // In case we want this to be auto fixed by --fix
            fix: function (fixer) {
              return fixer.replaceTextRange(
                titleNode.value.range,
                metaTitle.replace(/\|/g, '/')
              )
            },
            suggest: [
              {
                messageId: 'fixSuggestion',
                fix: function (fixer) {
                  return fixer.replaceTextRange(
                    titleNode.value.range,
                    metaTitle.replace(/\||\./g, '/')
                  )
                },
              },
            ],
          })
        }
      },
    }
  },
}