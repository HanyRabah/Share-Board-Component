import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import less from 'rollup-plugin-less';
import { version } from './package.json';

export default {
  input: './src/index.js',
  output: {
      file: './public/library.min.js',
      format: 'umd',
      banner: '/* EmailsInput version ' + version + ' */',
      name: 'EmailsInput',
  },
  plugins: [
    babel({
        exclude: 'node_modules/**'
    }),
    less({
      insert: true,
      output: false
    }),
    uglify()
  ]
}
