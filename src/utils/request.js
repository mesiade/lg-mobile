import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://edufront.lagou.com'
})

// 设置请求拦截器进行接口鉴权
request.interceptors.request.use(config => {
  const { user } = store.state
  // 检测user是否存在
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
})

export default request
