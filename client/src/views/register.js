import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtForm, AtInput, AtButton, AtRange } from 'taro-ui'
import { isPhoneNum } from '../utils/tools'

import '../assets/register.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '填写资料'
  }
  state = {
    form: {
      examId: Number(this.$router.params.examId),
      applicant: '',
      telephone: '',
      salaryMin: 0,
      salaryMax: 0
    }
  }
  
  handleChange (name, value) {
    let { form } = this.state
    if (name === 'range') {
      form.salaryMin = value[0]
      form.salaryMax = value[1]
    } else {
      form[name] = value
    }
    this.setState({ form })
  }

  submitForm () {
    const { form } = this.state
    if (!form.applicant) {
      Taro.showToast({ title: '姓名不能为空', icon: 'none'})
      return
    }
    if (!isPhoneNum(form.telephone)) {
      Taro.showToast({ title: '请输入正确的手机号', icon: 'none'})
      return
    }
    Taro.fetch({
     url: '/result/add',
     data: form
    }).then(res => {
      let { resultId, examId } = res.attr
      Taro.navigateTo({ url: `/views/exam?resultId=${resultId}&examId=${examId}` })
    })
  }

  render () {
    const { form } = this.state
    return (
      <View className='register-page'>
        <View className='title'>填写资料</View>
        <AtForm>
          <AtInput
            title='你的姓名'
            type='text'
            placeholder='输入姓名'
            value={form.applicant}
            onChange={this.handleChange.bind(this, 'applicant')}
          />
          <AtInput
            title='你的手机号'
            type='tel'
            maxLength='11'
            placeholder='输入你的手机号'
            value={form.telephone}
            onChange={this.handleChange.bind(this, 'telephone')}
          />
          <View className='range-wrap'>
            <View className='text'>期望薪资: {form.salaryMin || 0} ~ {form.salaryMax || 0}</View>
            <AtRange
              sliderStyle='background: #6290E9'
              value={[0, 0]}
              min={0}
              max={50000}
              onChange={this.handleChange.bind(this, 'range')}
            />
          </View>
          <AtButton type='primary' className='center-btn' onClick={this.submitForm.bind(this)}>开始答题</AtButton>
        </AtForm>
      </View>
    )
  }
}
