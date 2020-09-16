const _ = require('lodash')
const fsPromises = require('fs').promises
const fg = require('fast-glob')
const log = require('debug')('app:index')
const path = require('path')
const pug = require('pug')

exports.build = async () => {
  const PUG_OPTIONS = {
    basedir: path.resolve(__dirname, 'src'),
  }

  // compile pug files
  const pugFiles = _.map(_.filter(await fg('src/**/*.pug'), file => {
    if (/\/(layout|compoment)-[^/]+\.pug$/.test(file)) return false
    return true
  }), file => file.slice(4))

  for (const file of pugFiles) {
    try {
      const html = pug.renderFile(path.resolve(__dirname, 'src', file), PUG_OPTIONS)
      const dist = path.resolve(__dirname, 'dist', file.replace(/\.pug$/, '.html'))
      await fsPromises.mkdir(path.dirname(dist), { recursive: true })
      await fsPromises.writeFile(dist, html)
    } catch (err) {
      log(file, err)
      throw err
    }
  }
}
