<script setup lang="ts">
import {Search, SwitchButton} from "@element-plus/icons-vue"
import {useRouter} from "vue-router";
import {ElMessageBox} from "element-plus";
import {User, Document, Discount} from "@element-plus/icons-vue"

const router = useRouter()
const username = sessionStorage.getItem('username') || '未登录'

function logout(){
  ElMessageBox.confirm(
    '是否要退出登录？',
    '提示',
    {
      customClass: "customDialog",
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: "warning",
      showClose: false,
      roundButton: true,
      center: true
    }
  ).then(() => {
    sessionStorage.setItem('token', '')
    router.push({path: '/login'})
  }
  )
}
//变成vip
function becomeVip(){
  ElMessageBox.confirm(
    '是否要成为VIP？',
    '提示',
    {
      customClass: "customDialog",
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: "warning",
      showClose: false,
      roundButton: true,
      center: true
    }
  ).then(() => {
    // 成为VIP的逻辑
  }
  )
}

</script>

<template>

  <el-header class="custom-header" height="20">
    <el-row :gutter="20" align="middle">

      <el-col :span="7" class="header-icon">
        <router-link to="/main" v-slot="{navigate}" class="no-link">
          <h1 @click="navigate" class="header-logo">Linked Papers</h1>
        </router-link>
      </el-col>


      <el-col :span="12"></el-col>
      <el-col :span="3" class="header-text">欢迎{{username}}!</el-col>




      <el-col :span="1" class="header-icon">
        <router-link to="/dashboard" v-slot="{navigate}">
          <el-icon @click="navigate" :size="35" color="white" ><User /></el-icon>
        </router-link>
      </el-col>





      <el-col :span="1" class="header-icon">
        <a @click="logout">
          <el-icon :size="35" color="white" ><SwitchButton /></el-icon>
        </a>
      </el-col>
    </el-row>
  </el-header>
</template>
<style scoped>
.custom-header {
  background-color: #4f9de7;
  justify-content: center;
  display: flex;
  flex-direction: column;
  height: 60px;
}
.header-icon{
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
}
.header-logo{
  color: white;
  font-size: 30px; /* Adjust font size as needed */
  cursor: pointer;
  display: flex;
  align-items: center; /* Center text vertically */
  height: 100%; /* Ensure it takes full height of the header */
  text-decoration: none;
  font-family: Impact;

}
.header-text{
  color: white;
  font-size: 15px; /* Adjust font size as needed */
  cursor: pointer;
  display: flex;
  align-items: center; /* Center text vertically */
  height: 100%; /* Ensure it takes full height of the header */
  justify-content: center;
  line-height: 60px;
}

</style>