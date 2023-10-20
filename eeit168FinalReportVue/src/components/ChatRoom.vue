<template>
    <span>萌寵照片</span>
    <el-button type="primary" style="margin-left: 16px" @click="drawer = true">
      聊天室
    </el-button>

  <el-drawer v-model="drawer" title="I am the title" :with-header="false">

    <div>YOU : {{ fromUserName }}</div>
    <br>
    <div>
      <label>傳給 : </label>
      <input type="text" v-model="toUserName">
    </div>
    <br>
    <div>
      <label>訊息 : </label>
      <input type="text" v-model="newMessage">
    </div>
    <br>
    <div>
      <button @click="sendMessage">送出</button>
    </div>
    <br>
    <!-- <div>我傳給:{{ toUserName }}</div>
    <div>我的訊息:{{ newMessage }}</div> -->
    <!-- <div>來源:{{ sourceId }}</div>
    <div>訊息:{{ SourceMessage }}</div> -->

    <!-- <button @click="loadMessage">加載紀錄</button> -->
    <br>
    <div class="message-list">
    <div v-for="message in messages" :key="message.id">
      {{ message.sender }}: {{ message.text }}
    </div>
  </div>
  </el-drawer>


  <!-- 身分
  <input type="text" v-model="toIdentity"> -->
  
  
</template>

<script>
import axios from "axios";

    export default {
        data() {
            return {
              memberId :'1',
              URL : import.meta.env.VITE_API_JAVAURL,
              toUserName : "",
              fromId : this.$cookies.get("id"),
              identity :this.$cookies.get("identity"),
              fromIdentity : "",
              fromUserName : this.$cookies.get("username"),
              toIdentity : "member",
              sourceId : "",
              SourceMessage : "",

              messages: [], // 用于存储聊天消息记录的数组
              newMessage: '', // 用于输入新消息的文本框

              drawer : false,
            }
        },
        created() { // 页面创建生命周期函数
              if(this.identity==="會員"){
                this.fromIdentity = "member";
              }else if(this.identity==="廠商"){
                this.fromIdentity = "company";
              }else{
                this.fromIdentity = "";
              }
              this.initWebSocket()
        },
        destroyed: function () { // 离开页面生命周期函数
              this.websocketclose();
        },
        methods: {
            collapse: function(){
                this.isCollapse = !this.isCollapse;
                if (this.isCollapse) {
                    this.iconClass = "cebianlanzhankai";
                } else{
                    this.iconClass = "cebianlanshouhui";
                }
            },
            initWebSocket: function () {
                // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
                const url = "ws://localhost:8080/websocket/"+this.fromUserName;
                this.websock = new WebSocket(url);
                this.websock.onopen = this.websocketonopen;
                this.websock.onerror = this.websocketonerror;
                   this.websock.onmessage = this.websocketonmessage;
                this.websock.onclose = this.websocketclose;
              },
              websocketonopen: function () {
                console.log("WebSocket连接成功");
              },
              websocketonerror: function (e) {
                console.log("WebSocket连接发生错误");
              },
              websocketonmessage: function (e) {
                console.log(e.data)
                var da = JSON.parse(e.data);
                console.log(da);
                this.sourceId = da.fromConnectId;
                this.SourceMessage = da.message;
                this.messages.push({ text: this.SourceMessage, sender: this.sourceId });
                localStorage.setItem('chatMessages', JSON.stringify(this.messages));
                // this.message = da;
              },
              websocketclose: function (e) {
                console.log("connection closed (" + e.code + ")");
              },
              // connect: function(){
              //   this.initWebSocket();
              // },
              sendMessage : function(){
                this.messages.push({ text: this.newMessage, sender: 'Me' });
                // this.newMessage = '';
                localStorage.setItem('chatMessages', JSON.stringify(this.messages));
                // this.newMessage = '';

                //傳訊息給某人
                axios
                  .post(`${this.URL}api/sendOneWebSocket`, {
                    toConnectId : this.toUserName,
                    fromIdentity : this.fromIdentity,
                    fromUserName :  this.fromUserName,
                    text : this.newMessage,
                  },{
                    withCredentials: true,
                  } )
                  .then((response) => {
                    console.log(response.data);
                  })
                  .catch((error) => {
                    console.error(error);
                  });

                this.newMessage = '';
              },
              loadMessage : function(){
                const savedMessages = localStorage.getItem('chatMessages');
                if (savedMessages) {
                  this.messages = JSON.parse(savedMessages);
                }
              }
        }
    }
</script>
<style scoped>
span{
  font-size: 36px; /* 设置字体大小 */
  justify-content: left;
}
</style>