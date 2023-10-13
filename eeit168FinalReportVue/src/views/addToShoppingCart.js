import axios from "axios";
import { $cookies, addShopCart, fkMemberId, productId, counting, URLADDSHOPPINGCART } from "./ProductPage.vue";

//將產品新增到購物車的判斷以及動作
export const addToShoppingCart = async () => {
if ($cookies.get("identity") != null) {
if ($cookies.get("identity") === "會員") {
if ($cookies.get("fkMemberId") != null) {
// console.log($cookies.get("fkMemberId"))
addShopCart.fkMemberId = fkMemberId.value;
addShopCart.fkProductId = productId;
addShopCart.count = counting.value;
console.log(addShopCart);
if (addShopCart.count == 0) {
$('#successAlert').alert();
} else {
const response = await axios.put(URLADDSHOPPINGCART, addShopCart);
console.log(response);
alert("新增成功!!");
}
} else {
alert("查無此帳號~");
}
} else {
alert("請使用非廠商帳號登入~");
}
} else {
alert("請先登入~");
}
};
