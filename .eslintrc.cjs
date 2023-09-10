/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  rules: {
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'prettier/prettier': [
      'warn',
      {
        // useTabs：使用tab缩进还是空格缩进，选择false；
        useTabs: false,
        // tabWidth：tab是空格的情况下，是几个空格，选择2个
        tabWidth: 2,
        // printWidth：当行字符的长度，推荐80，也有人喜欢100或者120
        printWidth: 100,
        // singleQuote：使用单引号还是双引号，选择true，使用单引号；
        singleQuote: true,
        // trailingComma：在多行输入的尾逗号是否添加，设置为 `none`；
        trailingComma: 'none',
        // semi：语句末尾是否要加分号，默认值true，选择false表示不加；
        semi: false
      }
    ],
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index']
      }
    ],
    'vue/no-setup-props-destructure': ['off'],
    '@typescript-eslint/no-unused-vars': ['off']
  },
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
