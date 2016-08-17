var getConfig = require('hjs-webpack')

module.exports = getConfig({
  in: 'src/app.jsx',
  out: 'dist',
  cleanBeforeBuild: true
})
