<template>
  <div class="login">
    <div class="login-image">
      <el-image :src="LoginPage" style="max-width: 700px;"></el-image>
    </div>
    <div class="login-box">
      <el-tabs @tab-click="userTabClickHandler">
        <el-tab-pane label="我是买家">
        </el-tab-pane>
        <el-tab-pane label="我是卖家">
        </el-tab-pane>
      </el-tabs>
      <div class="mid">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" stateCode-icon>
          <el-form-item prop="username">
            <el-input class="info" v-model="dataForm.username" placeholder="帐号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input class="info" v-model="dataForm.password" type="password" Y placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item prop="confirmedPassword">
            <el-input class="info" v-model="dataForm.confirmedPassword" type="password" Y placeholder="确认密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" value="login" @click="dataFormSubmit()">注册</el-button>
            <el-button type="info" value="register" @click="LoginClick()">前往登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import LoginPage from '../assets/LoginPage.png'
import { userRegister } from '../api/apis';

export default {
  data() {
    return {
      LoginPage,
      ElMessage,
      dataForm: {
        userType: 'buyer',
        username: '',
        password: '',
        confirmedPassword: '',
      },
      dataRule: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        confirmedPassword: [
          { validator: this.confirmedPasswordValiadator, trigger: 'blur' },
        ]
      },
    }
  },
  methods: {
    userRegister,
    // Login
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(this.dataForm);
          userRegister({
            username: this.dataForm.username,
            password: this.dataForm.password,
            userType: this.dataForm.userType,
          }).then(res => {
            console.log(res);
            if (res.stateCode == '200') {
              // localStorage.setItem['loginUserName'] = this.dataForm.username;
              // localStorage.setItem['loginUserType'] = this.dataForm.userType;
              ElMessage.success('注册成功');
              this.$router.push({ path: '/login' })
            } else {
              if (res.stateMsg) {
                ElMessage.error(res.stateMsg);
              } else {
                ElMessage.error('未知错误, Status: ' + res.stateCode);

              }
            }
          }).catch(error => {
            if (error.response) {
              // 请求已发出，但服务器响应了状态码不在2xx范围内
              console.error('Error stateCode', error.response.stateCode);
              console.error('Error data', error.response.data);
            } else if (error.request) {
              // 请求已发出，但没有收到响应
              console.error('No response received', error.request);
            } else {
              // 请求配置时出现错误
              console.error('Error', error.message);
            }
          });
        }
      })
    },
    LoginClick() {
      // ElMessage.success('Sucess?');
      this.$router.replace({ path: '/login' });
      // console.log(this.activeName);
    },
    userTabClickHandler(pane, event) {
      // console.log(pane.index);
      this.dataForm.userType = pane.index == 0 ? 'buyer' : 'seller';
    },
    confirmedPasswordValiadator(rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.dataForm.password) {
        callback(new Error("两次输入的密码不同"))
      } else {
        callback()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  gap: 20x;
  width: 100%;
  height: 100%;
  // background: url(~@/assets/img/login-bg.png) no-repeat;
  box-sizing: border-box;
  background-size: cover;
  position: fixed;
}

.login-image {
  margin-top: 5%;
  margin-left: 10%;
}

.login .login-box {
  position: absolute;
  left: 80%;
  transform: translateX(-50%);
  height: 100%;
  padding-top: 5%;
}

.login .login-box .top {
  margin-bottom: 30px;
  text-align: center;
}

.login .login-box .top .logo {
  font-size: 0;
}

.login .login-box .top .company {
  font-size: 16px;
  margin-top: 10px;
}

.login .login-box .mid {
  font-size: 14px;
}

.login .login-box .mid .item-btn {
  margin-top: 20px;
}

.login .login-box .mid .item-btn input {
  border: 0;
  width: 100%;
  height: 40px;
  box-shadow: 0;
  background: #1f87e8;
  color: #fff;
  border-radius: 3px;
}

.info {
  width: 410px;
}

.login-captcha {
  height: 40px;
}

.login .login-box .bottom {
  position: absolute;
  bottom: 10%;
  width: 100%;
  color: #999;
  font-size: 12px;
  text-align: center;
}
</style>