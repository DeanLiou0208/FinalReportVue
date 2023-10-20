<template>
    <div class="main-content">
    <div class="sidebar routerborder">
            <ul>
                <li><router-link to="/memberInformation">
                        <h6>個人資料</h6>
                    </router-link></li>
                <li><router-link to="/personalPetView">
                        <h6>我的寵物</h6>
                    </router-link></li>
                <li><router-link to="">
                        <h5>我的文章</h5>
                    </router-link></li>
                <li><router-link to="">
                        <h6>我的收藏</h6>
                    </router-link></li>
                <li><router-link to="">
                        <h6>我的訂單</h6>
                    </router-link></li>
                <li><router-link to="">
                        <h6>我的任務</h6>
                    </router-link></li>
            </ul>
        </div>










    <div class="container">
        <div style="margin-bottom: 20px;">
            <span class="profile-picture">
                <img :src="posts[0].img" alt="Profile Picture" class="rounded-circle" style="margin-top: 10px;" />
            </span>
            &nbsp
            <span style="font-size: 20px; ">{{ posts[0].userName }}</span>
            <div class="d-flex justify-content-end" v-if="isMember">
                <RouterLink class="btn btn-primary mb-3" to="/forum/add"><i class="bi bi-plus"></i> 新討論</RouterLink>
            </div>
        </div>

        <div class="card-list">
            <div class="row row-cols-4 g-4 ">
                <div class="card border-success mb-3" style="width: 18rem" v-for="(post, index) in posts" :key="index">
                    <img :src="post.main" class="card-img-top custom-image" alt="..." />
                    <div class="card-body">
                        <RouterLink to="/forumpost" class="custom-link">
                            <h5 class="card-title" @click="selectId(post.id)" style="height: 50px; overflow: hidden;">{{
                                post.title }}</h5>
                        </RouterLink>
                        <!-- <a href="#" to="/forumpost" >{{ post.title }} </a> -->
                        <p class="card-text" style="height: 90px; overflow: hidden;">{{ post.petArticleText }}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">文章類型: {{ post.type }}</li>
                        <li class="list-group-item" style="text-align: centers">
                            <div style="float: left;"><i class="bi bi-chat-dots"></i> {{ post.totalComments }}</div>
                            <div style="float: right;"><i class="bi bi-hand-thumbs-up"></i> {{ post.likeCount }} &nbsp
                                <i class="bi bi-hand-thumbs-down-fill"></i> {{ post.unLikeCount }}
                            </div>
                        </li>
                        <li class="list-group-item">最近更新時間: {{ post.createAt }}</li>
                        <span v-if="isMember">
                        <li class="list-group-item d-flex justify-content-between">
                            <RouterLink class="btn btn-secondary me-3" :to="'/forum/edit/' + post.id"><i
                                    class="bi bi-pencil-fill"></i> 修改
                            </RouterLink>
                            <button class="btn btn-danger" @click="deleteHandler(post.id)"><i class="bi bi-trash-fill"></i>
                                刪除</button>
                        </li>
                    </span>
                    </ul>
                    <!-- <div class="card-body">
        <a :href="card.link1" class="card-link">Card link</a>
        <a :href="card.link2" class="card-link">Another link</a>
      </div> -->
                </div>
            </div>
        </div>
        <Paging :totalPages="totalPages" :thePage="datas.start / datas.rows + 1" @childClick="clickHandler"
            style="margin-left: 150px;"></Paging>
    </div>
    <!-- <div class="paging-wrapper"> -->
    <!-- </div> -->
    </div>
</template>
    
<script setup>
import { ref, reactive, inject } from "vue";
import axios from "axios";
import { useRouter, useRoute } from 'vue-router';
import Paging from "../components/Paging.vue";
import Swal from "sweetalert2";
const posts = ref([]);
const $cookies = inject("$cookies");
const route = useRoute();
const router = useRouter();
const datas = reactive({
    memberId: $cookies.get("id"),
    // memberId: localStorage.getItem("memberId"),
    sort: "createAt",
    order: "desc",
    start: 0,
    rows: 3
})

const isMember = ref(false);

// function changeAdd (){
//     if ($cookies.get("identity") === "會員"){
//         if($cookies.get("id") === datas.memberId) {
//             isMember.value = true
//             console.log(isMember.value)
//         }else{
//             isMember.value = false;
//         }
//     }else{
//         isMember.value = false;
//     }
        
//     }



const totalPages = ref(0);
console.log(localStorage.getItem("memberId"))
// datas.value.memberId = localStorage.getItem("memberId")
const URL = import.meta.env.VITE_API_JAVAURL;
const loadForumPostBymember = async () => {
    const API_URL = `${URL}pages/ajax/PetArticlePostView/ByMemberId`;
    const response = await axios.post(API_URL, datas);

    console.log(response.data.list);
    //取得篩選文章放進posts變數
    posts.value = response.data.list;

    //計算總共幾頁
    totalPages.value = +datas.rows === 0 ? 1 : Math.ceil(response.data.count / datas.rows)
    console.log(totalPages.value)
    
    if ($cookies.get("identity") === "會員"){
        if($cookies.get("id") === datas.memberId) {
            isMember.value = true
            console.log(isMember.value)
        }else{
            isMember.value = false;
            console.log(isMember.value)
        }
    }else{
        isMember.value = false;
        console.log(isMember.value)
    }
}
// 跳轉頁面
function selectId(input) {
    console.log(input);
    localStorage.setItem("petArticleId", input);
}
//paging 由子元件觸發
const clickHandler = page => {
    datas.start = (page - 1) * datas.rows
    console.log(page)
    loadForumPostBymember();
}

// 刪除文章
const deleteHandler = async (id) => {
    if (window.confirm("真的要刪除嗎?")) {
        const API_URL = `${URL}pages/ajax/petArticleRemove/${id}`;
        const response = await axios.delete(API_URL);

        if (response.data.success) {
            Swal.fire({
                icon: "success",
                title: "文章刪除成功!"
            });
            loadForumPostBymember()
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "文章刪除失敗!",
        });
    }
}
loadForumPostBymember();
// changeAdd();
</script>
    
<style scoped>
.custom-link {
    text-decoration: none;
}

.profile-picture img {
    width: 80px;
    /* 自定义宽度 */
    height: 80px;
    /* 自定义高度 */
    /* 可以添加其他样式属性，例如边框、边距等 */
}

.profile-picture img {
    object-fit: cover;
    /* 可以根据需要调整此值 */
}

.custom-image {
    width: 100%;
    height: 10rem;
    /* 根據您的需求設置高度 */
    object-fit: cover;
    /* 或 contain，取決於您的需求 */
}
.main-content {
    display: flex;
    justify-content: space-between;
    padding: 10px;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    height: auto;
    /* 让容器占满整个视窗高度 */
}

.routerborder {
    padding: 50px 0;
    border: black 1px solid;
    border-radius: 10px;
    height: 300px;
    width: 150px;
}
</style>