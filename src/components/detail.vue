<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <ProductZoomer v-if="images.normal_size.length!=0" :base-images="images" :base-zoomer-options="zoomerOptions">
                                </ProductZoomer>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsInfo.title}}</h1>
                                <p class="subtitle">{{goodsInfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsInfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsInfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsInfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="buyCount" :min="0" :max="goodsInfo.stock_quantity" label="描述文字" size="small"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsInfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="addGoods" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a href="javascript:;" :class="{selected:isSelected}" @click="isSelected=true">商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" :class="{selected:!isSelected}" @click="isSelected=false">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div class="tab-content entry" v-show="isSelected" v-html="goodsInfo.content">
                            </div>
                            <div class="tab-content" v-show="!isSelected">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" v-model.trim="commentInfo" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit" @click="submitInfo">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);" v-show="comments.length==0">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in comments" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | filterDate}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <Page :total="totalCount" show-sizer show-elevator placement="top" :page-size="5" :page-size-opts="[5, 6, 10, 13]" @on-change="changePage" @on-page-size-change="changePageSize" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="items in hotList" :key="items.id">
                                        <div class="img-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="'/detail/'+items.id">
                                                <img :src="items.img_url">
                                            </router-link>
                                            <!-- </a> -->
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/90" class="">{{items.title}}</a>
                                            <span>{{items.add_time | filterDate}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BackTop></BackTop>
        <img v-if="imgList.length!=0" class="moveImg" :src="imgList[0].original_path" alt="">
    </div>
</template>
<script>
import { Loading } from "element-ui";
import $ from 'jquery';
export default {
    name: 'detail',
    data: function() {
        return {
            productId: undefined,
            goodsInfo: {},
            hotList: [],
            imgList: [],
            buyCount: '',
            isSelected: true,
            // 放大镜设置
            zoomerOptions: {
                'zoomFactor': 5, // 放大倍数
                'pane': 'container-round', // container-round 小放大镜
                'hoverDelay': 300,
                'namespace': 'zoomer',
                'move_by_click': true, // true 点击切换
                'scroll_items': 7,
                'choosed_thumb_border_color': "yellowgreen" // 框的颜色
            },
            // 轮播图用的图片 默认的数据格式 不支持
            // 这里的数据 需要在接口调用完毕之后 才能够获取
            images: {
                normal_size: []
            },
            pageNum: 1, //页码
            pageSize: 5, //页容量
            comments: [], //评论内容
            totalCount: 0, //评论总条数
            commentInfo: '' //评论内容
        }
    },
    methods: {
        //获取商品信息
        getProductDatil() {
            //获取Id
            this.productId = this.$route.params.id;
            //获取数据
             this.$axios.get(`/site/goods/getgoodsinfo/${this.productId}`)
                .then(response => {
                    this.goodsInfo = response.data.message.goodsinfo;
                    this.hotList = response.data.message.hotgoodslist;
                    this.imgList = response.data.message.imglist;
                    // 处理 放大镜数据
                    let temArr = [];
                    // 循环处理数据
                    this.imgList.forEach((v, i) => {
                        temArr.push({
                            id: v.id,
                            url: v.original_path
                        })
                    })
                    // 临时数组 
                    this.images.normal_size = temArr;
                });
        },
        //获取评论信息
        getCommentsInfo() {
            this.$axios.get(`/site/comment/getbypage/goods/${this.productId}?pageIndex=${this.pageNum}&pageSize=${this.pageSize}`)
                .then(response => {
                    this.comments = response.data.message;
                    this.totalCount = response.data.totalcount;
                })
        },
        // 页码变化事件
        changePage(page) {
            this.pageNum = page;
            this.getCommentsInfo();
        },
        // 页容量改变事件
        changePageSize(size) {
            this.pageSize = size;
            if (this.pageNum == 1) {
                this.getCommentsInfo();
            }
        },
        //提交评论
        submitInfo() {
            if (this.commentInfo == "") {
                this.$Message.error('内容为空');
                return;
            }
            //提交数据
            this.$axios.post(`/site/validate/comment/post/goods/${this.productId}`, {
                "commenttxt": this.commentInfo
            }).then(response => {
                //状态status为0时判断为成功,提交评论
                if (response.data.status == 0) {
                    this.$Message.success(response.data.message);
                    this.getCommentsInfo();
                    this.commentInfo = '';
                } else {
                    this.$Message.success(response.data.message);
                }
            })
        },
        //移动图片动画
        addGoods(){
            //获取加入购物车的位置
            let addOffset = $('.add').offset();
            //获取购物车的位置
            let carTarget = $('.icon-cart').offset();
            $('.moveImg').show().css(addOffset).animate(carTarget,1000,function(){
                $(this).hide();
            })
        }
},
watch: {
        $route(val, oldVal) {
            // 数组长度为0 直接销毁 
            this.images.normal_size = [];
            // 回调函数中重新复制 再次 生成
            this.getProductDatil();
        }
    },
    created() {
        //加载动画
        const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
        });
        this.getProductDatil();
        //加载页面时获取第一页评论
        this.getCommentsInfo();
        //关闭加载动画
        let loadingInstance = Loading.service({ text: false });
        this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭 
            loadingInstance.close();
        });
    }
}
</script>
<style lang='less'>
.tab-content img {
    width: 100%;
    height: 100%;
    display: block;
}

.pic-box {
    width: 395px;
    .control-box .thumb-list {
        display: flex;
        justify-content: center;
        img {
            width: 80px;
            height: 80px;
            margin: 2px;
        }
    }
    .control {
        //   text-align:center;
        display: flex; // 主轴
        justify-content: center; // 纵轴 副轴 侧轴
        align-items: center;
    }
}
// 移动图片的样式
.moveImg{
    position: absolute;
    width: 50px;
    height: 50px;
    display: none;
}
.moveImg.move{
    transition: 1s;
    transform: scale(0);
}
</style>