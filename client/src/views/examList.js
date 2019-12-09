import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem, AtButton } from "taro-ui"
import BaseMenu from '../components/BaseMent'
import '../assets/exam.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '试卷'
  }
  state = {
    examList: []
  }
  componentDidMount () {
    this.queryExamList()
    // Taro.fetch({
    //   url: '/exam/findById?examId=1',
    //   method: 'GET'
    // }).then(res => {
    //   console.log(res)
    // })
  }
  addExam () {
    Taro.navigateTo({ url: '/views/examCfg' })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  showQrCode () {
    
  }

  queryExamList () {
    Taro.fetch({
      url: '/exam/list',
      method: 'GET'
    }).then(res => {
      this.setState({ examList: res.rows })
    })
  }

  render () {
    const { examList } = this.state
    return (
      <View className='question-list'>
        <BaseMenu title='试卷' />
        <AtButton onClick={this.addExam.bind(this)}>新增试卷</AtButton>
        <AtList>
          { examList.map((item, index) => (
            <AtListItem 
              onClick={this.showQrCode.bind(this)}
              key={index}
              title={item.examName} 
              note={item.createTime}
              extraText={item.describe}
            />
          ))}
        </AtList>
      </View>
    )
  }
}
