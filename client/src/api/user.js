/**
 * 权限 用户
 */
import request from '@/utils/request'

export default {
  login: data => {
    return request({ url: '/auth/login', data })
  }
}
