module.exports = {
  devServer: {
    port: 8081
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: ' @import "@/assets/Style.scss"; '
      }
    }
  },
  runtimeCompiler: true
}