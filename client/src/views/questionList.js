import Taro, { Component } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import { AtList, AtListItem, AtButton, AtPagination, AtAccordion } from "taro-ui"
import BaseMenu from '../components/BaseMent'
import '../assets/question_list.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '问题列表'
  }
  state = {
    currentPage: 1,
    totalRecords: 0,
    questionTypeArr: ['单选', '多选', '问答'],
    positonNameArr: [],
    questionArr: [],
    searchForm: {
      positionId: '',
      questionType: ''
    }
  }
  componentWillMount () {
    this.queryQuestionList()
    this.queryAllPosition()
  }

  changePage (response) {
    let currentPage = response.current
    this.setState({ currentPage }, () => {
      this.queryQuestionList()
    })
  }

  componentDidMount () {
  }

  queryQuestionList () {
    let { currentPage, searchForm } = this.state
    Taro.fetch({
      url: '/question/list',
      method: 'GET',
      data: { currentPage, ...searchForm }
    }).then(res => {
      this.setState({ 
        questionArr: res.rows,
        totalRecords: res.page.totalRecords
      })
    })
  }

  queryAllPosition () {
    Taro.fetch({ url: '/position/queryAll', method: 'GET'}).then(res => {
      let positonNameArr = []
      res.rows.map(item => {
        positonNameArr.push(item.positionName)
      })
      this.setState({ positonNameArr })
    })
  }
  
  onDateChange (name, e) {
    let { searchForm } = this.state
    let { value } = e.detail
    searchForm[name] = value + 1
    this.setState({ searchForm }, () => {
      this.queryQuestionList()
    })
  }

  openAnswer (index) {
    let { questionArr } = this.state
    questionArr[index].open = !questionArr[index].open
    this.setState({ questionArr })
  }

  addQuestion () {
    Taro.navigateTo({ url: '/views/addQuestion' })
  }

  render () {
    const { questionArr, questionTypeArr, currentPage, totalRecords, searchForm, positonNameArr } = this.state
    return (
      <View className='question-list'>
        <BaseMenu title='题目列表' />
        <View className='search-form'>
          <Picker className='picker' mode='selector' range={questionTypeArr} onChange={this.onDateChange.bind(this, 'questionType')}>
            <View className='item'>{ questionTypeArr[searchForm.questionType - 1] || '题目类型' }</View>
          </Picker>
          <Picker className='picker' mode='selector' range={positonNameArr} onChange={this.onDateChange.bind(this, 'positionId')}>
            <View className='item'>{positonNameArr[searchForm.positionId - 1] || '职位'}</View>
          </Picker>
          <View className='add-btn' onClick={this.addQuestion.bind(this)}>新增问题</View>
        </View>
        {
          questionArr.map((item, index) => (
            <AtAccordion
              open={!!item.open}
              onClick={this.openAnswer.bind(this, index)}
              title={item.questionName}
            >
              <AtList hasBorder={false}>
                { item.questionType == 3 && <AtListItem title='问答题无标准答案' /> }
                { item.questionType !==3 && item.options.map((answer, subI) => (
                  <AtListItem
                    title={answer.optionName}
                    note={answer.isRight === 1 ? '正确答案' : '错误答案'}
                  />
                ))}
              </AtList>
            </AtAccordion>
          ))
        }
        <View style='height: 60px'>
          <View className='flex-bottom'>      
            <AtPagination 
              total={totalRecords} 
              pageSize={10}
              onPageChange={this.changePage.bind(this)}
              current={currentPage}
            />
          </View>
        </View>
      </View>
    )
  }
}
