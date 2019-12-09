import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtNavBar, AtDrawer } from 'taro-ui'
import '../assets/base_ments.scss'

export default class Index extends Component {

  state = {
    show: false,
    menus: ['职位配置', '题目配置', '试卷'],
    urlArr: ['positionCfg', 'questionList', 'examList']
  }

  handleClick (type) {
    switch (type) {
      case 'left': Taro.navigateBack() 
        break;
      case 'right': this.setState({ show: true })
        break;
      default:
        break;
    }
  }

  onItemClick (index) {
    const url = this.state.urlArr[index]
    Taro.navigateTo({ url })
  }

  render () {
    return (
      <View className='index'>
        <AtNavBar
          onClickRgIconSt={this.handleClick.bind(this, 'right')}
          onClickLeftIcon={this.handleClick.bind(this, 'left')}
          color='#000'
          title={this.props.title || 'title'}
          leftText='返回'
          leftIconType='chevron-left'
          rightFirstIconType='bullet-list'
        />

        <AtDrawer 
          show={this.state.show} 
          left 
          mask 
          items={this.state.menus}
          onItemClick={this.onItemClick.bind(this)}
        ></AtDrawer>

      </View>
    )
  }
}
