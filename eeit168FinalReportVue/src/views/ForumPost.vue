<template>
    <div class="row">
    <div class="col-3"></div>
    <div class="col-6">
    <div>
    <h3 style="text-align: center;">建立貼文</h3>
      <div class="mb-3">
      <label for="title" >標题:</label>
      <input v-model="post.title" type="text" id="title" placeholder="請輸入文章標題" required />
      </div>
       <label for="type">文章類型:</label> <br>
       <select v-model="post.type" id="type" required>
        <option value="" >請選擇文章類型</option>
        <option value="寵物協尋">寵物協尋</option>
        <option value="寵物用品">寵物用品</option>
        <option value="萌寵搞笑">萌寵搞笑</option>
        <option value="寵物飲食">寵物飲食</option>
        <option value="寵物美容">寵物美容</option>
        <option value="寵物訓練">寵物訓練</option>
        <option value="生活起居">生活起居</option>
      </select>
      <br /><br />
    <div>
    <div>寵物物種:</div>

    <!-- <div v-for="item in speciesOptions" :key="item.value" class="form-check">
            <input class="form-check-input" type="checkbox" :value="item.value" :id="item.label" v-model="speciesId">
            <label class="form-check-label" :for="item.label">{{ item.label }}</label>
    </div> -->
    <div class="form-check">
    <input class="form-check-input" type="checkbox" value="1" id="1" name="species" v-model="post.speciesId">
    <label class="form-check-label" for="狗狗家族">狗狗家族</label>
    </div>
    
    <div class="form-check">
    <input class="form-check-input" type="checkbox" value="2" id="2" name="species" v-model="post.speciesId">
    <label class="form-check-label" for="貓貓家族">貓貓家族</label>
    </div>

    <div class="form-check">
    <input class="form-check-input" type="checkbox" value="3" id="水族兩棲" name="species" v-model="post.speciesId">
    <label class="form-check-label" for="水族兩棲">水族兩棲</label>
    </div>

    <div class="form-check">
    <input class="form-check-input" type="checkbox" value="4" id="鳥類家族"  name="species" v-model="post.speciesId">
    <label class="form-check-label" for="鳥類家族">鳥類家族</label>
    </div>

    <div class="form-check">
    <input class="form-check-input" type="checkbox" value="5" id="爬蟲家族" name="species" v-model="post.speciesId">
    <label class="form-check-label" for="爬蟲家族">爬蟲家族</label>
    </div>

    <div class="form-check">
    <input class="form-check-input" type="checkbox" value="6" id="小型動物" name="species" v-model="post.speciesId">
    <label class="form-check-label" for="小型動物">小型動物</label>
    </div>

    <div class="form-check">
    <input class="form-check-input" type="checkbox" value="7" id="其他種類" name="species" v-model="post.speciesId">
    <label class="form-check-label" for="其他種類">其他種類</label>
    </div>
  
  </div>
  <br /><br />

      <label for="petArticleText">文章内容:</label><br />
      <textarea v-model="post.petArticleText" id="petArticleText" rows="4" cols="50" @click="petText" required></textarea>
      <br /><br />

    <div class="mb-3">
    <label for="formFileMultiple" class="form-label">上傳文章照片:</label>
    <input class="form-control" type="file" id="formFileMultiple" multiple>
    </div>

      <!-- 显示上传的图片  -->
      <!-- <div v-for="(img, index) in post.img" :key="index">
        <img :src="img" alt="Uploaded Image" width="100" />
      </div> -->

      <button type="button"  @click="postHandler">發佈貼文</button>
    </div>
  <div class="col-3"></div>
  </div>
  </div>
</template>
    
<script setup>
    import { ref,onMounted, inject } from 'vue';
    import axios from 'axios';
    import { useRouter } from 'vue-router';
   
    // const checkedNames = ref([]);
    
    const router = useRouter()
    const $cookies = inject("$cookies");
    const post = ref({
      fkMemberId: 2,
      title:null,
      type:null,
      speciesId:[], // 存储已选择的宠物物种
      petArticleText:null
      // images: [] // 存储上传的图片路径
    });
    const file = new FormData();
    const fileInput = ref(null);
    onMounted(()=>{
      fileInput.value = document.getElementById('formFileMultiple');
    })
     const URL = import.meta.env.VITE_API_JAVAURL;
     
     const postHandler = async () => {
      
     const API_URL = `${import.meta.env.VITE_API_JAVAURL}pages/ajax/petArticleCreate`
     const json = JSON.stringify(post.value);
     if (fileInput.value && fileInput.value.files.length > 0) {
    // 添加所有文件到 FormData 对象中
    for (let i = 0; i < fileInput.value.files.length; i++) {
      file.append(`files`, fileInput.value.files[i]);
      
    }
  }
     file.append('body',json);

    const response = await axios.post(API_URL, file,{
      headers:{
        'Content-Type': 'multipart/form-data',
      },    
    })
    if (response.data.success) {
        alert(response.data.message)
        
    }else{
      alert(response.data.message)
    }
    
   
  }
 

</script>
    
<style>
    
</style>