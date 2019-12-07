export function filterParam(param, condition) {
  let where = {}
  if (typeof param === 'object') {
    for (let key in param) {
      if (condition.includes(key) && param[key] !== '') {
        where[key] = param[key]
      }
    }
  }
  return where
}
/**
 * 
 * @param param 返回分页参数
 */
export function filterPage(param) {
  const { everyPage, currentPage } = param
  return {
    everyPage: Number(everyPage || 10),
    currentPage: Number(currentPage || 1)
  }
}