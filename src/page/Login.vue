<template>
    <div class="login_box">
        <div class="login_form_box">
            <img class="widthAll" src="../assets/img/login/login_form_bg.png" alt="">
            <!--右侧表单区域-->
            <div class="login_form">
                <p class="formTitle">面向5G的D频段退频工具</p>
                <el-form :model="formItem">
                    <el-form-item class="marginBottom0">
                        <el-input
                            class="login_input"
                            @blur="blurInput"
                            v-model="formItem.license"
                            placeholder="请输入License"/>
                    </el-form-item>
                    <div class="login_error_tip">
                        <span v-if="formItem.errorFlag">{{formItem.errorTip}}</span>
                    </div>
                    <el-form-item class="marginBottom0">
                        <el-button
                            class="loginBtn"
                            @click="clickLogin" @onkeydown="clickLogin">激活
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                // 登录表单
                formItem: {
                    license: '', // 账户名
                    errorFlag: true, // 错误标识
                    errorTip: '', // 错误提示
                },
            }
        },
        methods: {
            // 失去焦点校验
            blurInput() {
                var _t = this;
                if (_t.formItem.license.trim() === '') {
                    _t.formItem.errorFlag = true;
                    _t.formItem.errorTip = 'License不能为空!';
                } else {
                    _t.formItem.errorFlag = false;
                    _t.formItem.errorTip = '';
                }
            },
            // 点击登录按钮
            clickLogin(event) {
                event.preventDefault();
                var _t = this;
                // 校验不能为空
                _t.blurInput();
                // 可以提交
                if (_t.formItem.errorFlag === false) {
                    _t.$api.post('/importLicense', {
                        code: _t.formItem.license.trim()
                    }, function (res) {
                        switch (res.code) {
                            case 0: // 成功进入系统
                                _t.$router.push({name: 'Index'});
                                break;
                            case -1: // license不存在
                            case -2: // license无效
                            case -3: // license已过期
                            case -5: // 用户不存在
                                _t.formItem.errorTip = res.msg;
                                _t.formItem.errorFlag = true;
                                break;
                            default:
                                break;
                        }
                    });
                }
            },
            // 获取license
            getLicense() {
                var _t = this;
                _t.$api.post('user/login', {}, function (res) {
                    switch (res.code) {
                        case 0: // 成功进入系统
                            _t.$router.push({name: 'Index'});
                            break;
                        case -1: // license不存在
                        case -2: // license无效
                        case -3: // license已过期
                        case -4: // 用户不存在
                            _t.$message.error(res.msg);
                            break;
                        default:
                            break;
                    }
                });
            }
        },
        created() {
            var _t = this;
            // 默认调用license
            _t.getLicense();
        }
    }
</script>

<style scoped>
    .login_box {
        width: 100%;
        height: 100%;
        background: url("../assets/img/login/login_bg.jpg") no-repeat;
        background-size: 100% 100%;
        position: relative;
    }

    .login_form_box {
        width: 1000px;
        height: 470px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .login_form {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 50%;
        padding: 120px 80px 50px;
    }

    .formTitle {
        font-size: 24px;
        font-weight: bold;
        color: #0185cf;
        margin-bottom: 50px;
    }

    .loginBtn {
        width: 100%;
        height: 60px;
        line-height: 60px;
        padding: 0;
        background: url("../assets/img/login/login_btn.png") no-repeat;
        color: #fff !important;
        font-size: 18px;
        outline: none;
        border: none;
    }

    .loginBtn:focus,
    .loginBtn:hover {
        color: #fff !important;
        outline: none;
        border: none;
    }

    .login_error_tip {
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        color: #fb6041;
    }
</style>
<style>
    .login_input .el-input__inner {
        height: 60px !important;
        line-height: 60px !important;
    }
</style>
