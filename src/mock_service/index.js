let mockService = {
  getInitData: { // 获取商城页面初始化数据
    methods: 'GET',
    isMock: true,
    overUrl: '/index/initData'
  },
  userRegister: {
    methods: 'POST',
    isMock: false,
    overUrl: '/user/register'
  },
  userLogin: {
    methods: 'POST',
    isMock: false,
    overUrl: '/user/login'
  }
}
export default mockService
