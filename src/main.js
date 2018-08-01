// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Weather from './Weather'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.filter('tempFormat', temp => {
  return `${Math.round(temp)} ºC`
})

/* eslint-disable no-new */
new Vue({
  el: '#weather',
  router,
  store,
  components: { Weather },
  template: '<Weather/>'
})
