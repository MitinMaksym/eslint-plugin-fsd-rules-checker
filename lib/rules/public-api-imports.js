/**
 * @fileoverview Checks if modules are imported from publick api
 * @author Maks
 */
"use strict";

const { isPathRelative } = require('../helpers/helpers');
const micromatch = require('micromatch');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const allowedLayers = ["entities", "features", "pages", "widgets"];
/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Checks if modules are imported from publick api",
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
          testPatterns: {
            type: 'array'
          }
        },
      }
    ], // Add a schema if the rule has options
  },

  create(context) {
    const alias = context.options[0].alias || "";
    const testPatterns = context.options[0].testPatterns
  

    return {
      ImportDeclaration(node) {
        const value = node.source.value  
        const importTo = alias ? value.replace(`${alias}/`, '') : value;
        const segments = importTo.split('/')
        const layer = segments[0]

        if(isPathRelative(importTo)) return true


        const isPublicTestingApi = segments[2] === 'testing' && segments.length < 4
        if(isPublicTestingApi){
          const isTestingFile = testPatterns.some(pattern => micromatch.isMatch(context.getFilename(), pattern))
 
          if(!isTestingFile){
            return context.report({
              node: node,
              message: "Testing public api should be used only in testing files",
            });

          }
          return;
        }

        if(allowedLayers.includes(layer)){
          const importNotFromPublicApi = segments.length > 2;
          if (importNotFromPublicApi) {
            context.report({
              node: node,
              message: "Import should be from public api",
            });
          }
        }
      }
    }
  },
}
