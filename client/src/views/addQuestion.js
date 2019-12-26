import Taro, { Component } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import { AtInput, AtButton, AtForm, AtSwipeAction, AtTextarea } from 'taro-ui'
import BaseMenu from '../components/BaseMent'
import '../assets/add_question.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '新增问题'
  }
  state = {
    answerLabel: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    questionTypeArr: ['单选', '多选', '问答'],
    positonNameArr: [],
    answerArr: [
      { optionName: '', isRight: 0 },
      { optionName: '', isRight: 0 }
    ],
    questionForm: {
      questionName: '', 
      questionType: 1,
      positionId: '',
      options: []
    }
  }  

  // 选项检验
  optionsCheck () {
    let { questionForm, answerArr, answerLabel } = this.state
    let rightArr = []
    let noOptionNameArr = []
    answerArr.map(item => {
      if (item.optionName === '') {
        noOptionNameArr.push(item)
      }
      if (item.isRight == 1) rightArr.push(item)
    })
    if (noOptionNameArr[0]) {
      let index = answerArr.indexOf(noOptionNameArr[0])
      Taro.showToast({ title: `请输入${answerLabel[index]}答案`, icon: 'none' })
      return
    }
    if (!rightArr.length) {
      Taro.showToast({ title: '至少要一个正确答案', icon: 'none' })
      return
    }
    questionForm.options = JSON.stringify(answerArr)
    this.setState({ questionForm })
  }
  
  savaExamCfg () {
    let { questionForm } = this.state
    if (!questionForm.questionName || !questionForm.positionId) {
      Taro.showToast({ title: '题目名或所属职位没填选', icon: 'none' })
      return
    }
    // 不是问答题就调校验
    if (questionForm.questionType !== 3) {
      let { answerArr, answerLabel } = this.state
      let rightArr = []
      let noOptionNameArr = []
      answerArr.map(item => {
        if (item.optionName === '') {
          noOptionNameArr.push(item)
        }
        if (item.isRight == 1) rightArr.push(item)
      })
      if (noOptionNameArr[0]) {
        let index = answerArr.indexOf(noOptionNameArr[0])
        Taro.showToast({ title: `请输入${answerLabel[index]}答案`, icon: 'none' })
        return
      }
      if (!rightArr.length) {
        Taro.showToast({ title: '至少要一个正确答案', icon: 'none' })
        return
      }
      questionForm.options = answerArr
      this.setState({ questionForm })
    }
    Taro.fetch({
     url: '/question/add',
     data: questionForm
    }).then(res => {
      Taro.navigateTo({ url: '/views/questionList' })
      Taro.showToast({ title: res.message || '新增问题成功', icon: 'success' })
    })
  }

  componentDidMount () {
    this.queryAllPosition()
  }

  // 查询所有职位
  queryAllPosition () {
    Taro.fetch({
      url: '/position/queryAll',
      method: 'GET'
    }).then(res => {
      let positonNameArr = []
      res.rows.map(item => {
        positonNameArr.push(item.positionName)
      })
      this.setState({ positonNameArr })
    })
  }
  
  handleChange (name, formType, e) {
    let { questionForm } = this.state
    let { value } = e.detail
    questionForm[name] = formType === 'picker' ? value + 1 : value
    this.setState({ questionForm })
    console.log(questionForm);
  }

  changeOptionName (index, value) {
    let { answerArr } = this.state
    answerArr[index].optionName = value
    this.setState({ answerArr })
  }

  changeRightAnswer (index, isRight) {
    let { answerArr, questionForm } = this.state
    if (questionForm.questionType === 1) {
      // 1 单选
      let rightArr = answerArr.filter(item => item.isRight == 1)
      if (rightArr.length) {
        rightArr[0].isRight = 0
      }
      answerArr[index].isRight = 1
    } else if (questionForm.questionType === 2) {
      // 2 多选
      answerArr[index].isRight = isRight === 0 ? 1 : 0
    }
    this.setState({ answerArr })
  }

  addAnswer () {
    let { answerArr } = this.state
    answerArr.push({
      optionName: '',
      isRight: 0
    })
    this.setState({ answerArr })
  }

  deleteAnswer (index) {
    let { answerArr } = this.state
    answerArr.splice(index, 1)
    this.setState({ answerArr })
  }

  swipeActionHancle (obj) {
    let { answerArr } = this.state
    if (obj.text === '删除') {
      if (answerArr.length <= 2) {
        Taro.showToast({ title: '至少要两个答案', icon: 'none'})
        return
      }
      this.deleteAnswer()
    } else if (obj.text === '新增') {
      if (answerArr.length >= 7) {
        Taro.showToast({ title: '最多七个答案', icon: 'none'})
        return
      }
      this.addAnswer()
    }
  }

  render () {
    const { questionForm, questionTypeArr, positonNameArr, answerArr, answerLabel } = this.state
    return (
      <View className='add-question'>
        <BaseMenu title='新增问题' />
        <AtForm>
          <View>
            <Picker 
              mode='selector' 
              range={questionTypeArr} 
              onChange={this.handleChange.bind(this, 'questionType', 'picker')}
            >
              <View className='text-row'>题目类型: {questionTypeArr[questionForm.questionType - 1]|| '选择类型'}</View>
            </Picker>
            <Picker 
              mode='selector' 
              range={positonNameArr} 
              onChange={this.handleChange.bind(this, 'positionId', 'picker')}
            >
              <View className='text-row'> 所属职位: {positonNameArr[questionForm.positionId - 1] || '选择职位'}</View>
            </Picker>
          </View>
          <AtTextarea
            value={questionForm.questionName}
            onChange={this.handleChange.bind(this, 'questionName', 'textarea')}
            maxLength={200}
            placeholder='问题题目是...'
          />
          {
           questionForm.questionType !== 3 && answerArr.map((item,index) => (
              <AtSwipeAction autoClose onClick={this.swipeActionHancle.bind(this)} key={index}  options={[
                { text: '新增', style: { backgroundColor: '#6190E8' }},
                { text: '删除', style: { backgroundColor: '#FF4949' }}
              ]}
              >
                <View className='answer-wrap'>
                  <View>{answerLabel[index]}、</View>
                  <AtInput
                    className='input'
                    type='text'
                    placeholder={`输入${answerLabel[index]}答案`} 
                    value={item.optionName}
                    onChange={this.changeOptionName.bind(this, index)}
                  />
                  <AtButton className={item.isRight ? 'isright-btn isright-btn-true' : 'isright-btn'} 
                    onClick={this.changeRightAnswer.bind(this, index, item.isRight)}
                  >
                    { item.isRight ? '正确' : '错误'}
                  </AtButton>
                </View>
              </AtSwipeAction>
            ))
          }
          { questionForm.questionType !== 3 && <View className='tips'>tips: 往左滑上面的选项弹出新增/删除</View>}
          <AtButton className='center-btn' type='primary' size='normal' onClick={this.savaExamCfg.bind(this)}>保存题目配置</AtButton>
        </AtForm>
      </View>
    )
  }
}
