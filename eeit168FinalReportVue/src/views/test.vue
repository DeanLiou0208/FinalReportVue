<template>
    <div>
      <input type="file" @change="handleFileUpload" accept="image/*">
      <img class="size" v-if="imageData" :src="imageData" alt="Preview">
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        imageFile: null,
        imageData: null,
      };
    },
    methods: {
      handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
          this.imageFile = file;
          this.previewImage();
        }
      },
      previewImage() {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imageData = event.target.result;
        };
        reader.readAsDataURL(this.imageFile);
      },
    },
  };
  </script>

  <style scoped>
    .size{
        width: 100px;
        height: 100px;
    }

</style>