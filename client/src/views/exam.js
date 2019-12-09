import Taro, { Component } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { 
  AtList, 
  AtListItem, 
  AtButton,  
  AtModal, 
  AtModalHeader,
  AtModalContent, 
  AtModalAction,
  AtInput, 
  AtForm
} from "taro-ui"
import BaseMenu from '../components/BaseMent'
import '../assets/exam.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '试卷'
  }
  state = {
    examList: [],
    examFrom: {
      examName: '', 
      describe: '',
      questionIds: ''
    }
  }
  componentWillMount () {
   }

  componentDidMount () {
    this.queryExamList()
    Taro.fetch({
      url: '/exam/findById?examId=1',
      method: 'GET'
    }).then(res => {
      console.log(res)
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }


  queryExamList () {
    Taro.fetch({
      url: '/exam/list',
      method: 'GET'
    }).then(res => {
      this.setState({ examList: res.rows })
    })
  }

  render () {
    const { examList, examFrom } = this.state
    return (
      <View className='question-list'>
        <BaseMenu title='试卷' />
        <AtButton>新增试卷</AtButton>
        <AtList>
          { examList.map((item, index) => (
            <AtListItem 
              key={index}
              title={item.examName} 
              note={item.createTime}
              extraText={item.describe}
            />
          ))}
        </AtList>

        <AtModal isOpened>
          <AtModalHeader>标题</AtModalHeader>
          <AtModalContent>
            <AtForm>
              <AtInput
                title='试卷名'
                type='text'
                placeholder='输入试卷名'
                value={examFrom.examName}
                // onChange={this.handleChange.bind(this)}
              />
              <AtInput
                title='描述'
                type='text'
                placeholder='输入描述内容'
                value={examFrom.describe}
                // onChange={this.handleChange.bind(this)}
              />
            </AtForm>
          </AtModalContent>
          <AtModalAction> 
            <Button>取消</Button> <Button>确定</Button> 
          </AtModalAction>
        </AtModal>
      </View>
    )
  }
}
