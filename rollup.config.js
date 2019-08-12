import htmlBundle from 'rollup-plugin-html-bundle'
import serve from 'rollup-plugin-serve'
import { terser } from 'rollup-plugin-terser'

const fs = require('fs')
const path = require('path')

export default {
  external: [
    'kontra'
  ],
  input: 'src/main.js',
  output: {
    banner: fs.readFileSync(path.join(__dirname, 'node_modules/kontra/kontra.js'), 'utf-8'),
    file: 'dist/bundle.js',
    format: 'iife',
    globals: {
      kontra: 'kontra'
    }
  },
  plugins: [
    terser(),
    htmlBundle({
      inline: true
    }),
    serve('dist')
  ]
}
