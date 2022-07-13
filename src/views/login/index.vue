<template>
  <div class="login">
    <van-nav-bar title="账号登录" left-arrow  @click-left='$router.back()'/>
    <van-form @submit="onSubmit">
      <van-field
        v-model.trim="username"
        name="username"
        placeholder="请输入账号"
        class="username"
      />
      <van-field
        v-model.trim="password"
        type="password"
        name="password"
        placeholder="请输入密码"
        class="password"
      />
      <div style="margin: 16px">
        <van-button square block type="info" native-type="submit" class="btn"
          >登录</van-button
        >
      </div>
    </van-form>
    <router-link to="/register" class="register"
      >还没有账号,去注册~</router-link
    >
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  data() {
    return {
      username: 'ljsdsg',
      password: '123456'
    }
  },
  methods: {
    async onSubmit(values) {
      if (this.username.length <= 0 || this.password.length <= 0) return this.$toast('输入内容不能为空')
      const regUser = /^[a-zA-Z1-9]{5,8}$/
      const regPwd = /^[a-zA-Z1-9]{5,12}$/
      if (!regUser.test(this.username)) {
        this.$toast('用户名格式5-8位的字母和数字')
      }
      if (!regPwd.test(this.password)) {
        this.$toast('密码格式5-12位的字母和数字')
      }
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await login(values)
        // console.log(res);
        this.$store.commit('saveUser', res.data.body)
        this.$router.push('/home')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="less">
.btn {
  border: none;
  border-radius: 2px;
}
.van-cell {
  margin-top: 20px;
  left: 50%;
  margin-left: -174px;
  padding: 0 0;
  width: 345px;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #ccc !important;
}
.register {
  display: block;
  background: transparent;
  font-size: 14px;
  color: #ccc;
  padding-left: 110px;
}
</style>
