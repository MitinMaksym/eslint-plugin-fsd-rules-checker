# eslint-plugin-fsd-methodology-rules-checker

Helps to follow FSD methodology rules

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-fsd-methodology-rules-checker`:

```sh
npm install eslint-plugin-fsd-methodology-rules-checker --save-dev
```

## Usage

Add `fsd-methodology-rules-checker` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "fsd-methodology-rules-checker"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "fsd-methodology-rules-checker/rule-name": 2
    }
}
```

## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->


