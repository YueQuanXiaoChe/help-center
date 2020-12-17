module.exports = {
  // 指定每行最大宽度
  printWidth: 80,
  // 指定每个缩进级别的空格数
  tabWidth: 2,
  // 使用制表符或空格缩进行
  useTabs: false,
  // 在每条语句的末尾添加分号
  semi: true,
  // 使用单引号或双引
  singleQuote: true,
  // 仅在需要时在对象属性周围添加引号
  quoteProps: 'as-needed',
  // 在 JSX 中使用单引号或双引号
  jsxSingleQuote: false,
  // 多行时是否添加尾随逗号
  trailingComma: 'none',
  // 是否在对象的括号之间打印空格
  bracketSpacing: true,
  // 将 > 放在多行JSX元素的最后一行的末尾，而不是放在下一行（不适用于自闭合元素）
  jsxBracketSameLine: true,
  // 在单独的箭头函数参数周围包括括
  arrowParens: 'always',
  // 仅格式化在文件顶部包含特殊注释（称为编译指示）的文件
  requirePragma: true,
  // 在文件顶部插入一个特殊的@format标记，以指定文件已使进行了格式化
  insertPragma: true,
  // 指定HTML文件的全局空格敏感度
  htmlWhitespaceSensitivity: 'ignore',
  // 是否缩进Vue文件中的代码 <script> 和 <style> 标记
  vueIndentScriptAndStyle: true,
  // 设置统一的行结尾样式
  endOfLine: 'lf',
  // 是否识别嵌入式代码，对其进行格式化
  embeddedLanguageFormatting: 'auto'
};
