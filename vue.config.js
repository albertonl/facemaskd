module.exports = {
  chainWebpack: config => {
    config
    .plugin('html')
    .tap(args 0> {
      args[0].title = 'FaceMask\'d - Face Mask Recognition'
    })
  }
}
