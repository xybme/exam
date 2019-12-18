import Taro, { Component } from '@tarojs/taro'
import { View} from '@tarojs/components'
import { AtCard, AtPagination} from "taro-ui"
import BaseMenu from '../components/BaseMent'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '答题记录'
  }
  state = {
    currentPage: 1,
    totalRecords: 0,
    resultList: []
  }

  toExamPage (item) {
    const { examId, resultId } = item
    Taro.navigateTo({ url: `/views/showExamResult?examId=${examId}&resultId=${resultId}` })
  }

  changePage (response) {
    let currentPage = response.current
    this.setState({ currentPage }, () => {
      this.queryResultList()
    })
  }

  componentDidMount () {
    this.queryResultList()
  }

   queryResultList () {
     let { currentPage, totalRecords } = this.state
      Taro.fetch({
        url: '/result/list',
        method: 'GET',
        data: { currentPage, totalRecords }
      }).then(res => {
        this.setState({ 
          resultList: res.rows,
          totalRecords: res.page.totalRecords
        })
      })
   } 

  render () {
    const { resultList, totalRecords, currentPage } = this.state
    return (
      <View className='result-page'>
        <BaseMenu title='答题记录' />
        {
          resultList.map((item, index) => (
            <AtCard
              key={index}
              title={item.applicant}
              note={`examId: ${item.examId}`}
              extra={item.telephone}
              onClick={this.toExamPage.bind(this, item)}
            >
              <View>期望薪资: {item.salaryMin || 0} ~ {item.salaryMax || 0}</View>
              <View>开始时间: {item.startTime}</View>
              <View>结束时间: {item.endTime}</View>
            </AtCard>
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
