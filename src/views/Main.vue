<script setup lang="ts">

import {useRouter} from "vue-router";
import { defineProps, ref, computed } from 'vue';
import {Search} from "@element-plus/icons-vue";
import {searchPaper} from "../api/paper.ts";

import {ElMessage, ElMessageBox} from "element-plus";
import paperItem from "../components/paperItem.vue";

const router = useRouter();

const input = ref('');

const paperList = ref([]);

const username = sessionStorage.getItem('username') || '未登录'

const currentPage = ref(1);

const pageSize = 10;

const paginatedPapers = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return paperList.value.slice(start, end);
});

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
    console.log(res)
    ElMessage.success({
      message: "查询成功",
      type: "success",
      center: true,
    });
    paperList.value = res.data;
  })
}

function toPaperDetailPage(paperId: number) {
  router.push({path: `/paperDetail/${paperId}`}).then(() => {
    window.location.reload()
  })
}

function handlePageChange(page: number) {
  currentPage.value = page;
}


</script>

<template>
  <div class="search-page">
    <div class="search-header">
      <h1 class="title">搜索论文</h1>
      <div class="search-area">
        <el-input v-model="input" placeholder="请输入关键字" style="width: 500px">

        </el-input>
        <el-button type="primary" :icon="Search"  @click="search">搜索</el-button>
      </div>
    </div>
    <div class="result-main">
      <h2 class="result-title">搜索结果</h2>
      <div class="paper-list">
        <template v-if="paginatedPapers.length">
                  <paper-item v-for="item in paginatedPapers" :key="item.id" :paperId="item.id" :title="item.title" :category="item.category" :year="item.year" @click="toPaperDetailPage(item.id)"></paper-item>
                  <el-pagination
                      v-if="paperList.length > pageSize"
                      :current-page="currentPage"
                      :page-size="pageSize"
                      :total="paperList.length"
                      @current-change="handlePageChange"
                      layout="prev, pager, next">
                  </el-pagination>
        </template>
        <template v-else >
          <p class="no-result">未查询到相关论文</p>
        </template>

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
  gap: 20px;
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
.no-result{
  font-size: 20px;

  margin-top: 15%;
}
.el-button {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
