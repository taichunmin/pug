const _ = require('lodash')

exports.getenv = (key, defaultval) => _.get(process, ['env', key], defaultval)

exports.getBaseurl = (() => {
  const baseurl = _.trimEnd(exports.getenv('BASEURL', 'https://taichunmin.idv.tw/pug/'), '/') + '/'
  return () => baseurl
})()
