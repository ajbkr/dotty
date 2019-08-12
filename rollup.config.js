const fs = require('fs')
const path = require('path')

import htmlBundle from 'rollup-plugin-html-bundle'
import serve from 'rollup-plugin-serve'

export default {
  external: [
    'kontra'
  ],
  input: 'src/main.js',
  output: {
    banner: fs.readFileSync(path.join(__dirname, 'node_modules/kontra/kontra.min.js'), 'utf-8'),
    file: 'dist/bundle.js',
    format: 'iife',
    globals: {
      kontra: 'kontra'
    }
  },
  plugins: [
    htmlBundle({
      inline: true
    }),
    serve('dist')
  ]
}
