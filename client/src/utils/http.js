import Taro from '@tarojs/taro'

export const API = process.env.NODE_ENV === 'development' ? 'http://192.168.50.161:3000/exam' : '/exam'

export default function fetch(options) {
  const { url, data = {}, method = 'POST', showToast = true, showLoading = false } = options
  const token = Taro.getStorageSync('token')
  const header = {}
  token && (header['token'] = token)
  if (method === 'POST') {
    header['content-type'] = 'application/x-www-form-urlencoded'
  }
  if (showLoading) {
    if (typeof showLoading == 'object') {
      Taro.showLoading(showLoading)
    } else {
      Taro.showLoading({ title: '加载中...' })
    }
  }
  return Taro.request({
    url: API + url,
    method,
    data,
    header
  }).then(res => {
    showLoading && Taro.hideLoading()
    if (res.statusCode === 401) {
      Taro.showModal({
        title: '提示',
        content: '登录失效请重新登录',
        showCancel: false
      }).then(() => {
        Taro.navigateTo({ url: '/views/login' })
      })
      return Promise.reject({ message: '登录失效' })
    }
    const newToken = res.header.token
    if (newToken) {
      Taro.setStorageSync('token', newToken)
    }
    const response = res.data
    if (!response.success) {
      return Promise.reject(response)
    } else {
      return response
    }
  }).catch(err => {
    showLoading && Taro.hideLoading()
    if (showToast) {
      Taro.showToast({
        title: err.message || '请求异常',
        icon: 'none'
      })
    }
    return Promise.reject(err)
  })
}
