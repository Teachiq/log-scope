const path = require('path')
function resolveSrc (_path) {
  return path.join(__dirname, _path)
}

const aliases = {
  '@': 'src',
  __mocks__: 'tests/unit/__mocks__',
}

module.exports = {
  rollup: [],
  webpack: {},
  jest: {},
}

Object.entries(aliases).forEach(([alias, route]) => {
  module.exports.webpack[alias] = resolveSrc(route)
  module.exports.jest[`^${alias}/(.*)$`] = `<rootDir>/${route}/$1`
  module.exports.rollup.push({
    find: alias,
    replacement: path.resolve(__dirname, route),
  })
})
