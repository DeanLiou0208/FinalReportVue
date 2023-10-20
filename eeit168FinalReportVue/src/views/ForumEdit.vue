<template>
        <div class="row">
    <div class="col-3"></div>
    <div class="col-6">
      <div>
        <h3 style="text-align: center; font-weight: bold;">修改貼文</h3>
        <div class="mb-6">
          <label for="title">文章標题:</label><br />
          <input class="form-control" v-model="articlePost.title" type="text" id="title" placeholder="請輸入文章標題" required
            style="width: 500px;" />
        </div>
        <br />
        <label for="type">文章類型:</label> <br>
        <div class="col-md-4">
          <select class="form-select form-select-sm" v-model="articlePost.type" id="type" required>
            <option value="">請選擇文章類型</option>
            <option value="寵物協尋">寵物協尋</option>
            <option value="寵物用品">寵物用品</option>
            <option value="萌寵搞笑">萌寵搞笑</option>
            <option value="寵物飲食">寵物飲食</option>
            <option value="寵物美容">寵物美容</option>
            <option value="寵物訓練">寵物訓練</option>
            <option value="生活起居">生活起居</option>
          </select>
        </div>
        <br /><br />
        <div>
          <div>寵物物種:</div>
          <div class="form-check" >
            
            <input class="form-check-input" type="checkbox" value="1" id="1" name="species" v-model="speciesIdArray">
            <label class="form-check-label" for="狗狗家族">狗狗家族</label>
          </div>

          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="2" id="2" name="species" v-model="speciesIdArray" >
            <label class="form-check-label" for="貓貓家族">貓貓家族</label>
          </div>

          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="3" id="水族兩棲" name="species" v-model="speciesIdArray" >
            <label class="form-check-label" for="水族兩棲">水族兩棲</label>
          </div>

          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="4" id="鳥類家族" name="species" v-model="speciesIdArray" v-show="isSpecies" >
            <label class="form-check-label" for="鳥類家族">鳥類家族</label>
          </div>

          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="5" id="爬蟲家族" name="species" v-model="speciesIdArray"  >
            <label class="form-check-label" for="爬蟲家族">爬蟲家族</label>
          </div>

          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="6" id="小型動物" name="species" v-model="speciesIdArray"  >
            <label class="form-check-label" for="小型動物" >小型動物</label>
          </div>

          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="7" id="其他種類" name="species" v-model="speciesIdArray"  >
            <label class="form-check-label" for="其他種類">其他種類</label>
          </div>
        </div>
        <br />
        <label for="petArticleText">文章内容:</label><br />
        <textarea class="form-control" v-model="articlePost.petArticleText" id="petArticleText" rows="6" cols="70"
          @click="petText" required></textarea>
        <br />

        <div class="mb-3">
          <label for="formFileMultiple" class="form-label">上傳文章照片:</label>
          <input class="form-control" type="file" id="formFileMultiple" multiple>
        </div>

        <button type="button" class="btn btn-dark" @click="updateHandler">修改貼文</button>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import Swal from "sweetalert2";
const router = useRouter()
const route = useRoute()
const $cookies = inject("$cookies");
const post = ref({
  fkMemberId:localStorage.getItem("memberId"),
  // fkMemberId: $cookies.get("id"),
  title: null,
  type: null,
  speciesId: [], // 存储已选择的宠物物种
  petArticleText: null
  // images: [] // 存储上传的图片路径
});
const articlePost = ref([]);
const datas = ref({
    fkMemberId: $cookies.get("id"),
    // petArticleId: articleId,
    // petArticleId: 10,
    // id :route.params.id,
})
const file = new FormData();
const fileInput = ref(null);
const speciesIdArray = ref([])

onMounted(() => {
  fileInput.value = document.getElementById('formFileMultiple');
  loadData(); 
})
// const petArticleId = route.params.id
const isSpecies = ref(true)
const URL = import.meta.env.VITE_API_JAVAURL;
const loadData = async () => { 
    const id = route.params.id
    const API_URL = `${URL}pages/ajax/findByPetArticleId/${id}`;
    const response = await axios.get(API_URL);
    articlePost.value = response.data;

    console.log(articlePost.value.speciesId)
    // const parsedArray = JSON.parse(articlePost.value.speciesId);
    speciesIdArray.value = articlePost.value.speciesId.map(item => item.speciesId);

    console.log(articlePost.value.speciesId[0].speciesId)
    console.log(articlePost.value)
    

   


}
// const isSpecies = ref(false)
// if(response.value.speciesId===6){
//   isSpecies.value =true ;
// }

const updateHandler = async() => {
  const API_URL = `${URL}pages/ajax/petArticleModify`;
  console.log(articlePost.value.speciesId)
  articlePost.value.speciesId = speciesIdArray.value
  console.log(articlePost.value.speciesId)
  const json = JSON.stringify(articlePost.value);
  console.log("json:"+json)
  if (fileInput.value && fileInput.value.files.length > 0) {
    // 添加所有文件到 FormData 对象中
    for (let i = 0; i < fileInput.value.files.length; i++) {
      file.append(`files`, fileInput.value.files[i]);

    }
  }
  file.append('body', json);


  const response = await axios.put(API_URL, file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },

  })
  if (response.data.success) {
    Swal.fire({
      icon: "success",
      title: "文章修改成功!"
    });
    router.push('/forumpostbymember');

  } else {
    Swal.fire({
      icon: "error",
      title: "文章修改失敗!",
    });

  }
}


loadData(); 




</script>
    
<style>
    
</style>