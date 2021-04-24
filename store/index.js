import Vue from 'vue'
import Vuex from 'vuex'

import G_NAME from './global_name'
// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
      G_NAME
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
