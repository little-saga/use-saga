import pkg from './package.json'

const external = ['little-saga', 'react']

export default [
  {
    input: 'index.js',
    output: {
      file: pkg.main,
      format: 'cjs',
    },
    external,
  },
  {
    input: 'index.js',
    output: {
      file: pkg.module,
      format: 'es',
    },
    external,
  },
]
