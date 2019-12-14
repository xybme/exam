import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'

export default class Login extends Component {
  config = {
    navigationBarTitleText: '登录'
  }
  state = {
    telephone: '18398101098',
    password: '123456'
  }

  handleChange() { }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }


  showModalHandle() {

  }
  submit() {
    Taro.fetch({
      url: '/auth/login',
      data: this.state
    }).then(res => {
      const newToken = res.attr.accessToken
      if (newToken) {
        Taro.setStorageSync('token', newToken)
      }
      Taro.redirectTo({url: '/views/examList'})
    })
  }
  render() {
    return (
      <View className='login-page'>
        <View style='text-align:center;padding:20px 0;'>面试试题管理</View>
        <AtInput
          name='value'
          title='手机号'
          type='text'
          placeholder='请输入手机号'
          value={this.state.telephone}
          onChange={this.handleChange.bind(this)}
        />
        <AtInput
          name='value'
          title='密码'
          type='password'
          placeholder='请输入密码'
          value={this.state.password}
          onChange={this.handleChange.bind(this)}
        />
        <AtButton className='center-btn' type='primary' onClick={this.submit.bind(this)}>登录</AtButton>
      </View>
    )
  }
}
