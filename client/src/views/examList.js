import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem, AtButton } from "taro-ui"
import BaseMenu from '../components/BaseMent'
import { serializeObj } from '../utils/tools'
import '../assets/exam_list.scss'

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

  showQrCode (examId) {
    let url = `/views/register?examId=${examId}`
    Taro.navigateTo({ url })
    console.log(url);
  }

  updataExam (item, e) {
    e.stopPropagation()
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
      <View className='exam-list'>
        <BaseMenu title='试卷列表' />
        <AtList>
          { examList.map((item, index) => (
            <View className='item-wrap' onClick={this.showQrCode.bind(this, item.examId)} key={index}>
              <AtListItem 
                title={item.examName}
                note={item.describe}
                // extraText={item.questionIds}
              />
              <View 
                onClick={this.updataExam.bind(this, item)} 
                className='update-btn'
              >
                修改
              </View>
            </View>
          ))}
        </AtList>
        <View className='bottom-btn-wrap'>
          <AtButton className='bottom-btn' type='primary' onClick={this.addExam.bind(this)}>新增试卷</AtButton>
        </View>
      </View>
    )
  }
}
