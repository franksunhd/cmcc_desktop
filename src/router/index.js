import Vue from 'vue';
import Router from 'vue-router';
// 处理路由重复点击报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};
// 登录页
import Login from "@/page/Login";
//index
import Index from "@/page/index";
// 参数设置
import paramSettings from '@/page/pages/paramSettings';
// 数据导入设置
import dataSettings from '@/page/pages/dataSettings';
// 退频区域
import areaSettings from '@/page/pages/areaSettings';
// 容量预测
import CapacityToPredict from "@/page/pages/CapacityToPredict";
// 总退频方案
import frequencyShiftScheme from "@/page/pages/frequencyShiftScheme";
//小区与扇区关系
import villageandSector from '@/page/pages/villageandSector';
// 设置
import SetUpThe from "@/page/pages/SetUpThe";

Vue.use(Router);

export default new Router({
    routes: [
        {path: '/', redirect: '/login'},
        // 登录页
        {path: '/login', name: 'Login', component: Login},
        // 首页模板
        {
            path: '/index', name: 'Index', component: Index, redirect: '/index/dataSettings', children: [
                // 参数设置
                {path: '/index/paramSettings', name: 'paramSettings', component: paramSettings},
                // 数据导入设置
                {path: '/index/dataSettings', name: 'dataSettings', component: dataSettings},
                // 退频区域
                {path: '/index/areaSettings', name: 'areaSettings', component: areaSettings},
                // 容量预测
                {path: '/index/CapacityToPredict', name: 'CapacityToPredict', component: CapacityToPredict},
                // 总退频方案
                {path: '/index/frequencyShiftScheme', name: 'frequencyShiftScheme', component: frequencyShiftScheme},
                 // 小区与扇区关系
                 {path: '/index/villageandSector', name: 'villageandSector', component: villageandSector},
                // 设置
                {path: '/index/SetUpThe', name: 'SetUpThe', component: SetUpThe},
            ]
        },
    ]
})
