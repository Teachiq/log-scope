module.exports = {
  presets: [
    ['@babel/preset-env'],
    [
      'minify',
      {
        keepFnName: true,
        keepClassName: true,
      },
    ],
  ],
  comments: false,
}
