import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem, AtButton } from "taro-ui"
import BaseMenu from '../components/BaseMent'
import { serializeObj } from '../utils/tools'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '试卷'
  }
  state = {
    examList: []
  }
  componentDidMount () {
    this.queryExamList()
  }
  addExam () {
    Taro.navigateTo({ url: '/views/examCfg' })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  updataExam (item) {
    const { describe, examId, examName, questionIds } = item
    const queryParams = serializeObj({ describe, examId, examName, questionIds } )
    Taro.navigateTo({ url: `/views/examCfg?${queryParams}`})
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
        <AtList>
          { examList.map((item, index) => (
            <AtListItem 
              onClick={this.updataExam.bind(this, item)}
              key={index}
              title={item.examName} 
              note={item.describe}
              extraText={item.questionIds}
            />
          ))}
        </AtList>
        <AtButton className='bottom-btn' type='primary' onClick={this.addExam.bind(this)}>新增试卷</AtButton>
      </View>
    )
  }
}
