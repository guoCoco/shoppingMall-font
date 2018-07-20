import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios'
import http from './http'
import { Button, Row, Col, Search, Swipe, SwipeItem, List, Field, NavBar, Toast } from 'vant'

Vue.use(Button).use(Row).use(Col).use(Search).use(Swipe).use(SwipeItem).use(List).use(Field).use(NavBar)

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

Vue.prototype.$http = http
Vue.prototype.$Toast = Toast
console.log(http)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
