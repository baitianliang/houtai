<template>
    <div class="login">
        <el-row :gutter="10" style="margin: 0px">
            <el-col class="login" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <!-- <div class="login-img" style="width: 100%; height: 100%; background-color: #666666;margin: 0px"></div> -->
                <img
                    class="login-img"
                    src="../assets/img/f3684af241c24b4b46cc01a587cf890.png"
                    style="width: 100%; height: 100%; margin: 0px"
                    alt="">
                <el-col class="login-content" :xs="17" :sm="17" :md="8" :lg="7" :xl="6">
                    <div v-loading.lock="fullscreenLoading">
                        <div class="login-title">欢迎登录</div>
                        <el-form
                            label-position="left"
                            :model="login.ruleForm"
                            status-icon
                            ref="ruleForm"
                            label-width="80px"
                            class="demo-ruleForm">
                            <el-form-item label="账号">
                                <el-input placeholder="请输入账号" v-model="login.ruleForm.username"></el-input>
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input placeholder="请输入密码" show-password type="password" v-model="login.ruleForm.password" autocomplete="off"></el-input>
                            </el-form-item>
                            <div class="login-operate"></div>
                            <el-button @click="register" class="login-submit">登录</el-button>
                        </el-form>
                    </div>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import axios from '../assets/axios/Login'
export default {
    setup() {
        const router = useRouter()
        let fullscreenLoading = ref(false)
        const login = reactive({
            ruleForm: {
                client_id: 'c1',
                client_secret: 'secret',
                grant_type: 'password',
                username: 'root',
                password: '123456',
            },
        })
        function register() {
            if (!login.ruleForm.username) return this.$message.error('请输入账号')
            if (!login.ruleForm.password) return this.$message.error('请输入密码')
            axios.getUserToken(login.ruleForm)
            .then((res) => {
                if (res) {
                    //全局存储token
                    localStorage["token"] = 'Bearer ' + res.data.access_token;
                    login.fullscreenLoading = false
                    router.push('/CouponReview')
                }
            })
            .catch(() => {
                open('用户名或密码错误，请重新登录')
                login.fullscreenLoading = false
            })
        }
        function open(message) {
            ElMessage({
                showClose: true,
                message,
                type: 'error'
            });
        }
        return {
            fullscreenLoading,
            login,
            register,
            open
        }
    },
    // data() {
        // return {
        //     fullscreenLoading: false,
        //     ruleForm: {
        //         username: '大夫1号',
        //         password: 'dxkd19@@',
        //     },
        // }
    // },
    methods: {
    }
}
</script>

<style lang="scss">
.login {
    height: 100vh;
    width: 100%;
    padding: 0px;
    .el-row {
        height: 100%;
        // .el-col {
        //     height: 100%;
        // }
    }
    .login-img {
        position: relative;
    }
    .login-content {
        position: absolute;
        left: 15%;
        top: 20vh;
        // width: 25%;
        height: 500px;
        width: 46rem;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0px 0px 10px;
        .login-title {
            width: 100%;
            margin: 50px 0px;
            text-align: center;
            font-size: 35px;
        }
        .el-form {
            margin: 0px 10%;
            .el-form-item {
                border-bottom: 2px solid #eee;
                .el-form-item__label {
                    padding: 5px 0px;
                    color: #808080;
                    font-size: 16px;
                }
                .el-form-item__content {
                    padding: 5px 0px;
                    .el-input {
                        .el-input__inner {
                            border: 0px;
                            padding: 0px;
                            font-size: 16px;
                            &::placeholder {
                                // color: red;
                                font-size: 16px;
                            }
                        }
                    }
                }
            }
            .login-operate {
                height: 50px;
            }
            .login-submit {
                width: 100%;
                padding: 16px;
                background-color: #534698;
                span {
                    font-size: 20px;
                    color: #eee;
                }
            }
            .login-bottom {
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
                font-size: 17px;
                color: #999;
                .text-color {
                    color: #FF6505;
                    cursor:pointer
                }
            }
        }
    }
}
</style>