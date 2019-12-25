import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtInput, AtButton, AtForm, AtListItem, AtPagination } from 'taro-ui'
import BaseMenu from '../components/BaseMent'
import DELETE from '../assets/img/close.png'
import '../assets/exam_cfg.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '新增试卷'
  }
  state = {
    query: this.$router.params,
    questionTypeArr: ['', '单选', '多选', '问答'],
    questionArr: [],
    selectQuestionsIds: [],
    currentPage: 1,
    totalRecords: 0,
    everyPage: 10,
    examForm: {
      examName: '1', 
      describe: '2',
      questionIds: ''
    }
  }

  componentDidMount () {
    this.queryQuestionList()
    if (this.$router.params.examId) {
      this.getUpdateInfo()
    }
  }

  changePage (response) {
    let currentPage = response.current
    this.setState({ currentPage }, () => {
      this.queryQuestionList()
    })
  }

  queryQuestionList () {
    let { currentPage, everyPage, query } = this.state
    Taro.fetch({
      url: '/question/list',
      method: 'GET',
      data: { currentPage, everyPage },
    }).then(res => {
      let questionIds = decodeURIComponent(query.questionIds).split(',').map(Number)
      let arr = res.rows.map(item => {
        if (questionIds.includes(item.id)) {
          item.isCheck = true
        }
        return item
      })
      this.setState({ 
        questionArr: query.examId ? arr : res.rows,
        totalRecords: res.page.totalRecords
      })
    })
  }

  savaExamCfg () {
    let examForm = {...this.state.examForm}
    examForm.questionIds = this.state.selectQuestionsIds.join()
    if (!examForm.examName || !examForm.questionIds) {
      Taro.showToast({ title: '试劵名或试题集不能为空', icon: 'none' })
      return
    }
    const url = examForm.examId ? '/exam/update' : '/exam/add'
    console.log(examForm)
    Taro.fetch({
     url,
     data: examForm
    }).then(res => {
      Taro.navigateTo({ url: '/views/examList' })
      Taro.showToast({ 
        title: res.message || 
        `${examForm.examId ? '修改' : '新增'}试卷成功`,
        icon: 'success' 
      })
    })
  }

  // 回显选中的答案
  getUpdateInfo () {
    const { query } = this.state
    let questionIds = decodeURIComponent(query.questionIds).split(',').map(Number)
    const examName = decodeURIComponent(query.examName)
    const describe = decodeURIComponent(query.describe)
    const examId = query.examId
    let examForm = { examName, describe, examId }

    this.setState({ 
      examForm,
      selectQuestionsIds: [...questionIds, ...this.state.selectQuestionsIds]
    })
  }

  checkItem (index) {
    let { questionArr, selectQuestionsIds } = this.state
    // questionArr[index].isCheck = !questionArr[index].isCheck
    questionArr[index].isCheck = true
    let checkItemArr = questionArr.filter(item => !!item.isCheck)
    checkItemArr.map((item) => { 
      if (!selectQuestionsIds.includes(item.id)) {
        selectQuestionsIds.push(item.id)
      }
    })
    this.setState({ questionArr, selectQuestionsIds })
  }

  // 问题id转为问题名称显示
  getNameForId () {
    const { questionArr, selectQuestionsIds } = this.state
    let arr = []
    questionArr.map(item => {
      if (selectQuestionsIds.includes(item.id)) {
        arr.push(item.questionName)
      }
    })
    return arr
  }

  // 删除已选的问题
  deleteQuestionId (index) {
    let { selectQuestionsIds, questionArr } = this.state
    let checkItemArr = questionArr.filter(item => !!item.isCheck)
    selectQuestionsIds.splice(index, 1)
    checkItemArr[index].isCheck = false
    this.setState({ questionArr, selectQuestionsIds })
  }
  
  handleChange (name, value) {
    let { examForm } = this.state
    examForm[name] = value
    this.setState({ examForm })
  }

  render () {
    const { examForm, questionArr, questionTypeArr, currentPage, totalRecords } = this.state
    return (
      <View className='exam-cfg-page' >
        <BaseMenu title={examForm.examId ? '修改试卷' : '新增试卷'} />
        <AtForm>
          <AtInput
            title='试卷名'
            type='text'
            placeholder='试卷名'
            value={examForm.examName}
            onChange={this.handleChange.bind(this, 'examName')}
          />
          <AtInput
            title='描述'
            type='text'
            placeholder='描述'
            value={examForm.describe}
            onChange={this.handleChange.bind(this, 'describe')}
          />
          <View className='questions-pool'>
            { this.getNameForId().map((item, index) => (
              <View 
                key={index}
                className='item'
                onClick={this.deleteQuestionId.bind(this, index)}
              >
                {item}
                { item && <Image className='delete-icon' src={DELETE} />}
              </View>
            ))}
          </View>
          {
            questionArr.map((item, index) => (
              <View className='question-item' key={index}>
                <AtListItem 
                  onClick={this.checkItem.bind(this, index)} 
                  className={item.isCheck && 'check-item'} 
                  title={item.questionName} 
                  extraText={questionTypeArr[item.questionType]} 
                />
              </View>
            ))
          }
            <AtPagination 
              total={totalRecords} 
              pageSize={10}
              onPageChange={this.changePage.bind(this)}
              current={currentPage}
            />
          <View className='bottom-btn-wrap'>   
            <AtButton 
              type='primary' 
              className='bottom-btn' 
              size='normal' 
              onClick={this.savaExamCfg.bind(this)}
            >
              { examForm.examId ? '修改' : '新增'}试卷
            </AtButton>
          </View>  
        </AtForm>
      </View>
    )
  }
}
