<template>
  <div class="login">
    <div id="account">
      帳號：<input type="text" id="accountInput" />
      <!-- onblur="checkAccount()" -->
      <div id="responseAccount"></div>
    </div>

    <div id="password">
      密碼：<input type="password" id="passwordInput" />
      <!-- onblur="checkPassword()" -->
      <div id="responsePassword"></div>
    </div>

    <div id="captcha">
      <div id="icon"><i class="fas fa-check" style="color: #4fa81f"></i></div>
      <div id="handle">
        <span></span>
      </div>
    </div>

    <div id="responseMessage"></div>

    <div><button id="submit" @click="submit">送出</button></div>
  </div>
</template>

<script>
import { ref, onMounted, inject } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  setup() {
    const shouldMove = ref(false);
    const pass = ref(false);
    const $cookies = inject("$cookies"); // 注入$cookies
    const URL = import.meta.env.VITE_API_JAVAURL;
    const backgroundUrls = [
      "url(https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2700&q=80)",
      "url(https://pic.pimg.tw/juojou/1502296015-3046965360.png)",
      "url(https://cdn.pixabay.com/photo/2023/09/30/05/06/mallard-8284909_1280.jpg)",
      "url(https://cdn.pixabay.com/photo/2023/08/08/15/37/landscape-8177622_1280.jpg)",
      "url(https://cdn.pixabay.com/photo/2023/08/11/08/11/cold-8183087_1280.jpg)",
      "url(https://cdn.pixabay.com/photo/2018/04/20/09/49/sky-3335585_1280.jpg)",
      "url(https://cdn.pixabay.com/photo/2023/05/21/16/03/mosque-8008801_1280.png)",
      "url(https://cdn.pixabay.com/photo/2023/05/14/17/46/ducklings-7993465_1280.jpg)",
      "url(https://cdn.pixabay.com/photo/2023/08/30/12/37/leaves-8223213_1280.jpg)",
      "url(https://cdn.pixabay.com/photo/2023/07/08/11/40/cows-8114279_1280.jpg)",
      // 添加更多URL
    ];

    const submit = () => {
      if (pass.value) {
        const account = document.getElementById("accountInput").value;
        const password = document.getElementById("passwordInput").value;
        const responseMessage = document.getElementById("responseMessage");

        axios
          .post(`${URL}pet_web/login/login`, {
            account: account,
            password: password,
          })
          .then((response) => {
            console.log(response.data);
            // alert(response.data.message);
            console.log(response.data.success);
            // responseMessage.innerHTML = response.data.message;
            if (response.data.success) {
              // alert(response.data.message);
              Swal.fire({
                title: response.data.message,
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  console.log(123);
                  $cookies.set("id", response.data.id);
                  $cookies.set("account", response.data.account);
                  $cookies.set("username", response.data.username);
                  $cookies.set("identity", response.data.identity);
                  localStorage.setItem("img", response.data.img);
                  console.log($cookies.get("id"));
                  console.log($cookies.get("account"));
                  console.log($cookies.get("shopname"));
                  console.log($cookies.get("identity"));
                  window.location.href = "/cominformation";
                }
              });
            } else {
              Swal.fire({
                title: response.data.message,
                icon: "error",
              });
              pass.value = false;
              const randomBackgroundElement =
                document.getElementById("captcha"); // 选择id为captcha的元素

              // 从数组中选择一个随机URL
              const randomUrl =
                backgroundUrls[
                  Math.floor(Math.random() * backgroundUrls.length)
                ];

              // 将随机URL应用为背景图像
              randomBackgroundElement.style.backgroundImage = randomUrl;
              captcha.classList.remove("passed");
              document
                .querySelector("#captcha")
                .style.setProperty("--moved", "0px");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "請先完成拼圖",
        });
      }
    };

    onMounted(() => {
      const captcha = document.querySelector("#captcha");
      const handle = document.querySelector("#handle");
      const button = document.querySelector("#handle span");

      const randomBackgroundElement = document.getElementById("captcha"); // 选择id为captcha的元素

      // 从数组中选择一个随机URL
      const randomUrl =
        backgroundUrls[Math.floor(Math.random() * backgroundUrls.length)];

      // 将随机URL应用为背景图像
      randomBackgroundElement.style.backgroundImage = randomUrl;

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
          if (finalOffset >= 405 && finalOffset <= 425) {
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

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  flex-direction: column;
}

#captcha {
  --width: 400px;
  --height: 260px;
  --puzzle-width: 40px;
  --puzzle-height: 40px;
  --offset-left: var(--width) * -1;
  --moved: 0px;

  display: block;
  width: var(--width);
  height: var(--height);
  border-radius: 4px;
  /* background-image: url(https://cdn.pixabay.com/photo/2018/04/20/09/49/sky-3335585_1280.jpg); */
  background-size: cover;
  background-position: center;
  position: absolute;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  margin-right: 20px;
  top: 50%;
  left: 35%;
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
  top: calc(100% + 250px); /* 放在 #handle 下方并留出一些间距 */
  left: 50%;
  transform: translateX(-50%); /* 水平居中 */
  display: none;
}

#captcha.passed #icon {
  display: block; /* 在验证通过时显示图标 */
}

#account {
  position: absolute;
  top: 40%; /* 调整垂直位置，可以根据需要修改 */
  left: 35%;
  width: auto; /* 添加这行来设置宽度 */
}

#password {
  position: absolute;
  top: 50%; /* 调整垂直位置，可以根据需要修改 */
  left: 35%;
  width: auto; /* 添加这行来设置宽度 */
}
#submit {
  position: absolute;
  top: 104%; /* 调整垂直位置，可以根据需要修改 */
  right: 25%;
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
#passwordInput,
#accountInput {
  width: 350px;
}
</style>
