import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import BaseMenu from '../components/BaseMent'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '结果'
  }
  state = {
  }
  
  componentWillMount () {
   }

  componentDidMount () {
    Taro.fetch({
      url: '/result/list',
      method: 'GET'
    }).then(res => {
      console.log(res)
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

 
  showModalHandle () {
    
  }

  render () {
    return (
      <View className='result-page'>
        <BaseMenu title='结果' />
      </View>
    )
  }
}
