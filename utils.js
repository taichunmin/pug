const _ = require('lodash')

exports.getenv = (key, defaultval) => _.get(process, ['env', key], defaultval)

exports.getBaseurl = (() => {
  const baseurl = _.trimEnd(exports.getenv('BASEURL', 'https://taichunmin.idv.tw/pug/'), '/') + '/'
  return () => baseurl
})()

exports.errToPlainObj = (() => {
  const ERROR_KEYS = [
    'address',
    'code',
    'data',
    'dest',
    'errno',
    'info',
    'message',
    'name',
    'path',
    'port',
    'reason',
    'response.data',
    'response.headers',
    'response.status',
    'stack',
    'status',
    'statusCode',
    'statusMessage',
    'syscall',
  ]
  return err => _.pick(err, ERROR_KEYS)
})()
