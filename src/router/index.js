import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMail from '@/pages/shopping/shoppingMall'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShoppingMail',
      component: ShoppingMail,
      meta: {
        title: '首页',
        keepAlive: true
      }
    }
  ]
})
