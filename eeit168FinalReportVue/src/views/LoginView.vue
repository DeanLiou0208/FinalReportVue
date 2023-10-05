<template>
  <div class="login" >
    
    <div id="account" >
      帳號：<input type="text" id="accountInput" />
      <!-- onblur="checkAccount()" -->
      <div id="responseAccount"></div>
    </div>

    <div id="password" >
      密碼：<input type="password" id="passwordInput" />
      <!-- onblur="checkPassword()" -->
      <div id="responsePassword"></div>
    </div>

    <div id="captcha" >
      <div id="icon"><i class="fas fa-check" style="color: #4fa81f"></i></div>
      <div id="handle">
        <span></span>
      </div>
    </div>

    <div id="responseMessage" ></div>

    <div><button id="submit" @click="submit">送出</button></div>
  
  </div>
</template>

<script >
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const shouldMove = ref(false);
    const pass = ref(false);

    const submit = () => {
      if (pass.value) {
        const account = document.getElementById("accountInput").value;
        const password = document.getElementById("passwordInput").value;
        const responseMessage = document.getElementById("responseMessage");

        axios
          .post("http://localhost:8080/pet_web/login/login", {
            account: account,
            password: password,
          })
          .then((response) => {
            console.log(response.data);
            responseMessage.innerHTML = response.data.message;
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        alert("請完成拼圖");
      }
    };

    onMounted(() => {
      const captcha = document.querySelector("#captcha");
      const handle = document.querySelector("#handle");
      const button = document.querySelector("#handle span");

      button.addEventListener("mousedown", (e) => {
        shouldMove.value = true;
      });

      window.addEventListener("mousemove", (e) => {
        if (shouldMove.value) {
          const offsetLeft = handle.getBoundingClientRect().left;
          const buttonWidth = button.getBoundingClientRect().width;

          captcha.style.setProperty(
            "--moved",
            `${e.clientX - offsetLeft - buttonWidth / 2}px`
          );
        }
      });

      window.addEventListener("mouseup", (e) => {
        if (shouldMove.value) {
          const finalOffset = e.clientX - handle.getBoundingClientRect().left;
          console.log(finalOffset);
          if (finalOffset >= 210 && finalOffset <= 230) {
            captcha.classList.add("passed");
            pass.value = true;
          } else {
            captcha.style.setProperty("--moved", "0px");
          }
          shouldMove.value = false;
        }
      });
    });

    return {
      shouldMove,
      pass,
      submit,
    };
  },
};
</script>

<style>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
}


#captcha {
  --width: 200px;
  --height: 130px;
  --puzzle-width: 40px;
  --puzzle-height: 40px;
  --offset-left: var(--width) * -1;
  --moved: 0px;

  display: block;
  width: var(--width);
  height: var(--height);
  border-radius: 4px;
  background-image: url(https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2700&q=80);
  background-size: cover;
  background-position: center;
  position: absolute;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  margin-right: 20px;
  top: 40%;
  right: 3%; 
}

#captcha::before,
#captcha::after {
  position: absolute;
  content: "";
  display: block;
  width: inherit;
  height: inherit;
  background-image: inherit;
  background-size: inherit;
  background-position: inherit;

  clip-path: inset(
    calc((var(--height) - var(--puzzle-height)) / 2) /* 90px */
      var(--puzzle-width) /* 90px */
      calc((var(--height) - var(--puzzle-height)) / 2) /* 90px */
      calc(var(--width) - var(--puzzle-width) * 2) /* 230px */
  );
  -webkit-clip-path: inset(
    calc((var(--height) - var(--puzzle-height)) / 2) /* 90px */
      var(--puzzle-width) /* 90px */
      calc((var(--height) - var(--puzzle-height)) / 2) /* 90px */
      calc(var(--width) - var(--puzzle-width) * 2) /* 230px */
  );
}

#captcha::after {
  transform: translatex(
    clamp(
      calc(var(--width) * -1),
      calc((var(--width) * -1) + var(--moved)),
      calc(var(--puzzle-width))
    )
  );
  transition: 0.25s all ease-in-out;
}

#captcha:active::after {
  transition: none;
}

#captcha::before {
  background-color: rgba(0, 0, 0, 0.6);
  background-blend-mode: multiply;
}

#handle {
  width: calc(var(--width) + var(--puzzle-width) * 2);
  height: 30px;
  border-radius: 18px;
  background-color: #eee;
  position: absolute;
  bottom: -50px;
  left: calc(var(--puzzle-width) * 2 * -1);
  box-shadow: inset 0px 0px 12px rgba(0, 0, 0, 0.2);
  border: 3px solid #ccc;
}

#handle span {
  display: block;
  width: 30px; /* 拖曳按鈕的寬度 */
  height: 23px; /* 拖曳按鈕的高度 */
  border-radius: inherit;
  background-color: #fff;
  box-shadow: inset 0px 0px 6px rgba(0, 0, 0, 0.25),
    0px 2px 4px rgba(0, 0, 0, 0.3);
  position: absolute;
  cursor: move;
  transform: translatex(
    clamp(0px, var(--moved), calc(var(--width) + var(--puzzle-width)))
  );

  transition: 0.25s all ease-in-out;
}

#captcha:active #handle span {
  transition: none;
}

#captcha.passed::before,
#captcha.passed::after,
#captcha.passed #handle {
  opacity: 0;
}

#captcha {
  margin-left: auto;
  margin-top: 5%;
  margin-right: 50%; /* 设置右侧外边距，例如 20px */
}

#icon {
  position: absolute;
  top: calc(100% + 10px); /* 放在 #handle 下方并留出一些间距 */
  left: 50%;
  transform: translateX(-50%); /* 水平居中 */
  display: none;
}

#captcha.passed #icon {
  display: block; /* 在验证通过时显示图标 */
}

#account {
  position: absolute;
  top: 25%; /* 调整垂直位置，可以根据需要修改 */
  right: 50%;
  width: 250px; /* 添加这行来设置宽度 */
}

#password {
  position: absolute;
  top: 40%; /* 调整垂直位置，可以根据需要修改 */
  right: 50%;
  width: 250px; /* 添加这行来设置宽度 */
}
#submit {
  position: absolute;
  top: 110%; /* 调整垂直位置，可以根据需要修改 */
  right: 55%;
}
#responseMessage {
  position: absolute;
  top: 65%; /* 调整垂直位置，可以根据需要修改 */
  right: 3%;
}
#responseAccount,
#responsePassword {
  color: red;
  font-size: 5px;
}

</style>
