<script setup lang="ts">
import { ref, computed } from 'vue'
import { getPaperById } from '../api/paper.ts'

// 使用 props 接收父组件传递的数据
const props = defineProps({
  paperId: {
    type: Number,
    required: true
  }
})
const title = ref('默认标题')
const category = ref('默认类别')
const year = ref('默认年份')

getPaperById(props.paperId).then(res => {
  title.value = res.data.result.title || '默认标题'
  category.value = res.data.result.category || '默认类别'
  year.value = res.data.result.year || '默认年份'
})
</script>

<template>
  <el-card class="paper-card">
    <div class="paper-content">
      <h3 class="paper-title">{{ title }}</h3>
      <div class="paper-details">
        <span class="paper-category">类别：{{ category }}</span>
        <span class="paper-year">年份：{{ year }}</span>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.paper-card {


  margin: 10px 0;

  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.paper-content {
  display: flex;
  flex-direction: column;
}

.paper-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.paper-details {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #666;
}

.paper-category,
.paper-year {
  display: inline-block;
}
</style>