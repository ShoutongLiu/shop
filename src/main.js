import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//导入放大镜的包
import ProductZoomer from 'vue-product-zoomer';
//导入iview
import iView from 'iview';
import 'iview/dist/styles/iview.css';
//导入moment.js
import moment from 'moment';
//全局导入axios
import axios from 'axios';
//基础地址
axios.defaults.baseURL = 'http://47.106.148.205:8899';
Vue.prototype.$axios = axios;
//转换时间
Vue.filter('filterDate', function(val) {
    return moment(val).format('YYYY年MM月DD日');
})

//注册element
Vue.use(ElementUI);

Vue.use(iView);
//注册productZoomer
Vue.use(ProductZoomer);
Vue.config.productionTip = false

//导入vuex文件
import {store} from './vuex/store';
import router from './router'

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')