var getConfig = require('hjs-webpack')
var autoprefixer = require('autoprefixer')

var config = getConfig({
  in: 'src/app.jsx',
  out: 'dist',
  cleanBeforeBuild: true,
  hostname: 'kragle.local'
})

config.module.postcss = [autoprefixer({ browsers: ['last 3 versions'] })]

module.exports = config
