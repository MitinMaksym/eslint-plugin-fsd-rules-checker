/**
 * @fileoverview Checks if modules are imported from publick api
 * @author Maks
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/public-api-imports"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 6, sourceType: "module" },

});

const options = [{ alias: "@", testPatterns: ["**/StoreDecorator.tsx", "**/*.test.*", "**/*.story.*"] }];
ruleTester.run("public-api-imports", rule, {
  valid: [
    // give me some code that won't trigger a warning
    {
      code: `import { EditableProfileCardButtons } 
      from '@/features/EditProfile';`,
      options,
    },
    {
      code: `import { articleDetailsReducer } from '@/entities/Article/testing'`,
      filename: '/Users/mitinmaksym/Documents/Projects/home-projects/blog-platform/src/shared/config/storybook/decorators/StoreDecorator.tsx',
      options,
    },
  ],

  invalid: [
    {
      code: `import { EditableProfileCardButtons } 
      from '@/features/EditProfile/ui/EditableProfileCardButtons/EditableProfileCardButtons';`,
      errors: [{ message: "Import should be from public api" }],
      options,
    },
    {
      code: `import { articleDetailsReducer } from '@/entities/Article/testing'`,
      filename: '/Users/mitinmaksym/Documents/Projects/home-projects/blog-platform/src/widgets/Navbar/ui/Navbar.tsx',
      errors: [{ message: "Testing public api should be used only in testing files" }],
      options,
    },
    {
      code: `import { articleDetailsReducer } from '@/entities/Article/testing/file.ts'`,
      filename: '/Users/mitinmaksym/Documents/Projects/home-projects/blog-platform/src/shared/config/storybook/decorators/StoreDecorator.tsx',
      errors: [{ message: "Import should be from public api"}],
      options,
    },
  ],
});
