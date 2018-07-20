 <template>
    <div>
        <van-nav-bar title="用户登录" left-text="返回" left-arrow @click-left="goBack"/>
        <div class="register-panel">
        <van-field v-model="username" :error-message='usernameErrorMsg' label="用户名" icon="clear" placeholder="请输入用户名" required @click-icon="username = ''"/>
        <van-field v-model="password" :error-message='passwordErrorMsg' type="password" label="密码" placeholder="请输入密码" required/>
        <div class="register-button">
            <van-button type="primary" size="large" :loading="openLoading" @click='loginClick'>登录</van-button>
        </div>
       </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      openLoading: false,
      usernameErrorMsg: '',
      passwordErrorMsg: ''
    }
  },
  created () {
    if (localStorage.userInfo) {
      this.$Toast.success('您已经登录')
      this.$router.push('/')
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    loginPost () {
      this.openLoading = true
      let data = {
        UserName: this.username,
        password: this.password
      }
      this.$http.run('userLogin', data, (res) => {
        if (res.code === 200) {
          new Promise((resolve, reject) => {
            localStorage.userInfo = {UserName: this.username}
            setTimeout(() => {
              resolve()
            }, 500)
          }).then(() => {
            this.$Toast.success('登录成功')
            this.$router.push('/')
          }).catch(err => {
            this.$Toast.fail('登录状态保存失败')
            console.log(err)
          })
        } else {
          this.$Toast.fail('登录失败')
          this.openLoading = false
        }
      })
    },
    checkForm () {
      let isOk = true
      if (this.username.length < 5) {
        this.usernameErrorMsg = '用户名不能小于5位'
        isOk = false
      } else {
        this.usernameErrorMsg = ''
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = '密码不能少于6位'
        isOk = false
      } else {
        this.passwordErrorMsg = ''
      }
      return isOk
    },
    loginClick () {
      if (this.checkForm()) {
        this.loginPost()
      }
    }
  }
}
</script>

<style scoped>
    .register-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:50px;
    }
    .register-button{
        padding-top:10px;
    }
</style>
