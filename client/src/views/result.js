import Taro, { Component } from '@tarojs/taro'
import { View} from '@tarojs/components'
import { AtCard } from "taro-ui"
import { serializeObj } from '../utils/tools'
import BaseMenu from '../components/BaseMent'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '结果'
  }
  state = {
    resultList: []
  }

  toExamPage (item) {
    // console.log(item)
    let params = serializeObj(item)
    Taro.navigateTo({ url: `/views/showExamResult?${params}` })
  }

  componentDidMount () {
    this.queryResultList()
  }

   queryResultList () {
      Taro.fetch({
        url: '/result/list',
        method: 'GET'
      }).then(res => {
        this.setState({ resultList: res.rows })
      })
   } 

  render () {
    const { resultList } = this.state
    return (
      <View className='result-page'>
        <BaseMenu title='结果' />
        {
          resultList.map((item, index) => (
            <AtCard
              key={index}
              title={item.applicant}
              note={`examId: ${item.examId}`}
              extra={item.telephone}
              onClick={this.toExamPage.bind(this, item)}
            >
              <View>期望薪资: {item.salaryMin || '未填写'} ~ {item.salaryMax}</View>
              <View>开始时间: {item.startTime}</View>
              <View>结束时间: {item.endTime}</View>
            </AtCard>
          ))
        }
      </View>
    )
  }
}
