import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtCard, AtButton, AtListItem, AtTextarea } from "taro-ui"
import callIcon from '../assets/img/call_icon.png'
import BaseMenu from '../components/BaseMent'
import '../assets/exam.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '答题结果'
  }
  state = {
    answerLabel: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    examList: [],
    examInfo: {},
    userInfo: {}
  }
  componentDidMount () {
    this.queryResult()
  }

  queryResult () {
    const resultJson = new Promise(resolve => {
      Taro.fetch({
        url: '/result/findById',
        method: 'GET',
        data: { resultId: this.$router.params.resultId }
      }).then(result => {
        let userInfo = result.attr
        this.setState({ userInfo })
        let resultArr = JSON.parse(result.attr.resultJson)
        resolve(resultArr)
      })
    })
    resultJson.then(data => {
      this.queryExamInfo(data)
    })
  }

  showAnswer (res, resultArr) {
    res.rows.map(item => {
     resultArr && resultArr.map(ele => {
        if (item.id == ele.id) {
          item.options.map(subItem => {
            if (item.questionType === 1) {
              // 单选回显
              if (ele.optionId === subItem.optionId) {
                subItem.isCheck = true
              }
            }
            if (item.questionType === 2) {
              // 多选回显
              if (ele.optionId.split(',').map(Number).includes(subItem.optionId)) {
                subItem.isCheck = true
              }
            }
          })
          if (item.questionType === 3) {
            // 问答回显
            item.text = ele.text
          }
        }
      })
    })
  }

  // 获取正确答案
  getAnswerLabel (row, type = 'right') {
    let { options, questionType } = row
    const { answerLabel } = this.state
    let rightIndexArr = []
    options.map((item, index) => {if ( type === 'right' ? !!item.isRight : !!item.isCheck) { rightIndexArr.push(index)}})
    let result = ''
    if (questionType == 1) {
     result = answerLabel[rightIndexArr.join()]
    } else if (questionType == 2) {
      rightIndexArr.map(item => { result += answerLabel[item] })
    }
    return result
  }

  callTel (telephone) {
    window.location.href = `tel:${telephone}`
  }

  isCorrect (item) {
    if (item.questionType !== 3) {
      return this.getAnswerLabel(item, 'choose') == this.getAnswerLabel(item) ? true : false
    }
  }

  queryExamInfo (data) {
    let { examId, resultId } = this.$router.params
    Taro.fetch({
      url: '/exam/findById',
      method: 'GET',
      data: { examId }
    }).then(res => {
      this.showAnswer(res, data)
      this.setState({
        examInfo: res.attr,
        examList: res.rows
      })
    })
  }

  render () {
    const { examList, examInfo, userInfo, answerLabel } = this.state
    return (
      <View className='exam-page exam-result-page'>
        <BaseMenu title={`${userInfo.applicant}的答题结果`} />
        <View className='user-info'>
          <View className='row'>
            <View>答题人: {userInfo.applicant}</View>
            <View 
              className='tel'
              onClick={this.callTel.bind(this, userInfo.telephone)}>
              手机号: 
              <Image className='call-icon' src={callIcon} />
              {userInfo.telephone}
            </View>
          </View>
          <View>所答试卷: {examInfo.examName}</View>
          <View>期望薪资: {userInfo.salaryMin / 1000}k ~ {userInfo.salaryMax / 1000}k</View>
          <View>答题开始时间: {userInfo.startTime}</View>
          <View>答题结束时间: {userInfo.endTime}</View>
        </View>
        <View>
          { examList.map((item, index) => (
            <View key={index}>
              <AtCard 
                isFull 
                title={`${index+1}、${item.questionName}`}
                extra={this.isCorrect(item) ? '回答正确' : '回答错误'}
              >
                {item.questionType !== 3 && 
                  <View>
                    {item.options.map((answer, subI) => (
                      <View key={subI}>
                        <View className={answer.isCheck ? this.isCorrect(item) ? 'options checkedbg' : 'options error-bg' : 'options'}>
                          <View>{this.isCorrect(item)}</View>
                          <View className='index'>{answerLabel[subI]}.</View>
                          <AtListItem className='exam-list-item' title={answer.optionName} />
                        </View>
                      </View>
                    ))}
                  <View className='right-text'>正确答案: {this.getAnswerLabel(item)}</View>
                  </View>
                }
                { item.questionType == 3 && 
                  <AtTextarea
                    disabled
                    value={item.text}
                    maxLength={999}
                    placeholder='他没回答'
                  />
                }
              </AtCard>
            </View>
          ))}
        </View>
      </View>
    )
  }
}
