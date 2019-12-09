import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { 
  AtForm,
  AtInput,
  AtList, 
  AtListItem, 
  AtButton,   
  AtModal, 
  AtModalHeader,
  AtModalContent, 
  AtModalAction } from "taro-ui"
import BaseMenu from '../components/BaseMent'
import '../assets/question_list.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '问题列表'
  }
  state = {
    questionTypeArr: ['', '单选', '多选', '问答'],
    questionArr: []
  }
  componentWillMount () {
    this.queryQuestionList()
   }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  queryQuestionList () {
    Taro.fetch({
      url: '/question/list',
      method: 'GET'
    }).then(res => {
      this.setState({ questionArr: res.rows })
    })
  }
  showModalHandle () {
    
  }

  render () {
    const { questionArr, questionTypeArr } = this.state
    return (
      <View className='question-list'>
        <BaseMenu title='题目列表' />
        <AtButton onClick={this.showModalHandle.bind(this, 'open')}>新增问题</AtButton>
        <AtList>
          {
            questionArr.map((item, index) => (
              <AtListItem 
                key={index} 
                title={item.questionName} 
                note={questionTypeArr[item.questionType]} 
                extraText={item.positionId}
              />
            ))
          }
        </AtList>

          {/* <AtModal isOpened>
            <AtModalHeader>标题</AtModalHeader>
            <AtModalContent>
              <AtForm>
              </AtForm>
            </AtModalContent>
            <AtModalAction> 
              <Button onClick={this.showModalHandle.bind(this, 'close')} >取消</Button> 
              <Button>确定</Button> 
            </AtModalAction>
          </AtModal> */}
      </View>
    )
  }
}
