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