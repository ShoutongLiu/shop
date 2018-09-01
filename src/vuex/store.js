import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
//创建一个 stores
const stores = new Vuex.Store({
  state: {
    cartDate: JSON.parse(window.localStorage.getItem('goodkey')) || {},
    isLogin: false,
    pathFrom: ''
  },
  mutations: {
    // 传入的数据是一个对象 格式{goodId:商品id,goodNum:数量}
    addGoods(state, goodsInfo) {
      if (state.cartDate[goodsInfo.goodId] == undefined) {
        // state.cartDate[goodInfo.goodId] = goodInfo.goodNum;
        // 为了要让Vue检测到数据的改变同步修改页面显示 需要调用Vue.set方法
        Vue.set(state.cartDate, goodsInfo.goodId, goodsInfo.goodNum);
      } else {
        //传过来的id已存在则累加
        state.cartDate[goodsInfo.goodId] += goodsInfo.goodNum;
      }
    },
    //更新数量时同步购物车的数量
    updateGoodsNum(state, goodsInfo) {
      state.cartDate[goodsInfo.goodId] = goodsInfo.goodNum;
    },
    deleteGood(state, goodId) {
      //要调用Vue.delete方法
      Vue.delete(state.cartDate, goodId);
    },
    changeLoginStatus(state, isLogin) {
      state.isLogin = isLogin;
    },
    getPathFrom(state, pathFrom) {
      state.pathFrom = pathFrom;
    }
  },
  getters: {
    goodsCount: state => {
      //临时num
      let num = 0;
      //遍历对象
      for (const key in state.cartDate) {
        num += state.cartDate[key];
      }
      return num;
    }
  }
})

window.onbeforeunload = function() {
  window.localStorage.setItem('goodkey', JSON.stringify(store.state.cartDate));
}
//暴露出去
export const store = stores;
