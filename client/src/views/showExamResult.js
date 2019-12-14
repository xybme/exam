import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtCard, AtButton, AtListItem, AtTextarea } from "taro-ui"
import CHECK_ICON from '../assets/img/check_icon.png'
import BaseMenu from '../components/BaseMent'
import '../assets/exam.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '试卷'
  }
  state = {
    answerLabel: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    examList: [],
    examInfo: {}
  }
  componentDidMount () {
    this.queryExam()
  }

  queryExam () {
    const query = this.$router.params
    let { resultJson } = query
    console.log(decodeURIComponent(resultJson))
    const { examId } = query
    Taro.fetch({
      url: '/exam/findById',
      method: 'GET',
      data: { examId }
    }).then(res => {
      res.rows.map(item => {
        // console.log(item)
        if (item.id == 7) {
          item.options[0].isCheck = true
        }
      })
      this.setState({ 
        examInfo: res.attr,
        examList: res.rows
      })
    })
  }


  render () {
    const { examList, examInfo, answerLabel } = this.state
    return (
      <View className='exam-page exam-result-page'>
        <BaseMenu title='答题结果' />
        <View className='exam-title'>{examInfo.examName}</View>
        <View>
          { examList.map((item, index) => (
            <View className='question-item' key={index}>
              <AtCard 
                isFull 
                title={`${index+1}、${item.questionName}`}
                extra={111}
              >
                {item.questionType !== 3 && item.options.map((answer, subI) => (
                  <View key={subI}>
                    <View  className={answer.isCheck ? 'options checkedbg' : 'options'}>
                      <View className='index'>{answerLabel[subI]}.</View>
                      <AtListItem className={answer.isCheck && 'checked'} title={answer.optionName} />
                      { answer.isCheck && 
                        <Image src={CHECK_ICON} className='check'></Image>
                      }
                    </View>
                  </View>
                ))}
                { item.questionType !== 3 && <View>
                    <View>正确答案</View>
                  </View>
                }
                { item.questionType == 3 && 
                  <AtTextarea
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
