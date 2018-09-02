<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="javascript:;">支付中心</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit pay">
            <a href="javascript:;" class="selected">支付中心</a>
          </div>
          <div class="form-box payment">
            <div class="el-row">
              <div class="el-col el-col-18">
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>订 单 号：</dt>
                      <dd>{{orderInfo.order_no}}</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>收货人姓名：</dt>
                      <dd>{{orderInfo.accept_name}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>送货地址：</dt>
                      <dd>{{orderInfo.area}}&nbsp;{{orderInfo.address}}
                      </dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>手机号码：</dt>
                      <dd>{{orderInfo.mobile}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付金额：</dt>
                      <dd>{{orderInfo.order_amount}} 元</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付方式：</dt>
                      <dd>在线支付</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                      <dd>{{orderInfo.message}}</dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div class="el-col el-col-6">
                <div id="container2">
                  <qrcode :value="'http://47.106.148.205:8899/site/validate/pay/alipay/'+$route.params.id" :options="{ size: 200 }"></qrcode>
                </div>
              </div>
              <div>
                <span>扫码支付或者</span>
                <input type="button" value="跳转到支付页" @click="goPayOrder" style="cursor: pointer">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//导入二维码插件
import VueQrcode from '@xkeshi/vue-qrcode';
export default {
  data() {
    return {
      orderInfo: []
    }
  },
  components: {
    //   对象的属性名 默认不支持 使用 对象取值的方式来赋值
    // ES6中有这个语法
    [VueQrcode.name]: VueQrcode
  },
  created() {
    this.$axios.get(`site/validate/order/getorder/${this.$route.params.id}`)
      .then(response => {
        console.log(response)
        this.orderInfo = response.data.message[0];
      });
    let interId = setInterval(() => {
      this.$axios.get(`site/validate/order/getorder/${this.$route.params.id}`)
        .then(response => {
          if (response.data.message[0].status == 2) {
            this.$Message.success('支付成功!');
            setTimeout(() => {
              this.$router.push('/paySuccess');
            }, 500);
            clearInterval(interId)
          } else {
           
          }
        });
    }, 1000)
  },
  methods: {
    goPayOrder() {
      window.open("http://47.106.148.205:8899/site/validate/pay/alipay/" +
        this.$route.params.id);
    }
  }
}

</script>
<style>


</style>
