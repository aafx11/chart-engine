import path from 'path'
// babel 转化代码
import babel from '@rollup/plugin-babel'
// 解决node_modules三方包找不到问题
import resolve from '@rollup/plugin-node-resolve'
// 解析cjs格式的包
import commonjs from '@rollup/plugin-commonjs'
// 解决node api使用问题
import builtins from 'rollup-plugin-node-builtins'
// ts编译插件
import typescript from 'rollup-plugin-typescript2'
// 压缩代码
import { terser } from 'rollup-plugin-terser'
// 处理json问题
import json from '@rollup/plugin-json'
// 配置别名
import alias from '@rollup/plugin-alias'
// 打包前删除原有目录
import del from 'rollup-plugin-delete'
import eslint from '@rollup/plugin-eslint'
import pkg from './package.json'
const getPath = _path => path.resolve(__dirname, _path)

export default {
  input: './src/index.ts',
  output: [
    {
      file: 'lib/sparrow.js',
      format: 'cjs'
    },
    {
      file: 'esm/sparrow.js',
      format: 'esm'
    },
    {
      file: 'dist/sparrow.min.js',
      name: 'sp',
      format: 'umd' // 对于 Nodejs 和浏览器，打包成混合模式
    }
  ],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    del(),
    builtins(),
    json(),
    alias({
      entries: {
        '@packages': './packages'
      }
    }),
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['packages/**'],
      exclude: ['node_modules/**', 'dist/**']
    }),
    typescript({
      tsconfig: getPath('./tsconfig.json'), // 导入本地ts配置
      extensions: ['.ts', 'tsx']
    }),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs(),
    terser()
  ]
}
