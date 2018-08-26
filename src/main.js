import Vue from 'vue'
import App from './App.vue'
//导入路由
import VueRouter from 'vue-router'

//导入单页面组件
import Index from './components/index.vue';
//导入详情页面
import Detail from './components/detail.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//导入iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';
//导入moment.js
import moment from 'moment';
Vue.filter('filterDate',function (val) {
    return moment(val).format('YYYY年MM月DD日');
})
//注册VueRouter
Vue.use(VueRouter);
//注册element
Vue.use(ElementUI);
//注册iview
Vue.use(VueRouter);
Vue.use(iView);

Vue.config.productionTip = false

//定义路由规则
let routes = [
mode:'history';
{
        //首页
        path: '/',
        // component: Index,
        redirect:'/index'
    },
    {
        //首页
        path: '/index',
        component: Index
    },
    {
        //详情页
        path:'/detail/:id',
        component:Detail
    }
]
//实例化路由对象
const router = new VueRouter({
    routes
})

new Vue({
    render: h => h(App),
    router
}).$mount('#app')