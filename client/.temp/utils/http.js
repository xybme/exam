import Taro, { getStorageSync as _getStorageSync, showLoading as _showLoading, request as _request, hideLoading as _hideLoading, showModal as _showModal, setStorageSync as _setStorageSync, showToast as _showToast } from "@tarojs/taro-h5";

export const API = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3000/exam' : '/exam';

export default function fetch(options) {
  const { url, data = {}, method = 'POST', showToast = true, showLoading = false } = options;
  const token = _getStorageSync('token');
  const header = {};
  token && (header['token'] = token);
  if (method === 'POST') {
    header['content-type'] = 'application/json';
  }
  if (showLoading) {
    if (typeof showLoading == 'object') {
      _showLoading(showLoading);
    } else {
      _showLoading({ title: '加载中...' });
    }
  }
  return _request({
    url: API + url,
    method,
    data,
    header
  }).then(res => {
    showLoading && _hideLoading();
    if (res.statusCode === 401) {
      _showModal({
        title: '提示',
        content: '登录失效请重新登录',
        showCancel: false
      }).then(() => {
        Taro.navigateTo({ url: '/views/login' });
      });
      return Promise.reject({ message: '登录失效' });
    }
    const newToken = res.header.token;
    if (newToken) {
      _setStorageSync('token', newToken);
    }
    const response = res.data;
    if (!response.success) {
      return Promise.reject(response);
    } else {
      return response;
    }
  }).catch(err => {
    showLoading && _hideLoading();
    if (showToast) {
      _showToast({
        title: err.message || '请求异常',
        icon: 'none'
      });
    }
    return Promise.reject(err);
  });
}