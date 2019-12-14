import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtButton, AtForm, AtListItem, AtPagination } from 'taro-ui'
import BaseMenu from '../components/BaseMent'
import '../assets/exam_cfg.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '新增试卷'
  }
  state = {
    questionTypeArr: ['', '单选', '多选', '问答'],
    questionArr: [],
    checkItemArr: [], // 已选中的问题
    currentPage: 1,
    totalRecords: 0,
    everyPage: 10,
    examForm: {
      examName: '', 
      describe: '',
      questionIds: ''
    }
  }

  changePage (response) {
    let currentPage = response.current
    this.setState({ currentPage }, () => {
      this.queryQuestionList()
    })
  }

  queryQuestionList () {
    let { currentPage, everyPage } = this.state
    Taro.fetch({
      url: '/question/list',
      method: 'GET',
      data: { currentPage, everyPage },
    }).then(res => {
      let arr = res.rows.map(item => {
        item.isCheck = false
        return item
      })
      this.setState({ 
        questionArr: arr,
        totalRecords: res.page.totalRecords
      })
    })
  }

  savaExamCfg () {
    let { examForm, checkItemArr } = this.state
    let idsArr = []
    checkItemArr.map(item => {idsArr.push(item.id)})
    examForm.questionIds = idsArr.join()
    this.setState({ examForm })
    if (!examForm.examName || !examForm.questionIds) {
      Taro.showToast({ title: '试劵名或试题集不能为空', icon: 'none' })
      return
    }
    const url = examForm.examId ? '/exam/update' : '/exam/add'
    Taro.fetch({
     url,
     data: this.state.examForm
    }).then(res => {
      Taro.navigateTo({ url: '/views/examList' })
      Taro.showToast({ title: res.message || '新增试卷成功', icon: 'success' })
    })
  }

  componentDidMount () {
    this.queryQuestionList()
    if (this.$router.params.examId) {
      this.getUpdateInfo()
    }
  }

  getUpdateInfo () {
    const query = this.$router.params
    // let { questionArr } = this.state
    let questionIds = decodeURIComponent(query.questionIds).split(',')
    const examName = decodeURIComponent(query.examName)
    const describe = decodeURIComponent(query.describe)
    const examId = query.examId

    let examForm = { questionIds, examName, describe, examId }

    this.setState({ examForm })
  }

  checkItem (index) {
    let { questionArr, examForm } = this.state
    questionArr[index].isCheck = !questionArr[index].isCheck
    let checkItemArr = questionArr.filter(item => item.isCheck)
    examForm.questionIds = []
    checkItemArr.map(item => {
      examForm.questionIds.push(item.questionName)
    })
    console.log(examForm.questionIds)
    this.setState({ questionArr, checkItemArr, examForm })
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
          <View>{[...examForm.questionIds].join('，')}</View>
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
