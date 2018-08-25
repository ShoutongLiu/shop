<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="(item,index) in cateList" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="(itemVal,i) in item.subcates" :key="itemVal.id">
                                                手机通讯&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a href="/goods/43.html" v-for="(itemVal,i) in item.subcates" :key="itemVal.id">{{itemVal.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <el-carousel trigger="click">
                            <el-carousel-item v-for="item in sliderList" :key="sliderList.ids">
                                <a href="#">
                                <img :src="item.img_url" alt="" class="bannerImg">
                                </a>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item,index) in topList" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | filterDate}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="items in content" :key="items.id">
            <div class="main-tit">
                <h2>{{items.catetitle}}</h2>
                <p>
                    <a href="/goods/43.html" v-for="itemSon in items.level2catelist" :key="itemSon.subcateid">{{itemSon.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="itemGoods in items.datas" :key="itemGoods.artID">
                            <router-link :to="'./detail/'+itemGoods.artID">
                                <a href="#/site/goodsinfo/87" class="">
                                    <div class="img-box">
                                        <img :src="itemGoods.img_url">
                                    </div>
                                    <div class="info">
                                        <h3>{{itemGoods.artTitle}}</h3>
                                        <p class="price">
                                            <b>{{itemGoods.sell_price}}</b>元</p>
                                        <p>
                                            <strong>库存 {{itemGoods.stock_quantity}}</strong>
                                            <span>市场价：
                                            <s>{{itemGoods.market_price}}</s>
                                        </span>
                                        </p>
                                    </div>
                                </a>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { Loading } from "element-ui";
export default {
    name: "index",
    data: function() {
        return {
            cateList: [],
            sliderList: [],
            topList: [],
            content: ""
        };
    },

    created() {
        //加载动画
        const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
        });
        axios
            .get("http://47.106.148.205:8899/site/goods/gettopdata/goods")
            .then(response => {
                this.cateList = response.data.message.catelist;
                this.sliderList = response.data.message.sliderlist;
                this.topList = response.data.message.toplist;

            });
        axios
            .get("http://47.106.148.205:8899/site/goods/getgoodsgroup")
            .then(response => {
                this.content = response.data.message;
                //关闭加载动画
                let loadingInstance = Loading.service({ text: false });
                this.$nextTick(() => {
                    // 以服务的方式调用的 Loading 需要异步关闭 
                    loadingInstance.close();
                });
            });
    }
};
</script>
<style>
/* 轮播图样式 */

.bannerImg {
    width: 705px;
    height: 341px;
}

.el-carousel .el-carousel__container {
    height: 341px;
}

body {
    margin: 0;
}
</style>