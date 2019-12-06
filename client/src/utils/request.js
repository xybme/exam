import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { Loading } from 'element-ui'
import serialize from './serialize'
import { getToken, setToken, removeToken } from '@/utils/auth'

let loadingInstance = null
// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:3000/tool',
  method: 'POST',
  timeout: 20000 // 请求超时时间
})
// request拦截器，请求发送之前做一些操作
service.interceptors.request.use(
  config => {
    const param = config.data || {}
    !!getToken() && (config.headers['token'] = getToken())
    // 防止serialize会把Number类型值改为 String
    if (config.method.toLocaleUpperCase() === 'POST') {
      config.body = param
    } else {
      config.params = param
    }
    loadingInstance = Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(255, 255, 255, 0.2)'
    })
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    loadingInstance.close()
    const { token } = response.headers
    if (token) {
      setToken(token)
      window.sessionStorage.setItem('token', token)
    }
    // 不成功先弹错误
    const { success, message } = response.data
    if (!success) {
      Message({
        message: message || '接口错误',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    loadingInstance.close()
    const { response: { status, data: { message }}} = error
    if (status === 401) {
      MessageBox.confirm(
        '你已被登出，可以取消继续留在该页面，或者重新登录',
        '确定登出',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        removeToken()
        window.sessionStorage.clear()
        window.localStorage.clear()
        location.reload()
      })
    }
    Message({
      message: message || '网络错误',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
