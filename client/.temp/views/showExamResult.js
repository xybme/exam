import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import { View, Image } from '@tarojs/components';
import { AtCard, AtListItem, AtTextarea } from "taro-ui";
import CHECK_ICON from '../assets/img/check_icon.png';
import BaseMenu from '../components/BaseMent';
import '../assets/exam.scss';

export default class Index extends Taro.Component {
  config = {
    navigationBarTitleText: '答题结果'
  };
  state = {
    answerLabel: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    examList: [],
    examInfo: {}
  };
  componentDidMount() {
    this.queryExam();
  }

  // 获取正确答案
  getRightAnswer(row) {
    let { options, questionType } = row;
    const { answerLabel } = this.state;
    let rightIndexArr = [];
    options.map((item, index) => {
      if (!!item.isRight) {
        rightIndexArr.push(index);
      }
    });
    let result = '';
    if (questionType == 1) {
      result = answerLabel[rightIndexArr.join()];
    } else if (questionType == 2) {
      rightIndexArr.map(item => {
        result += answerLabel[item];
      });
    }
    return result;
  }

  queryExam() {
    let { resultJson, examId } = this.$router.params;
    resultJson = decodeURIComponent(resultJson);
    let resultArr = JSON.parse(resultJson);
    Taro.fetch({
      url: '/exam/findById',
      method: 'GET',
      data: { examId }
    }).then(res => {
      res.rows.map(item => {
        resultArr.map(ele => {
          if (item.id == ele.id) {
            item.options.map(subItem => {
              if (item.questionType === 1) {
                if (ele.optionId === subItem.optionId) {
                  subItem.isCheck = true;
                }
              }
              if (item.questionType === 2) {
                if (ele.optionId.split(',').map(Number).includes(subItem.optionId)) {
                  subItem.isCheck = true;
                }
              }
            });
            if (item.questionType === 3) {
              item.text = ele.text;
            }
          }
        });
      });
      this.setState({
        examInfo: res.attr,
        examList: res.rows
      });
    });
  }

  render() {
    const { examList, examInfo, answerLabel } = this.state;
    return <View className="exam-page exam-result-page">
        <BaseMenu title="答题结果" />
        <View className="exam-info">{examInfo}</View>
        <View>
          {examList.map((item, index) => <View className="question-item" key={index}>
              <AtCard isFull title={`${index + 1}、${item.questionName}`}
          // extra={}
          >
                {item.questionType !== 3 && item.options.map((answer, subI) => <View key={subI}>
                    <View className={answer.isCheck ? 'options checkedbg' : 'options'}>
                      <View className="index">{answerLabel[subI]}.</View>
                      <AtListItem className={answer.isCheck && 'checked'} title={answer.optionName} />
                      {answer.isCheck && <Image src={CHECK_ICON} className="check"></Image>}
                    </View>
                  </View>)}
                {item.questionType !== 3 && <View>
                    <View>正确答案: {this.getRightAnswer(item)}</View>
                  </View>}
                {item.questionType == 3 && <AtTextarea value={item.text} maxLength={999} placeholder="他没回答" />}
              </AtCard>
            </View>)}
        </View>
      </View>;
  }

  componentDidShow() {
    super.componentDidShow && super.componentDidShow();
  }

  componentDidHide() {
    super.componentDidHide && super.componentDidHide();
  }

}