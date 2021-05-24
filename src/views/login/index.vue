<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 登录表单 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.phone"
        name="phone"
        label="手机号"
        placeholder="手机号"
        :rules="[
          {
            required: true,
            message: '请填写手机号'
          },
          {
            validator: phoneCheck,
            message: '格式有误，请重新输入'
          }
        ]"
      />
      <van-field
        v-model="form.password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[
          {
            required: true,
            message: '请填写密码'
          },
          {
            pattern: /^[a-zA-Z0-9]{6,12}$/,
            message: '格式有误，请重新输入'
          }
        ]"
      />
      <div style="margin: 16px;">
        <van-button
        round
        block
        type="info"
        native-type="submit"
        :loading="isLoading"
        >登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/services/user'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        phone: '',
        password: ''
      },
      // 登录按钮加载中状态
      isLoading: false
    }
  },
  methods: {
    phoneCheck (value) {
      return /^1\d{10}$/.test(value)
    },
    async onSubmit () {
      this.isLoading = true
      const { data } = await login(this.form)
      if (data.state === 1) {
        this.$toast.success('登录成功')
      } else {
        this.$toast.fail('登录失败')
      }
      this.isLoading = false
    },
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped></style>
