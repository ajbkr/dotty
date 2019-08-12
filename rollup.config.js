import copy from 'rollup-plugin-copy'
import htmlBundle from 'rollup-plugin-html-bundle'
import serve from 'rollup-plugin-serve'

export default {
  external: [
    'kontra'
  ],
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    globals: {
      kontra: 'kontra'
    }
  },
  plugins: [
    copy({
      targets: [
        {
          dest: 'dist',
          src: 'node_modules/kontra/kontra.js'
        }
      ]
    }),
    htmlBundle({
      inline: true,
      target: 'dist/index.html'
    }),
    serve('dist')
  ]
}
