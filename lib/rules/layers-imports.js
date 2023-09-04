/**
 * @fileoverview checks that imports are only from lower layers
 * @author Maks
 */
"use strict";

const { isPathRelative, getCurrentFileLayer } = require('../helpers/helpers');
const micromatch = require('micromatch');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const availableLayers = {
  app: ['pages', 'widgets', 'features', 'entities', 'shared'],
  pages: ['widgets', 'features', 'entities', 'shared'],
  widgets: ['features', 'entities', 'shared'],
  features: ['entities', 'shared'],
  entities: ['entities', 'shared'],
  shared: ['shared']
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "checks that imports are only from lower layers",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: "object",
        properties: {
          alias: {
            type: "string",
          },
          ignoreImportPatterns: {
            type: 'array'
          }
        },
      }
    ]
  },

  create(context) {
    const {alias, ignoreImportPatterns = []} = context.options[0] || {};
 
    return {
      ImportDeclaration(node) {
        const value = node.source.value  
        const importTo = alias ? value.replace(`${alias}/`, '') : value;
        const segments = importTo?.split('/')
        const importLayer = segments?.[0]
        const currentFilePath = context.getFilename()

        if(isPathRelative(importTo)) return true
        const currentFileLayer = getCurrentFileLayer(currentFilePath);

        if(!availableLayers[currentFileLayer] || !availableLayers[importLayer]) return true
        const isIgnored = ignoreImportPatterns.some((pattern) => micromatch.isMatch(importTo, pattern))
        if (isIgnored) return true;


        if(!availableLayers[currentFileLayer].includes(importLayer)){
          context.report({
            node: node,
            message: "Imports should be only from lower layers",
          });
        }

      }
    };
  },
};