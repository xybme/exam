// 对象参数序列化
const serialize = params => {
  let entries = []
  for (let [k, v] of Object.entries(params)) {
    v = v === null ? ''
                  : (typeof v === 'object') ? JSON.stringify(v)
                  : (typeof v === 'string') ? v.replace(/^\s+|\s+$/g, '')
                  : v
    entries.push(`${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
  }
  return entries.join('&')
}

export default serialize
