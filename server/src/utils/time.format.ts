import * as moment from 'moment'

/**
 * 用作文件名
 * 返回年月日+随机字符串
 */
export function noncestr() {
  return moment().format('YYYYMMDD') + Math.random().toString(36).slice(-8)
}

/**
 * 数据库返回日期格式化
 */
export const entityDatePipe = {
  to: v => v,
  from: v => moment(v).format('YYYY-MM-DD HH:mm:ss')
}