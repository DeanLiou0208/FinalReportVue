<template>
  <h1>Forum</h1>
  <RouterLink class="btn btn-primary mb-3" to="/forumpost"
    ><i class="bi bi-plus"></i> 新增</RouterLink
  >
  <div class="container">
    <div class="species-container">
      <SpeciesInput @SpeciesChange="toggleSpecies"></SpeciesInput>
    </div>
    <div class="article-type-container">
      <ArticleTypeInput @typeChange="filterArticlesByType"></ArticleTypeInput>
    </div>
    <br />
    <div class="row mb-3">
      <div class="col-3">
        <SelectedSort @sortChange="sortArticles"></SelectedSort>
      </div>
      <div class="col-6"></div>
      <div class="col-3">
        <SearchTitle @searchInput="inputHandler"></SearchTitle>
      </div>
    </div>
    <br />
    <div class="card-list">
      <div class="row row-cols-2 row-cols-md-3 g-4">
        <div
          class="card"
          style="width: 18rem"
          v-for="(post, index) in posts"
          :key="index"
        >
          <img :src="post.img" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.petArticleText }}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">文章類型: {{ post.type }}</li>
            <li class="list-group-item" style="text-align: right">
              <i class="bi bi-hand-thumbs-up"></i> {{ post.likeCount }}
              <i class="bi bi-hand-thumbs-down-fill"></i> {{ post.unLikeCount }}
            </li>
            <li class="list-group-item">最新回復時間: {{ post.lastTime }}</li>
          </ul>
          <!-- <div class="card-body">
        <a :href="card.link1" class="card-link">Card link</a>
        <a :href="card.link2" class="card-link">Another link</a>
      </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import axios from "axios";
import SpeciesInput from "../components/SpeciesInput.vue";
import ArticleTypeInput from "../components/ArticleTypeInput.vue";
import SelectedSort from "../components/SelectedSort.vue";
import SearchTitle from "../components/SearchTitle.vue";
const posts = ref([]);

const datas = reactive({
  speciesId: null,
  type: null,
  title: null,
  sort: null,
  order: null,
});

console.log("datas=" + datas.speciesId);
const URL = import.meta.env.VITE_API_JAVAURL;
const loadPosts = async () => {
  const API_URL = `${
    import.meta.env.VITE_API_JAVAURL
  }pages/ajax/PetArticleOrderView/find`;
  const response = await axios.post(API_URL, datas);

  console.log(response.data);
  //取得篩選文章放進posts變數
  posts.value = response.data.list;
};

// 篩選哪些species
const toggleSpecies = (selectedSpeciesIds) => {
  datas.speciesId = selectedSpeciesIds;
  console.log("datas.speciesId:" + selectedSpeciesIds);

  console.log("id:" + datas.speciesId[1]);

  loadPosts();
};
// 篩選文章種類
const filterArticlesByType = (value) => {
  datas.type = value;
  console.log("datas.type:" + value);

  console.log("id:" + datas.type);

  loadPosts();
};
// 按讚數,到讚數,時間排序
const sortArticles = (value) => {
  datas.sort = value;
  loadPosts();
};
//模糊搜尋文章標題
const inputHandler = (value) => {
  datas.title = value;
  console.log("value:" + value);
  loadPosts();
};

loadPosts();
</script>
    


<style scoped>
.card-list {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}
.card-img-top {
  width: 100%;
  height: 200px; /* 设置图像高度，可以根据需要进行调整 */
  object-fit: cover; /* 缩放图像以填充给定的高度 */
}
.species-container {
  margin-bottom: 10px; /* 添加顶部外边距 */
}

.article-type-container {
  margin-top: 10px; /* 添加底部外边距 */
}
</style>
