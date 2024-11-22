<script setup lang="ts">
import {ref, computed} from 'vue'
import {router} from '../router'
import {userRegister} from "../api/user.ts"
import {ElMessage} from "element-plus";

const username = ref('')
const role = ref('COMMON')
const password = ref('')
const confirmPassword = ref('')
const email = ref('')

const hasUsernameInput = computed(() => username.value != '')
const hasPasswordInput = computed(() => password.value != '')
const hasConfirmPasswordInput = computed(() => confirmPassword.value != '')
const hasRoleChosen = computed(() => role.value != '')
const hasEmailInput = computed(() => email.value != '')

const isPasswordIdentical = computed(() => password.value == confirmPassword.value)

const registerDisabled = computed(() => {
    if(!hasRoleChosen || !hasUsernameInput || !hasPasswordInput || !hasConfirmPasswordInput || !hasEmailInput) {
      return true
    }
    if(!isPasswordIdentical){
      return true
    }
})

function handleRegister(){
  userRegister({
        username: username.value,
        password: password.value,
        role: role.value,
        email: email.value
    }).then(res => {
        if(res.status = 200){
            ElMessage.success({
                message: "注册成功",
                type: "success",
                center: true,
            });
            router.push({path: '/login'})
        }else if(res.data.code === '400'){
            ElMessage.error({
                message: res.data.msg,
                type: "error",
                center: true,
            });
        }
    })
}

</script>

<template>
  <el-main class="main-frame bgimage">
    <el-card class="login-card">
      <div>
        <h1>注册您的账户</h1>
        <el-form>
          <el-form-item>
            <label>用户名</label>
            <el-input id="username" type="text" v-model="username" required placeholder="请输入用户名"/>
          </el-form-item>
<!--          <el-form-item>-->
<!--            <label>权限</label>-->
<!--            <el-select v-model="role" placeholder="是否充值VIP">-->
<!--              <el-option label="普通用户" value="COMMON"></el-option>-->
<!--              <el-option label="至尊会员" value="VIP"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
          <el-form-item>
            <label>密码</label>
            <el-input id="password" type="password" v-model="password" required placeholder="••••••••"/>
          </el-form-item>
          <el-form-item>
            <label>确认密码</label>
            <el-input id="confirmPassword" type="password" v-model="confirmPassword" required placeholder="••••••••"/>
          </el-form-item>
          <el-form-item>
            <label>邮箱</label>
            <el-input id="email" type="text" v-model="email" required placeholder="请输入邮箱"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="registerDisabled" @click="handleRegister">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </el-main>
</template>

<style>
.main-frame {
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
}

.bgimage {
  background-image: url("../assets/images/login.jpg");
}
</style>
