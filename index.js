const _ = require('lodash')
const fs = require('fs').promises
const log = require('debug')('app:index')
const path = require('path')
const pug = require('pug')

exports.build = async () => {
  const PUG_OPTIONS = {
    basedir: path.resolve(__dirname, 'src'),
  }

  const pugFiles = _.filter(await fs.readdir(PUG_OPTIONS.basedir), file => {
    return file.indexOf('.') !== 0 && (file.slice(-4) === '.pug')
  })

  for (const file of pugFiles) {
    try {
      const html = pug.renderFile(path.resolve(__dirname, 'src', file), PUG_OPTIONS)
      await fs.writeFile(path.resolve(__dirname, 'dist', file.replace(/\.pug$/, '.html')), html)
    } catch (err) {
      log(err)
      throw err
    }
  }
}
