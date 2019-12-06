/**
 * 问卷模块
 */
import request from '@/utils/request'

export default {
  query: data => {
    return request({ url: '/survey/query', data, method: 'GET' })
  },
  queryDetail: data => {
    return request({ url: '/survey/queryDetail', data, method: 'GET' })
  },
  surveyUpdate: data => {
    return request({ url: '/survey/update', data })
  },
  surveyAdd: data => {
    return request({ url: '/survey/add', data })
  },
  questionAdd: data => {
    return request({ url: '/question/add', data })
  },
  optionCount: data => {
    return request({ url: '/option/count', data })
  }
}
