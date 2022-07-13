<template>
  <van-form @submit="onSubmit">
    <van-field
      v-model="username"
      name="username"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="password"
      type="password"
      name="password"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <div style="margin: 16px">
      <van-button round block type="info" native-type="submit">注册</van-button>
    </div>
  </van-form>
</template>

<script>
import { register } from '@/api/user'
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onSubmit() {
      if (this.username.length <= 0 || this.password.length <= 0) return this.$toast('输入内容不能为空')
      const regUser = /^[a-zA-Z1-9]{5,8}$/
      const regPwd = /^[a-zA-Z1-9]{5,12}$/
      if (!regUser.test(this.username)) {
        this.$toast('用户名格式5-8位的字母和数字')
      }
      if (!regPwd.test(this.password)) {
        this.$toast('密码格式5-12位的字母和数字')
      }
      try {
        const res = await register({
          username: this.username,
          password: this.password
        })
        this.$store.commit('saveuser', res.data.body)
        this.$router.push('/login')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style>
</style>
