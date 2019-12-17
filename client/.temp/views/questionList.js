import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import { View, Picker } from '@tarojs/components';
import { AtList, AtListItem, AtButton, AtPagination } from "taro-ui";
import BaseMenu from '../components/BaseMent';
import '../assets/question_list.scss';

export default class Index extends Taro.Component {
  config = {
    navigationBarTitleText: '问题列表'
  };
  state = {
    currentPage: 1,
    totalRecords: 0,
    questionTypeArr: ['单选', '多选', '问答'],
    positonNameArr: [],
    questionArr: [],
    searchForm: {
      positionId: '',
      questionType: ''
    }
  };
  componentWillMount() {
    this.queryQuestionList();
    this.queryAllPosition();
  }

  changePage(response) {
    let currentPage = response.current;
    this.setState({ currentPage }, () => {
      this.queryQuestionList();
    });
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  queryQuestionList() {
    let { currentPage, searchForm } = this.state;
    Taro.fetch({
      url: '/question/list',
      method: 'GET',
      data: { currentPage, ...searchForm }
    }).then(res => {
      this.setState({
        questionArr: res.rows,
        totalRecords: res.page.totalRecords
      });
    });
  }

  queryAllPosition() {
    Taro.fetch({ url: '/position/queryAll', method: 'GET' }).then(res => {
      let positonNameArr = [];
      res.rows.map(item => {
        positonNameArr.push(item.positionName);
      });
      this.setState({ positonNameArr });
    });
  }

  onDateChange(name, e) {
    let { searchForm } = this.state;
    let { value } = e.detail;
    searchForm[name] = value + 1;
    this.setState({ searchForm }, () => {
      this.queryQuestionList();
    });
  }

  addQuestion() {
    Taro.navigateTo({ url: '/views/addQuestion' });
  }

  render() {
    const { questionArr, questionTypeArr, currentPage, totalRecords, searchForm, positonNameArr } = this.state;
    return <View className="question-list">
        <BaseMenu title="题目列表" />
        <View className="search-form">
          <Picker mode="selector" range={questionTypeArr} onChange={this.onDateChange.bind(this, 'questionType')}>
            <View className="item">{questionTypeArr[searchForm.questionType - 1] || '题目类型'}</View>
          </Picker>
          <Picker mode="selector" range={positonNameArr} onChange={this.onDateChange.bind(this, 'positionId')}>
            <View className="item">{positonNameArr[searchForm.positionId - 1] || '职位'}</View>
          </Picker>
          <AtButton type="primary" onClick={this.addQuestion.bind(this)}>新增问题</AtButton>
        </View>
        <AtList>
          {questionArr.map((item, index) => <AtListItem key={index} title={item.questionName} note={questionTypeArr[item.questionType - 1]} extraText={positonNameArr[item.positionId - 1] || '职位'} />)}
        </AtList>
        <AtPagination total={totalRecords} pageSize={10} onPageChange={this.changePage.bind(this)} current={currentPage} />
      </View>;
  }
}