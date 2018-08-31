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
//让ajax携带cookie
// 跨域请求时 是否会携带 凭证(cookie)
axios.defaults.withCredentials = true;
//Vue原型对象存储axios
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
import { store } from './vuex/store';
import router from './router'

// 增加 导航守卫(路由守卫),判断是否是登录状态,不是打回到登录
router.beforeEach((to, from, next) => {
	//保存from
	store.commit('getPathFrom',from.path);
    if (to.meta.checkLogin ==true) {
        axios.get("site/account/islogin")
            .then(response => {
                if (response.data.code != 'nologin') {
                    next();
                } else {
                    next('/login');
                }
            })
    } else {
        next();
    }
})
new Vue({
    render: h => h(App),
    router,
    store,
    beforeCreate(){
    	axios.get('/site/account/islogin').then(response=>{
    		if (response.data.code == 'logined') {
    			store.state.isLogin = true;
    		}
    	})
    }
}).$mount('#app')