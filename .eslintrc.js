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
        'no-unused-vars': 0
    }
}
