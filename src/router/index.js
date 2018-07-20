import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMail from '@/pages/shopping/shoppingMall'
import Register from '@/pages/register/register'
import Login from '@/pages/register/login'

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
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        title: '新用户注册',
        keepAlive: false
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录',
        keepAlive: false
      }
    }
  ]
})
