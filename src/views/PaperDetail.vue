<script setup lang="ts">
import {useRoute} from 'vue-router'
import {getPaperById, getPaperByCategory, getReferencePaper, getSimilarPaper} from "../api/paper.ts";
import {ref} from "vue";
import PaperItem from "@/components/PaperItem.vue";




const route = useRoute()
const paperId = Number(route.params.paperId)
const title = ref('')
const abstract = ref('')
const category = ref('')
const year = ref('')

const referencePaper = ref([])
const sameCategoryPaper = ref([])
const similarPaper = ref([])
const activeTab = ref('reference')


function getPaperDetail() {
  console.log(paperId)
  getPaperById(paperId).then(res => {
    title.value = res.data.result.title
    abstract.value = res.data.result.abstract
    category.value = res.data.result.category
    year.value = res.data.result.year
  })
}
getPaperDetail()

function getReference() {
  getReferencePaper(paperId).then(res => {
    referencePaper.value = res.data.result
  })
}
function getCategory() {
  getPaperByCategory(category.value).then(res => {
    sameCategoryPaper.value = res.data.result
  })
}

function getSimilar() {
  getSimilarPaper(paperId).then(res => {
    similarPaper.value = res.data.result
  })
}

getReference()
getSimilar()
getCategory()

</script>

<template>
  <!-- Paper Detail -->
  <div class="main-content">
    <div class="paper-details">
      <h2 class="paper-title">Evasion Attacks against Machine Learning at Test Time</h2>
      <div class="paper-abstract">
        <div class="abstract">摘要</div>
        <p>
          Evasion attacks against machine learning (ML) models are a well-studied class of attacks that aim to manipulate the model's prediction by adding carefully crafted perturbations to the input data. In this paper, we study evasion attacks against ML models at test time, where the attacker has no knowledge of the model's parameters and architecture. We propose a novel attack algorithm, called the Zeroth Order Projection Attack (ZOPA), that requires only query access to the target model. ZOPA is based on a novel zeroth order optimization algorithm that estimates the gradient of the model's loss function by querying the model. We show that ZOPA is effective against a variety of ML models, including deep neural networks, and that it outperforms existing black-box attacks in terms of query efficiency and success rate. We also demonstrate that ZOPA is robust to common defenses, such as input transformation and gradient masking. Finally, we show that ZOPA can be used to attack real-world ML models, such as those used in computer vision and malware detection.
        </p>
      </div>
      <div class="paper-category">
        <div class="category">类别</div>
        <p>Security and Privacy</p>
      </div>
      <div class="paper-category">
        <div class="category">年份</div>
        <p>2004</p>
      </div>
    </div>
    <div class="tabs-section">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="引用论文列表" name="reference"></el-tab-pane>
        <el-tab-pane label="相似论文列表" name="similar"></el-tab-pane>
        <el-tab-pane label="同类论文列表" name="category"></el-tab-pane>

      </el-tabs>
      <div class="paper-list">
        <paper-item paper-id="1"></paper-item>
        <paper-item paper-id="2"></paper-item>
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
}

.paper-item {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

</style>