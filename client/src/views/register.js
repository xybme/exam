import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtForm, AtInput, AtButton, AtRange } from 'taro-ui'
import '../assets/register.scss'

export default class Index extends Component {
  config = {
    navigationBarTitleText: '填写资料'
  }
  state = {
    form: {
      examId: 1,
      applicant: '',
      telephone: '',
      salaryMin: '',
      salaryMax: ''
    }
  }
  
  componentWillMount () {
  }

  componentDidMount () {
  }

  handleChange (name, value) {
    console.log(name, value);
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
    const formObj = { applicant: '姓名', telephone: '电话号', salaryMin: '期望薪资' }
    const { form } = this.state
    for (let key in formObj) {
      if (!form[key]) {
        Taro.showToast({ title: `${formObj[key]}不能为空`, icon: 'none'})
      }
    }
    Taro.fetch({
     url: '/result/add',
     data: this.state.form
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
            type='text'
            placeholder='输入你的手机号'
            value={form.telephone}
            onChange={this.handleChange.bind(this, 'telephone')}
          />
          <View className='range-wrap'>
            <View className='text'>期望薪资: {form.salaryMin || 0} ~ {form.salaryMax || 0}</View>
            <AtRange
              sliderStyle='background: #6290E9'
              value={[0, 0]}
              min={1000}
              max={30000}
              onChange={this.handleChange.bind(this, 'range')}
            />
          </View>
          <AtButton type='primary' className='center-btn' onClick={this.submitForm.bind(this)}>开始答题</AtButton>
        </AtForm>
      </View>
    )
  }
}
