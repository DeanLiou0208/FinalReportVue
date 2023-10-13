<template>
    <div>
        <div class="box">
            <input type="text" v-model="inputCode" placeholder="請輸入驗證碼,不分大小寫" @blur="validateOnBlur" />
            <p @click="createCode" :style="codeStyle">{{ code }}</p>
            <a href="#" @click.prevent="createCode" id="recode">更新驗證碼</a>
        </div>
        <p id="verify_code" :style="verifyCodeStyle">{{ verifyCodeMessage }}</p>

        <button @click="validateCode" v-if="showValidateButton">驗證</button>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            code: "",
            inputCode: "",
            codeStyle: {},
            fontColor: ["blue", "yellow", "red"],
            bgColor: ["yellow", "red", "blue"],
            ls: ["5px", "5px", "5px"],
            verifyCodeMessage: "",
            verifyCodeStyle: {},
            showValidateButton: false, // 新增的变量，控制按钮显示
        };
    },
    methods: {
        randColor() {
            return Math.floor(Math.random() * this.fontColor.length);
        },
        createCode() {
            const ci = this.randColor();
            this.codeStyle = {
                color: this.fontColor[ci],
                backgroundColor: this.bgColor[ci],
                letterSpacing: this.ls[ci],
                fontFamily: "Arial",
                fontStyle: "italic",
                fontWeight: "bold",
                border: "0",
                padding: "4px",
                width: "120px",
                height: "25px",
                textAlign: "center",
                cursor: "pointer",
            };
            this.code = "";
            const codeLength = 6;
            const random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            for (let i = 0; i < codeLength; i++) {
                const index = Math.floor(Math.random() * 10);
                this.code += random[index];
            }
            console.log(this.code);
            // 重新生成验证码时隐藏验证按钮
            this.showValidateButton = false;
        },
        validateCode() {
            const inputCode = this.inputCode.toUpperCase();
            if (inputCode.length <= 0) {
                alert("請輸入驗證碼！");
            } else if (inputCode !== this.code) {
                alert("驗證碼輸入錯誤！@_@");
                this.createCode();
                this.inputCode = "";
            } else {
                alert("^-^");
                this.createCode();
                this.inputCode = "";
            }
        },
        validateOnBlur() {
            const inputCode = this.inputCode.toUpperCase();
            if (inputCode.length <= 0) {
                this.verifyCodeMessage = "";
                this.verifyCodeStyle = {};
                // 验证码不正确时隐藏验证按钮
                this.showValidateButton = false;
            } else if (inputCode !== this.code) {
                this.verifyCodeMessage = "驗證碼錯誤";
                this.verifyCodeStyle = { color: "#FF435E" };
                // 验证码不正确时隐藏验证按钮
                this.showValidateButton = false;
            } else {
                this.verifyCodeMessage = "驗證碼正確";
                this.verifyCodeStyle = { color: "#393939" };
                // 验证码正确时显示验证按钮
                this.showValidateButton = true;
            }
        },
    },
    mounted() {
        this.createCode();
    },
};
</script>
  
<style scoped>
/* div {
    margin: 0px auto;
    width: 300px;
    height: 250px;
    border: 5px #FFAC55 solid;
    padding: 10px;
  } */
.box {
    display: flex;
    justify-content: space-between;
}
</style>
  