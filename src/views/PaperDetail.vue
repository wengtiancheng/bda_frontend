<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router'
import {getPaperById, getPaperByCategory, getReferencePaper, getSimilarPaper} from "../api/paper.ts";
import {ref} from "vue";
import PaperItem from "@/components/PaperItem.vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {upgradeToVip} from "../api/user.ts";




const route = useRoute()
const router = useRouter()
const paperId = Number(route.params.paperId)
const title = ref('')
const abstract = ref('')
const category = ref('')
const year = ref('')

const referencePaper = ref([])
const sameCategoryPaper = ref([])
const similarPaper = ref([])
const activeTab = ref('reference')
const role = ref(sessionStorage.getItem('role') || 'error')
const username = sessionStorage.getItem('username') || '未登录'


function getPaperDetail() {
  console.log(paperId)

  getPaperById(paperId).then(res => {
    console.log(res)
    title.value = res.data.title
    abstract.value = res.data.abstractText
    category.value = res.data.category
    year.value = res.data.year
    getPaperByCategory(category.value).then(res => {
      sameCategoryPaper.value = res.data
    })
    getSimilarPaper(paperId).then(res => {
      similarPaper.value = res.data
    })
    getReferencePaper(paperId).then(res => {
      referencePaper.value = res.data
    })
  })
}


function getReference() {
  getReferencePaper(paperId).then(res => {

    referencePaper.value = res.data
  })
}
function getCategory() {

    getPaperByCategory(category.value).then(res => {
      console.log(category.value)
      console.log(res)
      sameCategoryPaper.value = res.data
  })
}

function getSimilar() {
  getSimilarPaper(paperId).then(res => {
    similarPaper.value = res.data
  })
}

function getCurrentPaperList(){
  if(activeTab.value === 'reference'){
    return referencePaper.value
  }else if(activeTab.value === 'similar' && role.value === 'VIP'){
    return similarPaper.value
  }else if(activeTab.value === 'category' && role.value === 'VIP'){
    return sameCategoryPaper.value
  }

}
function becomeVip(){
  if(role.value === 'VIP'){
    ElMessage.info({
      message: "您已经是VIP了",
      type: "error",
      center: true,
    });
    return
  }
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
        upgradeToVip(username).then(res => {
          console.log(res)
          if(res.status === 200){
            //更新sessionStorage
            sessionStorage.setItem('role', 'VIP')
            //更新role
            role.value = 'VIP'
            ElMessage.success({
              message: "成为VIP成功",
              type: "success",
              center: true,
            });
          }else{
            ElMessage.error({
              message: res.data.msg,
              type: "error",
              center: true,
            });
          }
        })
      }
  )
}
function toPaperDetailPage(paperId: number) {
  router.push({path: `/paperDetail/${paperId}`}).then(() => {
    window.location.reload()
  })
}

// async function initialize() {
//   await getPaperDetail();
//   getReference();
//   getSimilar();
//   getCategory();
// }
//
// initialize();
getPaperDetail()

</script>

<template>
  <!-- Paper Detail -->
  <div class="main-content">
    <div class="paper-details">
      <h2 class="paper-title">{{title}}</h2>
      <div class="paper-abstract">
        <div class="abstract">摘要</div>
        <p>
          {{abstract}}
        </p>
      </div>
      <div class="paper-category">
        <div class="category">类别</div>
        <p>{{category}}</p>
      </div>
      <div class="paper-category">
        <div class="category">年份</div>
        <p>{{year}}</p>
      </div>
    </div>
    <div class="tabs-section">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="引用论文列表" name="reference"></el-tab-pane>
        <el-tab-pane label="相似论文列表" name="similar"></el-tab-pane>
        <el-tab-pane label="同类论文列表" name="category"></el-tab-pane>

      </el-tabs>
      <div class="paper-list">
        <template v-if="activeTab === 'reference' || role === 'VIP'">
          <paper-item v-for="item in getCurrentPaperList()" :key="item.id" :paperId="item.id" :title="item.title" :category="item.category" :year="item.year" @click="toPaperDetailPage(item.id)"></paper-item>
        </template>
        <template v-else>
          <div class="vip-message">
            <p>只有VIP用户才能查看此内容</p>
          </div>
          <el-button type="primary" @click="becomeVip">成为VIP</el-button>
        </template>
      </div>
    </div>
  </div>

  <!-- Tabs -->




</template>

<style scoped>
.main-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 20px;

}
.paper-details {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;

  margin: 0 20%;
}

.paper-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.abstract, .category {
  font-size: 18px;
  margin-top: 8px;

  font-weight: bold;
}

.paper-abstract, .paper-category {
  margin-top: 5px;
  margin-bottom: 15px;
  line-height: 1.4;
}

.tabs-section {
  margin-top: 20px;
  margin-left:  20%;
  margin-right: 20%;

}

.paper-list {
  padding: 10px;
  background-color: #f0f4f8;
  border-radius: 10px;
  margin-top: 10px;
  text-align: center;
  margin-bottom: 40px;
}

.paper-item {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}
.vip-message {
  text-align: center;
  padding: 30px;
  gap:20px;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
}

</style>