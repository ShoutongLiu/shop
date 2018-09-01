<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>
                    <div id="loginform" name="loginform" class="login-box">
                        <form action="#">
                            <Input prefix="ios-contact" placeholder="Enter name" v-model.trim="username" style="width: 100%" />
                            <br>
                            <br>
                            <Input prefix="ios-lock" type="password" placeholder="Enter password" v-model="password" style="width: 100%" />
                            <br>
                            <br>
                            <div class="btn-box">
                                <Button type="success" long @click="login">立即登录</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'login',
    data: function() {
        return {
            username: 'admin',
            password: '123'
        }
    },
    methods: {
        login() {
            // 设置进度条的颜色 尺寸
            this.$Loading.config({
                color: "skyblue",
                failedColor: "hotpink",
                height: 10
            });
            // 显示进度条
            this.$Loading.start();
            this.$axios.post('/site/account/login', {
                user_name: this.username,
                password: this.password
            }).then(response => {
                if (response.data.status == 1) {
                    this.$Message.error(response.data.message)
                } else {
                    this.$router.push(this.$store.state.pathFrom);
                    this.$store.state.isLogin = true;
                }
                //   关闭进度条
                this.$Loading.finish();

            }).catch(response => {
                this.$Loading.error();
            })
        }
    }
}
</script>