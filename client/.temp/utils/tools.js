import Taro, { showToast as _showToast } from "@tarojs/taro-h5";

// 对象序列化
export function serializeObj(obj) {
  if (!obj) return '';
  var pairs = [];
  for (var key in obj) {
    var value = obj[key];
    if (value instanceof Array) {
      for (var i = 0; i < value.length; ++i) {
        pairs.push(key + '[' + i + ']' + '=' + value[i]);
      }
      continue;
    }
    pairs.push(key + '=' + encodeURIComponent(obj[key]));
  }
  return pairs.join('&');
}

export function isPhoneNum(str) {
  return (/^1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/.test(str)
  );
}

// 复制
export function copy(copyText) {
  {
    // execCommand复制必须操纵可编辑区域的内容 就是输入框
    const input = document.createElement('input');
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', copyText);
    document.body.appendChild(input);
    input.select();
    // 复制的文本长度
    input.setSelectionRange(0, 9999);
    if (document.execCommand('copy')) {
      document.execCommand('copy');
      _showToast({ title: '已复制' });
    }
    document.body.removeChild(input);
  }
}