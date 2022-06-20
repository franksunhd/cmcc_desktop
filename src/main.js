// 引入Vue
import Vue from 'vue';
// 引入入口文件
import App from './App';
// 引入路由
import router from './router';
// 引入elementUI
import ElementUI from 'element-ui';
// 移入Api
import api from './config/api';
// 引入elementUI样式
import 'element-ui/lib/theme-chalk/index.css';
// 引入格式化css
import './assets/css/base.css';
// 引入全局css
import './assets/css/common.css';
// 引入打印插件
import Print from './assets/js/print';
// 引入分页
import pages from "./components/pages";
// 阻止启动生产消息
Vue.config.productionTip = false;
// 注册api
Vue.prototype.$api = api;
// 使用elementUI
Vue.use(ElementUI);
// 使用打印组件
Vue.use(Print);
// 调用分页组件
Vue.component('pages', pages);
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
});
