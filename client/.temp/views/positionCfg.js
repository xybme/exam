import Nerv from "nervjs";
import Taro, { showToast as _showToast } from "@tarojs/taro-h5";
import { View, Button } from '@tarojs/components';
import { AtList, AtInput, AtListItem, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtButton } from 'taro-ui';
import BaseMenu from '../components/BaseMent';
import '../assets/position_cfg.scss';

export default class Index extends Taro.Component {
  config = {
    navigationBarTitleText: '职位列表'
  };
  state = {
    positionId: '',
    positionName: '',
    isShowModal: false,
    isUpdate: false,
    positionArr: []
  };
  componentWillMount() {}

  componentDidMount() {
    this.queryAllPosition();
  }

  queryAllPosition() {
    Taro.fetch({
      url: '/position/queryAll',
      method: 'GET'
    }).then(res => {
      this.setState({ positionArr: res.rows });
    });
  }

  showModalHandle(type) {
    this.setState({
      positionName: '',
      isUpdate: false,
      isShowModal: type === 'open' ? true : false
    });
  }

  handleChange(positionName) {
    this.setState({ positionName });
  }

  savaPosition() {
    const { positionName, positionId, isUpdate } = this.state;
    const url = isUpdate ? '/position/update' : '/position/add';
    const params = isUpdate ? { positionName, positionId } : { positionName };
    Taro.fetch({
      url,
      data: params
    }).then(res => {
      _showToast({ title: res.message || '保存成功', icon: 'success' });
      this.setState({ isShowModal: false });
      this.queryAllPosition();
    });
  }

  changePositionName(item) {
    const { positionId, positionName } = item;
    this.setState({
      isShowModal: true,
      isUpdate: true,
      positionName,
      positionId
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { positionArr, isShowModal, positionName, isUpdate } = this.state;
    return <View className="index">
        <BaseMenu title="职位配置" />
        <AtList>
          {positionArr.map((item, index) => <AtListItem key={index} extraText={`id: ${item.positionId}`} title={item.positionName} onClick={this.changePositionName.bind(this, item)} />)}
        </AtList>
        {isShowModal && <AtModal isOpened>
          <AtModalHeader>{isUpdate ? '修改职位名称' : '新增职位'}</AtModalHeader>
            <AtModalContent>
              <AtInput name="value1" title="职位名称" type="text" placeholder="输入职位名称" value={positionName} onChange={this.handleChange.bind(this)} />
            </AtModalContent>
            <AtModalAction> 
              <Button onClick={this.showModalHandle.bind(this, 'close')}>取消</Button> 
              <Button onClick={this.savaPosition.bind(this)}>确定</Button> 
            </AtModalAction>
          </AtModal>}
        <View className="bottom-btn-wrap">
          <AtButton className="bottom-btn" type="primary" onClick={this.showModalHandle.bind(this, 'open')}>新增职位</AtButton>
        </View>
      </View>;
  }
}