const LoadScript = {
  install(app) {
    const loadScript = () => {
      console.log('load script plugin')
    }
    app.config.globalProperties.$loadScript = loadScript
  },
}

export default LoadScript
