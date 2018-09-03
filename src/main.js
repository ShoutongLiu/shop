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

// 导入 懒加载 vue插件
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload,{
    preLoad:1.3,
    loading:require('../static/images/loading.gif'),
      attempt: 1
})

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


new Vue({
    render: h => h(App),
    router,
    store,
    beforeCreate(){
    	this.$axios.get('/site/account/islogin').then(response=>{
    		if (response.data.code == 'logined') {
    			store.state.isLogin = true;
    		}
    	})
    }
}).$mount('#app')