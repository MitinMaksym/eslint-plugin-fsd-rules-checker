/**
 * @fileoverview checks that imports are only from lower layers
 * @author Maks
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/layers-imports"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
const options = [{ alias: "@", testPatterns: [] }];
const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 6, sourceType: "module" },
});

ruleTester.run("layers-imports", rule, {
  valid: [
    {
      code: `import { ArticlesFilters as  ArticlesFiltersType} from '@/entities/Article';`,
      filename:
        "/Users/mitinmaksym/Documents/Projects/home-projects/blog-platform/src/features/ArticlesFilters/ui/ArticlesFilters/ArticlesFilters.tsx",
      options,
    },
    {
      code: `import react from 'react';`,
      filename:
        "/Users/mitinmaksym/Documents/Projects/home-projects/blog-platform/src/features/ArticlesFilters/ui/ArticlesFilters/ArticlesFilters.tsx",
      options,
    },
    {
      code: `import { StateSchema } from '@/app/providers/StoreProvider';`,
      filename:
        "/Users/mitinmaksym/Documents/Projects/home-projects/blog-platform/src/features/ArticleDetailsComments/model/slice/articleDetailsCommentsSlice.ts",
      errors: [{ message: "Imports should be only from lower layers" }],
      options: [{ alias: "@", ignoreImportPatterns: ["**/StoreProvider"] }],
    },
  ],

  invalid: [
    {
      code: `import { ThemeSwitcher } from '@/features/ThemeSwitcher';`,
      filename:
        "/Users/mitinmaksym/Documents/Projects/home-projects/blog-platform/src/shared/ui/Code/Code.tsx",
      errors: [{ message: "Imports should be only from lower layers" }],
      options,
    },
    {
      code: `import { Authoer } from '@/entities/Author';`,
      filename:
        "/Users/mitinmaksym/Documents/Projects/home-projects/blog-platform/src/shared/ui/Input/Input.tsx",
      errors: [{ message: "Imports should be only from lower layers" }],
      options,
    },
    {
      code: `import { StateSchema } from '@/app/providers/StoreProvider';`,
      filename:
        "/Users/mitinmaksym/Documents/Projects/home-projects/blog-platform/src/features/ArticleDetailsComments/model/slice/articleDetailsCommentsSlice.ts",
      errors: [{ message: "Imports should be only from lower layers" }],
      options: options,
    },
  ],
});
