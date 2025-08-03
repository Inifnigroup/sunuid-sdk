import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/sunuid-sdk.js',
  output: [
    {
      file: 'dist/sunuid-sdk.js',
      format: 'iife',
      name: 'SunuID',
      sourcemap: true
    },
    {
      file: 'dist/sunuid-sdk.esm.js',
      format: 'es',
      sourcemap: true
    },
    {
      file: 'dist/sunuid-sdk.min.js',
      format: 'iife',
      name: 'SunuID',
      plugins: [terser()],
      sourcemap: true
    }
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    })
  ]
};
