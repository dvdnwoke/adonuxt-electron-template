'use strict'

const Env = use('Env')
const Config = use('Config')
const ElectronStart = require('../../../main')
const { Nuxt, Builder } = require('nuxt')

class NuxtController {

  constructor () {
    let config = Config.get('nuxt')
    const url = `http://${Env.get('HOST')}:${Env.get('PORT')}`
    let electronConfig = Config.get('electron')
    electronConfig.dev = config.dev
    config.dev = Env.get('NODE_ENV') === 'development'

    this.nuxt = new Nuxt(config)
    // Start build process (only in development)
    if (config.dev) {
      new Builder(this.nuxt).build()
      new ElectronStart(url, electronConfig)
    }
  }

  * render (request, response) {
    this.nuxt.render(request.request, response.response)
  }
}

module.exports = new NuxtController()
