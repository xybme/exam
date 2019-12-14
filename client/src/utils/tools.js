import Taro from '@tarojs/taro'

// 确认框
export function confirm(options) {
  const showCancel = options.showCancel === undefined ? true : options.showCancel
  return Taro.showModal({
    title: options.title || '提示',
    content: options.content,
    showCancel,
    cancelText: options.cancelText || '取消',
    cancelColor: '#333',
    confirmText: options.confirmText || '确认',
    confirmColor: '#fe2121'
  })
}
// toast
export function toast(msg) {
  return Taro.showToast({
    title: msg,
    icon: 'none',
    duration: 2000
  })
}
// 对象序列化
export function serializeObj(obj) {
  if (!obj) return ''
  var pairs = []
  for (var key in obj) {
    var value = obj[key]
    if (value instanceof Array) {
      for (var i = 0; i < value.length; ++i) {
        pairs.push(key + '[' + i + ']' + '=' + value[i])
      }
      continue
    }
    pairs.push(key + '=' + encodeURIComponent(obj[key]))
  }
  return pairs.join('&')
}
// 复制
export function copy(copyText) {
  if (process.env.TARO_ENV === 'h5') {
    // execCommand复制必须操纵可编辑区域的内容 就是输入框
    const input = document.createElement('input')
    input.setAttribute('readonly', 'readonly')
    input.setAttribute('value', copyText)
    document.body.appendChild(input)
    input.select()
    // 复制的文本长度
    input.setSelectionRange(0, 9999)
    if (document.execCommand('copy')) {
      document.execCommand('copy')
      Taro.showToast({title: '已复制'})
    }
    document.body.removeChild(input)
  } else {
    Taro.setClipboardData({data: copyText}).then(() => {
      Taro.showToast({title: '已复制'})
    })
  }
}