import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtCard, AtButton, AtListItem, AtTextarea } from "taro-ui"

import CHECK_ICON from '../assets/img/check_icon.png'
import '../assets/exam.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '试卷'
  }
  state = {
    questionTypeArr: ['', '单选', '多选', '问答'],
    answerLabel: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    examList: [],
    examInfo: {},
    resultJson: []
  }
  componentDidMount () {
    this.queryExam()
  }
  
  changeTextArea (index, e) {
    let { examList } = this.state
    let { value } = e.detail
    examList[index].text = value
    this.setState({ examList })
  }

  // 选择题操作
  chooseAnswer (index, subI, questionType) {
    let { examList } = this.state
    let options = examList[index].options
    if (questionType == 1) {
      // 1 单选
      let rightArr = options.filter(item => !!item.isCheck)
      if (rightArr.length) {
        rightArr[0].isCheck = false
      }
      options[subI].isCheck = true
    } else if (questionType == 2) {
      options[subI].isCheck = !options[subI].isCheck
    }
    
    let result = examList.map(item => {
      let id = item.id
      let optionId = ''
      let text = ''
      let hasCheckAnswer = item.options.filter(option => !!option.isCheck)

      if (item.questionType == 1 && hasCheckAnswer.length) {
        optionId = hasCheckAnswer[0].optionId
      } else if (item.questionType == 2 && hasCheckAnswer.length) {
        let ids = []
        hasCheckAnswer.map(queiyId => { ids.push(queiyId.optionId) })
        optionId = ids.join()
      } else if (item.questionType == 3) {
         text = item.text
      }
      return [ item.questionType !== 3 ? {id, optionId} : {id, text} ]
    })
    let resultJson = JSON.stringify(result)

    this.setState({ examList, resultJson })
  }

  queryExam () {
    const { examId = 2 } = this.$router.params
    Taro.fetch({
      url: '/exam/findById',
      method: 'GET',
      data: { examId }
    }).then(res => {
      this.setState({ 
        examInfo: res.attr,
        examList: res.rows
      })
    })
  }

  submitExam () {
    const { resultId = 1 } = this.$router.params
    let { resultJson } = this.state
    console.log(resultJson);
    Taro.fetch({
      url: '/result/update',
      data: { resultId, resultJson }
    }).then(() => {
    })
  }

  render () {
    const { examList, questionTypeArr, examInfo, answerLabel } = this.state
    return (
      <View className='exam-page'>
        <View className='exam-title'>{examInfo.examName}</View>
        <View>
          { examList.map((item, index) => (
            <View className='question-item' key={index}>
              <AtCard 
                isFull 
                title={`${index+1}、${item.questionName}`}
                extra={questionTypeArr[item.questionType]}
              >
                {item.questionType !== 3 && item.options.map((answer, subI) => (
                  <View 
                    className={answer.isCheck ? 'options checkedbg' : 'options'}
                    key={subI}
                    onClick={this.chooseAnswer.bind(this, index, subI, item.questionType)}
                  >
                    <View className='index'>{answerLabel[subI]}.</View>
                    <AtListItem className={answer.isCheck && 'checked'} title={answer.optionName} />
                    { answer.isCheck &&  <Image src={CHECK_ICON} className='check'>选择了</Image>}
                  </View>
                ))}
                { item.questionType == 3 && 
                  <AtTextarea
                    value={item.text}
                    onChange={this.changeTextArea.bind(this, index)}
                    maxLength={999}
                    placeholder='你的回答是...'
                  />
                  }
              </AtCard>
            </View>
          ))}
        </View>
        <AtButton
          className='center-btn' 
          type='primary'
          onClick={this.submitExam.bind(this)}
        >
          提交
        </AtButton>
        {/* <View className='submit-success'>
          <View className='tips'>
            <View>答题完成</View>
          </View>
        </View> */}
      </View>
    )
  }
}
