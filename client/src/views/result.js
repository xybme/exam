import Taro, { Component } from '@tarojs/taro'
import { View} from '@tarojs/components'
import { AtCard } from "taro-ui"

import BaseMenu from '../components/BaseMent'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '结果'
  }
  state = {
    resultList: []
  }
  
  componentWillMount () {
   }

  toExamPage (item) {
    console.log(item);
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
              note={`开始时间: ${item.startTime}`}
              extra={item.telephone}
              onClick={this.toExamPage.bind(this, item)}
            >
              <View>期望薪资: {item.salaryMin || '未填写'} ~ {item.salaryMax}</View>
            </AtCard>
          ))
        }
      </View>
    )
  }
}
