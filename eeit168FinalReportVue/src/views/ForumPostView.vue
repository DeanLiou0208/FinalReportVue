<template>
    <div class="container ml-1">
        <div>
            <span class="profile-picture">
                <img :src="post.img" alt="Profile Picture" class="rounded-circle" style="margin-top: 10px;" />
            </span>
            &nbsp
            <RouterLink to="/forumpostbymember" class="custom-link">
            <span style="font-size: 16px;font-weight: bold;" class="custom-link" @click="selectMemberId(post.memberId)">{{ post.userName }}</span>
            </RouterLink>
            <p style="font-size: 22px; font-weight: bolder; margin-bottom: 0px;">{{ post.title }}</p>
            <div style="margin-top: 0px;">
                <p style="font-size:15px;">{{ post.type }} <i class="bi bi-dot"></i>
                    <!-- <span style="margin-left: 10px;">寵物種類{{post.species}} </span> -->
                    <span v-for="(item, index) in post.species" :key="index" style="margin: 5px; font-size:15px; ">{{
                        item.species }} </span>
                    <i class="bi bi-dot"></i>
                    <span style="margin: 5px; color:grey; font-size:10px;">{{ post.createAt }}</span>
                </p>
            </div>
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; ">
                <div style="font-size: 18px; text-align: left; width: 66.66%;">
                    {{ post.petArticleText }}
                </div>

                <div class="py-4 text-center " style="width: 66.66%;">
                    <div class="row mx-2">
                        <!-- <div class="d-flex justify-content-center"> -->
                        <div class="col-md-4" v-for="(item, index) in post.photo" :key="index" style="margin-bottom: 20px;">
                            <img :src="item.img" class="img-thumbnail custom-image-size d-block mx-auto" alt="...">
                        </div>
                        <!-- </div> -->
                    </div>
                </div>
            </div>
            <div class="pt-2">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div style="display: flex; align-items: center;">
                        <button type="button" class="btn btn-light " @click="cancelLike" v-if="post.likeRecord"><i
                                class="bi bi-hand-thumbs-up-fill  " style="font-size: 18px;color:blue"></i>&nbsp&nbsp{{
                                    post.likeCount }}</button>
                        <button type="button" class="btn btn-light " @click="increamentLike" v-else
                            :disabled="unPressLike"><i class="bi bi-hand-thumbs-up-fill"
                                style="font-size: 18px;color:silver"></i>&nbsp&nbsp{{
                                    post.likeCount }}</button>

                        &nbsp&nbsp&nbsp&nbsp
                        <!-- <i class="bi bi-three-dots-vertical"
                            style="font-size: 22px; color:lightgrey;margin-right: 0px; margin-left: 0px;"></i> -->


                        <button type="button" class="btn btn-light " @click="cancelUnlike" v-if="post.unlikeRecord"><i
                                class="bi bi-hand-thumbs-down-fill" style="font-size: 18px;color:black"></i>&nbsp&nbsp{{
                                    post.unlikeCount }}</button>

                        <button type="button" class="btn btn-light " @click="increamentUnlike" v-else
                            :disabled="unPressUnlike"><i class="bi bi-hand-thumbs-down-fill"
                                style="font-size: 18px;color:silver"></i>&nbsp&nbsp{{
                                    post.unlikeCount }}</button>
                    </div>
                    <div>
                        <!-- 點擊會導向新增貼文 -->
                        <!-- <button type="button" class="btn btn-light btn-sm " @click="addComment"><i
                                class="bi bi-chat" style="font-size: 20px; font-weight: bolder;"></i></button> -->

                        <!-- <div style="display: flex; align-items: center;"> -->
                        <!-- <span style="margin-right: 10px; font-size: 17px;">
                            留言&nbsp:&nbsp&nbsp{{ post.totalComments }}
                        </span> -->
                        <!-- </div> -->

                        <button type="button" class="btn btn-light btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal"
                            data-bs-whatever="@mdo"><i
                                class="bi bi-chat" style="font-size: 20px; font-weight: bolder;"></i></button>
                                <span style="margin-right: 10px; font-size: 17px;">
                            留言&nbsp:&nbsp&nbsp{{ post.totalComments }}
                        </span>
                       
                     

                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <!-- <div class="modal-header"> -->
                                        <!-- <h5 class="modal-title" id="exampleModalLabel">New message</h5> -->
                                        <div style="text-align: right;">
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                        </div>
                                    <!-- </div> -->
                                    <div class="modal-body">
                                        <form>
                                            <!-- <div class="mb-3">
                                                <label for="recipient-name" class="col-form-label">Recipient:</label>
                                                <input type="text" class="form-control" id="recipient-name">
                                            </div> -->
                                            <div class="mb-3">
                                                <label for="message-text" class="col-form-label" style="font-size: 18px;">留言:</label>
                                                <textarea class="form-control" id="message-text" v-model="postComment.commentsText"></textarea>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary" @click="addComment">新增留言</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="container ml-3">
                <div v-for="(commentPost, index) in commentPosts" :key="index">
                    <span class="profile-picture-com">
                        <img :src="commentPost.img" alt="Profile Picture" class="rounded-circle"
                            style="margin-top: 10px;" />
                    </span>
                    &nbsp
                    <span style="font-size: 14px;font-weight: lighter; ">{{ commentPost.userName }}</span>
                    <p style="font-size: 16px; margin-left: 130px; margin-top: 20px">[留言]&nbsp&nbsp{{
                        commentPost.commentsText }}</p>
                    <!-- <div class="py-4 text-center" style="width: 66.66%;">
                        <div class="d-flex justify-content-center">
                            <img :src="commentPost.img" class="img-thumbnail custom-image-size d-block mx-auto" alt="...">
                        </div>
                    </div> -->
                    <div
                        style="display: flex; justify-content: space-between; align-items: center; width: 70%; margin: 0 auto;">
                        <div>
                            <span style="font-size: 14px;">{{ commentPost.createAt }}</span>
                        </div>
                        <div>
                            <div style="display: flex; justify-content: flex-end; align-items: center;">
                                <!-- 當likeCommentRecord(來自java程式中命名)為true,則渲染為紅色愛心 -->
                                <button type="button" class="btn btn-light " @click="cancelCommentLike(index)"
                                    v-if="commentPost.likeCommentRecord"><i class="bi bi-heart-fill"
                                        style="font-size: 18px;color:red"></i>&nbsp&nbsp<span>{{
                                            commentPost.likeCount }}</span></button>

                                <button type="button" class="btn btn-light " @click="increamentCommentLike(index)" v-else
                                    :disabled="unPressCommentLike[index]"><i class="bi bi-heart-fill"
                                        style="font-size: 18px;color:silver;"></i>&nbsp&nbsp<span>{{
                                            commentPost.likeCount }}</span></button>
                                &nbsp&nbsp
                                <button type="button" class="btn btn-light " @click="cancelcommentUnlike(index)"
                                    v-if="commentPost.unlikeCommentRecord"><i class="bi bi-heartbreak-fill"
                                        style="font-size: 18px;color:black"></i>&nbsp&nbsp{{
                                            commentPost.unlikeCount }}</button>

                                <button type="button" class="btn btn-light " @click="decreamentCommentUnLike(index)" v-else
                                    :disabled="unPressCommentUnlike[index]"><i class="bi bi-heartbreak-fill"
                                        style="font-size: 18px;color:gray"></i>&nbsp&nbsp{{
                                            commentPost.unlikeCount }}</button>
                            </div>
                        </div>
                    </div>
                    <hr>
                </div>
            </div>

        </div>
    </div>
</template>
    
<script setup >
import { ref, reactive, onMounted, inject } from "vue";
import axios from "axios";
import { useRouter, useRoute } from 'vue-router';
import Swal from "sweetalert2";

const post = ref([]);
const newComment = ref("");
const $cookies = inject("$cookies");
const route = useRoute();
const router = useRouter();
const articleId = localStorage.getItem("petArticleId")
const postComment = ref({
    fkMemberId:$cookies.get("id"),
    fkPetArticleId:articleId,
    commentsText:"",
})
// const petArticleId =  route.params.petArticleId;
// console.log(articleId);
const datas = ref({
    fkMemberId: $cookies.get("id"),
    petArticleId: articleId,
    // petArticleId: 10,
})

const likeUse = ref({
    fkMemberId: $cookies.get("id"),
    petArticleId: articleId,
    likeOrUnlike: null
})
const commentLikeUse = ref({
    fkMemberId: $cookies.get("id"),
    fkCommentId: 0,
    likeOrUnlike:null
})
const unPressLike = ref(false);
const unPressUnlike = ref(false);
const unPressCommentUnlike = ref([]);
const unPressCommentLike = ref([]);

// const file = new FormData();
// const fileInput = ref(null);
// onMounted(() => {
//   fileInput.value = document.getElementById('formFileMultiple');
// })

const URL = import.meta.env.VITE_API_JAVAURL; // http://localhost:8080/定義在.env檔案

const loadPost = async () => {
    // const petArticleId = route.params.id      //讀取 id 參數的值    
    const API_URL = `${URL}pages/ajax/PetArticlePostView/ByArticleId`;
    // console.log(datas.value.fkMemberId);
    const response = await axios.post(API_URL, datas.value);
    //   species.foreach((item)=> {
    //   console.log(item.species); // 分别输出 "小型動物" 和 "水族兩棲"
    // });
    post.value = response.data;
    // console.log(post.value)
    // console.log("post:"+post.value.img);

    if (response.data.likeRecord) {
        unPressUnlike.value = true;
        // 如果likeRecord有值,則倒讚不能按
    } else {
        unPressUnlike.value = false;
    }
    if (response.data.unlikeRecord) {
        unPressLike.value = true;
    } else {
        unPressLike.value = false;
    }
}
// const likeCount = route.params.likeCount;
// const unlikeCount = route.params.unlikeCount;

// 跳轉頁面
function selectMemberId(input) {
//   console.log(input);
  localStorage.setItem("memberId", input);
//   console.log(localStorage.getItem(input));
  
}

// 新增留言
const addComment = async () => {
    if(postComment.value.commentsText===""){
        Swal.fire({
            icon: "warning",
            title: "請輸入留言!",
          });
    }else{   
        
    const API_URL = `${URL}pages/ajax/CommentsCreate`;
    const response = await axios.post(API_URL,postComment.value);
    newComment.value = response.data;
    // console.log("newComment:"+newComment.value.commentsText);
    
    if (response.data.success) {
      Swal.fire({
        icon: "success",
        title: "留言新增成功!"
      });
      // router.push('/forumpost');
      loadPost();
      loadCommentPosts();
    } else {
      Swal.fire({
        icon: "error",
        title: "留言新增失敗!",
      });
    
    }
}
}   
//     const json = JSON.stringify(post.value);
//   if (fileInput.value && fileInput.value.files.length > 0) {
//     // 添加所有文件到 FormData 对象中
//     for (let i = 0; i < fileInput.value.files.length; i++) {
//       file.append(`files`, fileInput.value.files[i]);

//     }
//   }
//   file.append('body', json);
//   const response = await axios.post(API_URL, file, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },

//   })



// 文章按讚按鈕功能
const increamentLike = async () => {
    post.value.likeRecord = !post.value.likeRecord; /* false ->true */
    post.value.likeCount++;
    if (post.value.likeRecord) {
        unPressUnlike.value = !unPressUnlike.value;
    }
    const API_URL = `${URL}pages/ajax/articleLikesCreate`;
    likeUse.value.likeOrUnlike = true;
    console.log(likeUse.value.fkMemberId);
    console.log(likeUse.value.petArticleId)
    const response = await axios.post(API_URL,likeUse.value);
    console.log(response.data)
}
const cancelLike = async () => {
    post.value.likeRecord = !post.value.likeRecord;
    post.value.likeCount--;
    if (!post.value.likeRecord) {
        unPressUnlike.value = !unPressUnlike.value;
    }
    const API_URL = `${URL}pages/ajax/dislike/${likeUse.value.fkMemberId}/${likeUse.value.petArticleId}`;
    // console.log(123)
    const response = await axios.delete(API_URL);
    console.log(response.data)
    
}
//文章倒讚按鈕功能
const increamentUnlike = async () => {
    post.value.unlikeRecord = !post.value.unlikeRecord;
    post.value.unlikeCount++;
    if (post.value.unlikeRecord) {
        unPressLike.value = !unPressLike.value;
    }
    const API_URL = `${URL}pages/ajax/articleLikesCreate`;
    likeUse.value.likeOrUnlike = false;
    console.log(likeUse.value.fkMemberId);
    console.log(likeUse.value.petArticleId)
    const response = await axios.post(API_URL,likeUse.value);
    console.log(response.data)
}
const cancelUnlike = async () => {
    post.value.unlikeRecord = !post.value.unlikeRecord;
    post.value.unlikeCount--;
    if (!post.value.unlikeRecord) {
        unPressLike.value = !unPressLike.value;
    }
    const API_URL = `${URL}pages/ajax/dislike/${likeUse.value.fkMemberId}/${likeUse.value.petArticleId}`;
    // console.log(123)
    const response = await axios.delete(API_URL);
    console.log(response.data)
}

// 顯示該篇文章留言
const commentPosts = ref([]);
const loadCommentPosts = async () => {
    // const petArticleId = route.params.id      //讀取 id 參數的值    
    const API_URL = `${URL}pages/ajax/CommentsLikePostView/byPetArticle`;

    const response = await axios.post(API_URL, datas.value);

    commentPosts.value = response.data.list;
     console.log("commentPosts:"+response.data.list[0].id);
     console.log("id:"+commentPosts.value[0].id);

    // commentPosts.value = response.data.list.map(item => reactive(item))

    for (let i = 0; i < response.data.list.length; i++) {
        if (response.data.list[i].likeCommentRecord) {
            unPressCommentUnlike.value[i] = true;

            // 如果likeRecord有值,則倒讚不能按
        } else {
            unPressCommentUnlike.value[i] = false;
        }
        if (response.data.list[i].unlikeCommentRecord) {
            unPressCommentLike.value[i] = true;
        } else {
            unPressCommentLike.value[i] = false;
        }
        // console.log(unPressCommentUnlike.value[i])
    }
}
//留言倒讚按鈕功能
const increamentCommentLike = async (index) => {
    commentPosts.value[index].likeCommentRecord = !commentPosts.value[index].likeCommentRecord;
    /* false->true */
    // console.log(commentPosts.value[index].likeCommentRecord);
    commentPosts.value[index].likeCount++;
    if (commentPosts.value[index].likeCommentRecord) {
        unPressCommentUnlike.value[index] = !unPressCommentUnlike.value[index];
    }
    const API_URL = `${URL}pages/ajax/commentsLikes`;
    commentLikeUse.value.likeOrUnlike = true;
    console.log(commentLikeUse.value.fkMemberId);
    commentLikeUse.value.fkCommentId = commentPosts.value[index].fkCommentId;
    console.log(commentLikeUse.value.fkCommentId);
    const response = await axios.post(API_URL,commentLikeUse.value);
    console.log(response.data)

}




const cancelCommentLike = async (index) => {
    commentPosts.value[index].likeCommentRecord = !commentPosts.value[index].likeCommentRecord;
    commentPosts.value[index].likeCount--;
    if (!commentPosts.value[index].likeCommentRecord) {
        unPressCommentUnlike.value[index] = !unPressCommentUnlike.value[index];
    }
    commentLikeUse.value.fkCommentId = commentPosts.value[index].fkCommentId;
    console.log(commentLikeUse.value.fkMemberId);
    console.log(commentLikeUse.value.fkCommentId);
    const API_URL = `${URL}pages/ajax/commentDislike/${commentLikeUse.value.fkCommentId}/${commentLikeUse.value.fkMemberId}`;
    // console.log(123)
    const response = await axios.delete(API_URL);
    console.log(response.data)
}





const decreamentCommentUnLike = async (index) =>  {
    commentPosts.value[index].unlikeCommentRecord = !commentPosts.value[index].unlikeCommentRecord;
    /* false->true */
    // console.log(commentPosts.value[index].unlikeCommentRecord);
    commentPosts.value[index].unlikeCount++;
    if (commentPosts.value[index].unlikeCommentRecord) {
        unPressCommentLike.value[index] = !unPressCommentLike.value[index];
    }
    const API_URL = `${URL}pages/ajax/commentsLikes`;
    commentLikeUse.value.likeOrUnlike = false;
    console.log(likeUse.value.fkMemberId);
    commentLikeUse.value.fkCommentId = commentPosts.value[index].fkCommentId;
    console.log(commentLikeUse.value.fkCommentId);
    const response = await axios.post(API_URL,commentLikeUse.value);
    console.log(response.data)
}
const cancelcommentUnlike = async (index) => {
    commentPosts.value[index].unlikeCommentRecord = !commentPosts.value[index].unlikeCommentRecord;
    commentPosts.value[index].unlikeCount--;
    if (!commentPosts.value[index].unlikeCommentRecord) {
        unPressCommentLike.value[index] = !unPressCommentLike.value[index];
    }
    commentLikeUse.value.fkCommentId = commentPosts.value[index].fkCommentId;
    console.log(commentLikeUse.value.fkMemberId);
    console.log(commentLikeUse.value.fkCommentId);
    const API_URL = `${URL}pages/ajax/commentDislike/${commentLikeUse.value.fkCommentId}/${commentLikeUse.value.fkMemberId}`;
    // console.log(123)
    const response = await axios.delete(API_URL);
    console.log(response.data)
}

loadPost();
loadCommentPosts();


</script>
    
<style scoped>
.custom-link {
  text-decoration: none;
}
.profile-picture img {
    width: 70px;
    /* 自定义宽度 */
    height: 70px;
    /* 自定义高度 */
    /* 可以添加其他样式属性，例如边框、边距等 */
}
.profile-picture-com img{
    width: 50px;
    /* 自定义宽度 */
    height: 50px;
}

.profile-picture img {
    object-fit: cover;
    /* 可以根据需要调整此值 */
}

.custom-image-size {
    width: 200px;
    height: 200px;
    object-fit: cover;
}

.like-color {
    color: blue;
}

.custom-image-size {
  border: 3px solid MediumTurquoise; /* 定義外框的樣式 */
  border-radius: 5px; /* 定義外框的圓角 */
  padding: 5px; /* 定義外框內的填充 */
}
</style>