/**
 * @fileoverview FSD relative path checker
 * @author Maksym
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/path-checker"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 6, sourceType: "module" },

});

const options = [{ alias: "@" }]


ruleTester.run("path-checker", rule, {
  valid: [
    {
      filename:
        "/Users/mitinmaksym/Documents/Projects/home-projects/blog-platform/src/features/AuthByUsername/ui/LoginForm",
      code: `'../../model/selectors/selectLoginUsername/selectLoginUsername'`,
      options
    },
  ],

  invalid: [
    {
      filename:
        "/Users/mitinmaksym/Documents/Projects/home-projects/blog-platform/src/features/AuthByUsername/ui/LoginForm",
      code: `import { selectLoginUsername } from '@/features/AuthByUsername/model/selectors/selectLoginUsername/selectLoginUsername';`,
      errors: [{ message: "Path should be relative within a separate slice" }],
      options
    },
  ],
});
