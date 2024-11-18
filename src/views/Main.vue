<script setup lang="ts">

import {useRouter} from "vue-router";
import { defineProps, ref } from 'vue';
import {Search} from "@element-plus/icons-vue";
import {searchPaper} from "../api/paper.ts";

import {ElMessage, ElMessageBox} from "element-plus";
import paperItem from "../components/paperItem.vue";

const router = useRouter();

const input = ref('');

const paperList = ref();

const username = sessionStorage.getItem('username') || '未登录'

function search() {
  if(input.value === ''){
    ElMessage.error({
      message: "关键字不能为空",
      type: "error",
      center: true,
    });
    return
  }
  searchPaper(input.value).then(res => {
    ElMessage.success({
      message: "查询成功",
      type: "success",
      center: true,
    });
    paperList.value = res.data.result;
  })
}

function toPaperDetailPage(paperId: number) {
  router.push({path: `/paperDetail/${paperId}`}).then(() => {
    window.location.reload()
  })
}



</script>

<template>
  <div class="search-page">
    <div class="search-header">
      <h1 class="title">搜索论文</h1>
      <div class="search-area">
        <el-input v-model="input" placeholder="请输入关键字" style="width: 500px">

        </el-input>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
    </div>
    <div class="result-main">
      <h2 class="result-title">搜索结果</h2>
      <div class="paper-list">
        <paper-item v-for="item in paperList" :key="item.id" :paperId="item.id" @click="toPaperDetailPage(item.id)"></paper-item>
        <paper-item paper-id="1"></paper-item>
        <paper-item paper-id="2"></paper-item>
        <paper-item paper-id="3"></paper-item>
        <paper-item paper-id="4"></paper-item>
        <paper-item paper-id="5"></paper-item>
        <paper-item paper-id="6"></paper-item>
        <paper-item paper-id="7"></paper-item>
      </div>

    </div>
  </div>
</template>

<style scoped>
.search-page {
  text-align: center;
}

.search-header {
  background-color: #79b5ed; /* 搜索区域背景颜色 */
  padding: 20px;
  color: white;

}

.title {
  margin-bottom: 20px;
  color: white;
  font-size: 30px;
  font-weight: bold;
}

.search-area {
  display: flex;
  justify-content: center;

  margin-bottom: 20px;
}

.result-main {
  background-color: #f4ffff; /* 结果区域背景颜色 */
  padding: 20px;
  min-height: calc(100vh - 250px);

}

.result-title {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 30px;
}

.paper-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.paper-card {
  width: 80%;
  text-align: left;
  border: 1px solid #ddd;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.pagination {
  margin-top: 20px;
}
</style>
