import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@wessberg/rollup-plugin-ts'
import filesize from 'rollup-plugin-filesize'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import postcss from 'rollup-plugin-postcss'

const path = require('path')
const packageName = require('./package.json').name

export default {
  input: 'src/wrapper/index.ts',
  output: {
    name: packageName,
    dir: 'lib',
    format: 'cjs',
    exports: 'named',
  },
  plugins: [
    typescript({
      tsconfig: resolvedConfig => ({
        ...resolvedConfig,
        declaration: true,
        allowJs: false,
      }),
    }),
    resolve(),
    commonjs(),
    postcss({
      extract: true,
    }),
    getBabelOutputPlugin({
      configFile: path.resolve(__dirname, 'babel.config.js'),
    }),
    filesize(),
  ],
}
