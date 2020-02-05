const fs = require('fs').promises
const log = require('debug')('app:index')
const path = require('path')
const pug = require('pug')

const pugFiles = [
  'index',
  'ncov-mask-map',
  'tw-invonce',
]

exports.build = async () => {
  const PUG_OPTIONS = {
    basedir: path.resolve(__dirname, 'src'),
  }

  for (const file of pugFiles) {
    try {
      const html = pug.renderFile(path.resolve(__dirname, 'src', `${file}.pug`), PUG_OPTIONS)
      await fs.writeFile(path.resolve(__dirname, 'dist', `${file}.html`), html)
    } catch (err) {
      log(err)
      throw err
    }
  }
}
