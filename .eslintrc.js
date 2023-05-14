module.exports = {
  parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   project: 'tsconfig.json',
  //   tsconfigRootDir: __dirname,
  //   sourceType: 'module',
  // },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  // plugins: ["@typescript-eslint/eslint-plugin"],
  plugins: ['@typescript-eslint'],
  // extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  extends: ['standard', 'prettier'],
  root: true,
  // env: {
  //   node: true,
  //   jest: true,
  env: {
    browser: true,
    es2021: true,
  },
  // },
  // ignorePatterns: [".eslintrc.js"],
  // rules: {
  //   "@typescript-eslint/interface-name-prefix": "off",
  //   "@typescript-eslint/explicit-function-return-type": "off",
  //   "@typescript-eslint/explicit-module-boundary-types": "off",
  //   "@typescript-eslint/no-explicit-any": "off",
  // },
  rules: {
    '@typescript-eslint/camelcase': 'off',
    camelcase: 'off',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'off',
    'new-cap': 'off',
  },
};
