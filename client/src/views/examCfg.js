import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtButton, AtForm } from 'taro-ui'
import BaseMenu from '../components/BaseMent'
import '../assets/exam_cfg.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '新增试卷'
  }
  state = {
    examFrom: {
      examName: '', 
      describe: '',
      questionIds: ''
    }
  }  
  savaExamCfg () {
    Taro.fetch({
     url: '/exam/add',
     data: this.state.examFrom
    }).then(res => {
      Taro.showToast({ title: res.message || '新增事情成功', icon: 'success' })
    })
  }

  componentDidMount () {
  }
  
  handleChange (name, value) {
    let { examFrom } = this.state
    examFrom[name] = value
    this.setState({ examFrom })
  }

  render () {
    const { examFrom } = this.state
    return (
      <View>
        <BaseMenu title='新增试卷' />
        <AtForm>
          <AtInput
            title='试卷名'
            type='text'
            placeholder='试卷名'
            value={examFrom.examName}
            onChange={this.handleChange.bind(this, 'examName')}
          />
          <AtInput
            title='描述'
            type='text'
            placeholder='描述'
            value={examFrom.describe}
            onChange={this.handleChange.bind(this, 'describe')}
          />

          <AtButton type='primary' size='normal' onClick={this.savaExamCfg.bind(this)}>保存试卷配置</AtButton>
        </AtForm>
      </View>
    )
  }
}
