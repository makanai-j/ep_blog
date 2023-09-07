import HelloPlugin from './HelloPlugin.vue'

const helloPlugin = {
  install(app) {
    app.component('HelloPlugin', HelloPlugin)
  },
}

export default helloPlugin
