module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        ENV: true
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    rules: {
        'linebreak-style': ['error', 'windows'],
        'import/no-unresolved': 0,
        'no-unused-vars': 0,
        'import/prefer-default-export': 0,
        'no-use-before-define': 0,
        'no-shadow': 0,
        'no-restricted-syntax': 0,
        'no-return-assign': 0,
        'no-param-reassign': 0,
        'no-sequences': 0,
        'no-loop-func': 0,
        'no-nested-ternary': 0,
        "@typescript-eslint/no-explicit-any": ["off"]
    }
}
