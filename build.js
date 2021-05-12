require('dotenv').config()

const _ = require('lodash')
const { errToPlainObj, getBaseurl, getenv } = require('./utils')
const { inspect } = require('util')
const fg = require('fast-glob')
const fsPromises = require('fs').promises
const htmlMinifier = require('html-minifier').minify
const log = require('debug')('app:index')
const path = require('path')
const pug = require('pug')
const UglifyJS = require('uglify-js')

exports.build = async () => {
  const PUG_OPTIONS = {
    basedir: path.resolve(__dirname),
    baseurl: getBaseurl(),
    NODE_ENV: getenv('NODE_ENV', 'production'),
  }

  const htmlMinifierOptions = {
    caseSensitive: true,
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    decodeEntities: true,
    minifyCSS: true,
    minifyJS: code => UglifyJS.minify(code).code,
    removeCDATASectionsFromCDATA: true,
    removeComments: true,
    removeCommentsFromCDATA: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    sortAttributes: true,
    sortClassName: true,
    useShortDoctype: true,
  }

  // compile pug files
  const pugFiles = _.map(await fg('src/**/*.pug'), file => file.slice(4))

  let pugErrors = 0
  for (const file of pugFiles) {
    try {
      const html = htmlMinifier(pug.renderFile(path.resolve(__dirname, 'src', file), PUG_OPTIONS), htmlMinifierOptions)
      const dist = path.resolve(__dirname, 'dist', file.replace(/\.pug$/, '.html'))
      await fsPromises.mkdir(path.dirname(dist), { recursive: true })
      await fsPromises.writeFile(dist, html)
    } catch (err) {
      _.set(err, 'data.src', `./src/${file}`)
      log(`Failed to render pug, err = ${inspect(_.omit(errToPlainObj(err), ['stack']), { depth: 100, sorted: true })}`)
      pugErrors++
    }
  }
  if (pugErrors) throw new Error(`Failed to render ${pugErrors} pug files.`)
}
