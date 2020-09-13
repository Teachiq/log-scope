module.exports = {
  moduleNameMapper: require('./aliases.config.js').jest,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
}
