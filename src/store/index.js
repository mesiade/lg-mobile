import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储登录用户数据
    user: JSON.parse(window.localStorage.getItem('lagou-edu-mobile-user') || null)
  },
  mutations: {
    // 修改user
    setUser (state, payload) {
      // payload为请求到的用户数据，JSON格式不方便操作，转换为对象存储
      state.user = JSON.parse(payload)
      // 本地存储
      window.localStorage.setItem('lagou-edu-mobile-user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
