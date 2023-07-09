const path = require('path')

/**
 * @fileoverview Check relative paths within a separate module
 * @author Maksym
 */
"use strict";


/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Check relative paths within a separate module",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {


    return {
      ImportDeclaration(node){
        const importTo = node.source.value
        const currentFilename = context.getFilename()

        if(shouldBeRelative(currentFilename, importTo)){
          context.report({node: node, messageId: 'Path within a separate slice should be relative'})
        }

      }
    };
  },
};

const layers = {
  'widgets': 'widgets',
  'pages': 'pages',
  'features': 'features',
  'entities': 'entities',
  'shared': 'shared',

}

function isPathRelative(path){
  return path === '.' || path.startsWith('./') || path.startsWith('../')
}

function shouldBeRelative(currentFilePath, importPath){
  if(isPathRelative(importPath)) return false
  const toArray = importPath.split('/')
  const toLayer = toArray[0] // entities
  const toSlice = toArray[1] // Article

  if(!toLayer || !toSlice || !layers[toLayer]){
    return false
  }

const fromNormalizedPath = path.toNamespacedPath(currentFilePath);
const isWindowsOS = fromNormalizedPath.includes('\\');
const fromPath = fromNormalizedPath.split('src')[1];
const fromArray = fromPath.split(isWindowsOS ? '\\' : '/'); // [ '', 'entities', 'Article' ]
const fromLayer = fromArray[1]; // entities
const fromSlice = fromArray[2]; // Article

if(!fromLayer || !fromSlice || !layers[fromLayer]){
  return false
}

return fromLayer === toLayer && toSlice === fromSlice
 }
console.log(path.toNamespacedPath('/Users/mitinmaksym/Documents/Projects/home-projects/blog-platform').includes('/'))


// console.log(shouldBeRelative('C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\entities\\Article', 'entities/Article/fasfasfas'))
// console.log(shouldBeRelative('C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\entities\\Article', 'entities/ASdasd/fasfasfas'))
// console.log(shouldBeRelative('C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\entities\\Article', 'features/Article/fasfasfas'))
// console.log(shouldBeRelative('C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\features\\Article', 'features/Article/fasfasfas'))
// console.log(shouldBeRelative('C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\entities\\Article', 'app/index.tsx'))
// console.log(shouldBeRelative('C:/Users/tim/Desktop/javascript/GOOD_COURSE_test/src/entities/Article', 'entities/Article/asfasf/asfasf'))
// console.log(shouldBeRelative('C:\\Users\\tim\\Desktop\\javascript\\GOOD_COURSE_test\\src\\entities\\Article', '../../model/selectors/getSidebarItems'))