import Taro, { Component } from "@tarojs/taro-h5";

import http from "./utils/http";
import './app.scss';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
import Nerv from 'nervjs';
import { Router, createHistory, mountApis } from '@tarojs/router';
Taro.initPxTransform({
  "designWidth": 750,
  "deviceRatio": {
    "640": 1.17,
    "750": 1,
    "828": 0.905
  }
});

const _taroHistory = createHistory({
  mode: "hash",
  basename: "/",
  customRoutes: {},
  firstPagePath: "/views/login"
});

mountApis({
  "basename": "/",
  "customRoutes": {}
}, _taroHistory);
Taro.fetch = http;

class App extends Component {

  config = {
    pages: ["/views/login", "/views/positionCfg", "/views/questionList", "/views/addQuestion", "/views/exam", "/views/examList", "/views/examCfg", "/views/result", "/views/register", "/views/showExamResult"],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  };

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Router mode={"hash"} history={_taroHistory} routes={[{
      path: '/views/login',
      componentLoader: () => import( /* webpackChunkName: "views_login" */'./views/login'),
      isIndex: true
    }, {
      path: '/views/positionCfg',
      componentLoader: () => import( /* webpackChunkName: "views_positionCfg" */'./views/positionCfg'),
      isIndex: false
    }, {
      path: '/views/questionList',
      componentLoader: () => import( /* webpackChunkName: "views_questionList" */
      './views/questionList'),
      isIndex: false
    }, {
      path: '/views/addQuestion',
      componentLoader: () => import( /* webpackChunkName: "views_addQuestion" */'./views/addQuestion'),
      isIndex: false
    }, {
      path: '/views/exam',
      componentLoader: () => import( /* webpackChunkName: "views_exam" */'./views/exam'),
      isIndex: false
    }, {
      path: '/views/examList',
      componentLoader: () => import( /* webpackChunkName: "views_examList" */'./views/examList'),
      isIndex: false
    }, {
      path: '/views/examCfg',
      componentLoader: () => import( /* webpackChunkName: "views_examCfg" */'./views/examCfg'),
      isIndex: false
    }, {
      path: '/views/result',
      componentLoader: () => import( /* webpackChunkName: "views_result" */'./views/result'),
      isIndex: false
    }, {
      path: '/views/register',
      componentLoader: () => import( /* webpackChunkName: "views_register" */'./views/register'),
      isIndex: false
    }, {
      path: '/views/showExamResult',
      componentLoader: () => import( /* webpackChunkName: "views_showExamResult" */'./views/showExamResult'),
      isIndex: false
    }]} customRoutes={{}} />;
  }

  componentWillUnmount() {
    this.componentDidHide();
  }

  constructor(props, context) {
    super(props, context);
    Taro._$app = this;
  }

}

Nerv.render(<App />, document.getElementById('app'));