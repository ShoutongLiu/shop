 <template>
    <div class="shoppingCart">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span> 放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span> 填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span> 支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <!-- 商品列表 -->
                                <tr v-if="message.length == 0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <!-- 商品列表 -->
                                <tr v-for="item in message" :key="item.id">
                                    <td>
                                        <el-switch v-model="item.selected" active-color="black" inactive-color="hotpink">
                                        </el-switch>
                                    </td>
                                    <td><img :src="item.img_url" alt="" width=60></td>
                                    <td>{{item.title}}</td>
                                    <td>{{item.sell_price}}</td>
                                    <td>
                                        <el-input-number size="mini" :min='1' v-model="item.buycount" @change="numChange($event,item.id)"></el-input-number>
                                    </td>
                                    <td>{{item.buycount *item.sell_price}}</td>
                                    <td>
                                        <el-button @click="delOne(item.id)" type="danger" icon="el-icon-delete" circle></el-button>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{totalNum}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <button class="submit" @click="Submit">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Loading } from "element-ui";
export default {
    name: "shoppingCart",
    data() {
        return {
            message: [],
        }
    },
    //生命周期函数
    created() {
        let cartData = this.$store.state.cartDate;
        //定义拼接数据
        let ids = '';
        for (const key in cartData) {
            ids += key;
            ids += ",";
        }
        //去掉最后一个多余的逗号
        ids = ids.slice(0, -1);
        //调用接口
        this.$axios.get(`/site/comment/getshopcargoods/${ids}`).then(response => {
            // console.log(response)
            response.data.message.forEach(v => {
                v.buycount = cartData[v.id];
                //设置默认是否被选中
                v.selected = true;
            });
            this.message = response.data.message;
        })
    },
    //计算属性
    computed: {
        //计算总金额
        totalPrice() {
            let totalPrice = 0;
            this.message.forEach((v, i) => {
                if (v.selected == true) {
                    totalPrice += v.buycount * v.sell_price;
                }
            })
            return totalPrice;
        },
        //计算总数
        totalNum() {
            let totalNum = 0;
            this.message.forEach((v, i) => {
                if (v.selected == true) {
                    totalNum += parseInt(v.buycount);
                }
            })
            return totalNum;
        }
    },
    methods: {
        //同步购物车的数量
        numChange(num, id) {
            //调用仓库的方法
            console.log(num, id)
            this.$store.commit('updateGoodsNum', {
                goodId: id,
                goodNum: num
            })
        },
        //删除数据(同步购物车的数量)
        delOne(id) {
            this.$store.commit('deleteGood', id);
            //删除后更新视图
            this.message.forEach((val, index) => {
                if (val.id == id) {
                    this.message.splice(index, 1);
                }
            })
        },
        Submit() {
            //判断是否有商品
            if (this.totalPrice == 0) {
                this.$Message.error('请先登录!');
                return;
            }

            let ids = '';
            this.message.forEach(v=>{
                if (v.selected == true) {
                    ids +=v.id;
                    ids += ",";
                }
            })
            ids = ids.slice(0, -1)
            this.$router.push(`/order/${ids}`);
        }
    }
}
</script>

<style>
    .wrapper{
        min-height: 367px;
    }
</style>