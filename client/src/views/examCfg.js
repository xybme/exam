import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtButton, AtForm, AtTextarea } from 'taro-ui'
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
  }

  componentDidMount () {
  }
  
  handleChange (name) {
    let { examFrom } = this.state
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
          <AtTextarea
            value={examFrom.describe}
            onChange={this.handleChange.bind(this, 'describe')}
            maxLength={100}
            placeholder='描述内容...'
          />

          <AtButton type='primary' size='normal' onClick={this.savaExamCfg.bind(this)}>保存试卷配置</AtButton>
        </AtForm>
      </View>
    )
  }
}
