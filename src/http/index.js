// import Vue from 'vue'
import mockService from '../mock_service/index.js'
const axios = require('axios')

// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}
/*
  接口处理函数
*/
function apiAxios (actionName, params, success, showIndicator = false, failure) {
  console.log()
  let curAction = mockService[actionName] || {}

  let root
  console.log(curAction)
  if (curAction.isMock) {
    root = 'https://www.easy-mock.com/mock/5b500bcc3720ca0b98ba8350/example/'
  } else {
    root = 'http://localhost:3000/'
  }
  console.log(root)
  let url = curAction.overUrl
  if (params) {
    params = filterNull(params)
  }
  if (showIndicator) {
    console.log('加载动效')
  }
  axios({
    method: curAction.methods,
    url: url,
    data: curAction.methods === 'POST' || curAction.methods === 'PUT' ? params : null,
    params: curAction.methods === 'GET' || curAction.methods === 'DELETE' ? params : null,
    baseURL: root,
    timeout: 30000,
    withCredentials: false
  })
    .then(function (res) {
      console.log(res)
      if (res.status === 200) {
        success(res.data)
      } else {
        alert('请求不是200')
      }
    })
    .catch(function (err) {
      // Vue.loading.end()
      if (err) {
        console.log(err)
        alert('网络错误，请稍后再试！')
      }
    })
}

// 返回在vue模板中的调用接口
export default {
  run: function (actionName, params, success, showIndicator, failure) {
    return apiAxios(actionName, params, success, showIndicator, failure)
  }
}// 接口调用工具
