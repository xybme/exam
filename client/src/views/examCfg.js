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
    questionTypeArr: ['', '单选', '多选', '问答'],
    questionArr: [],
    checkItemArr: [], // 已选中的问题
    currentPage: 1,
    totalRecords: 0,
    everyPage: 10,
    examForm: {
      examName: '', 
      describe: '',
      questionIds: []
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
    let { currentPage, everyPage } = this.state
    Taro.fetch({
      url: '/question/list',
      method: 'GET',
      data: { currentPage, everyPage },
    }).then(res => {
      this.setState({ 
        questionArr: res.rows,
        totalRecords: res.page.totalRecords
      })
    })
  }

  savaExamCfg () {
    let examForm = {...this.state.examForm}
    examForm.questionIds = examForm.questionIds.join()
    if (!examForm.examName || !examForm.questionIds) {
      Taro.showToast({ title: '试劵名或试题集不能为空', icon: 'none' })
      return
    }
    const url = examForm.examId ? '/exam/update' : '/exam/add'
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

  getUpdateInfo () {
    const query = this.$router.params
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
    let checkItemArr = questionArr.filter(item => !!item.isCheck)
    examForm.questionIds = []
    checkItemArr.map(item => { examForm.questionIds.push(item.id) })
    this.setState({ questionArr, checkItemArr, examForm })
  }

  // 问题id转为问题名称显示
  getNameForId () {
    const { questionArr, examForm } = this.state
    let arr = []
    questionArr.map(item => {
      if (examForm.questionIds.includes(item.id)) {
        arr.push(item.questionName)
      }
    })
    return arr
  }

  // 删除已选的问题
  deleteQuestionId (index) {
    let { examForm, checkItemArr } = this.state
    examForm.questionIds.splice(index, 1)
    checkItemArr[index].isCheck = false
    this.setState({ examForm, checkItemArr })
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
