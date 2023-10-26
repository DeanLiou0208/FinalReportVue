<template>
    <!-- <div class="container" id="shoppingCartnull" v-if="shoppingCartNull">
        <img src="../assets/img/shoppingCart/empty-cart.png" alt="">
        <br>
        <h5>您的購物車還是空的.....</h5>
        <br>
        <a href="" type="button" class="btn btn-success"> 去賣場逛逛</a>
    </div> -->

    <div class="container" id="shoppingCartnull" >
        <div>
        <h3>購物車</h3>
        </div>
        <hr>
        <table class="table">
        <thead>
            <tr>
            <th scope="col">選取</th>
            <th scope="col">產品圖片</th>
            <th scope="col">產品名稱</th>
            <th scope="col">單價</th>
            <th scope="col">數量</th>
            <th scope="col">總計</th>
            <th scope="col">操作</th>
            </tr>
        </thead>
        <tbody >
            <tr class="shoppingItems" v-for="{id, name,price,count,img} in shoppingCartItems" :key="id">
                <td>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="flexCheckDefault" :value="id" v-model="selectedItems" @change="handleCheckboxChange">
                    </div>
                </td>
                <td><img :src="`${img}`" alt="" style="height: 100px;"></td>
                <td>{{name}}</td>
                <td>{{price}}</td>
                <td>
                
                    <div class="container ml-3 " style="display: flex;">
                        <a type="button" @click="decrementCounting(id)"><img src="../assets/img/minus.png" alt="-">&nbsp&nbsp</a>         
                    <div >
                        <input type="text" :value="`${count}`" style="height: 30px; width:50px; text-align: center; border: 2px solid black;" >
                    </div>
                        <a type="button" @click="incrementCounting(id)">&nbsp&nbsp<img src="../assets/img/plus.png" alt="+"></a>  
                    </div>
                
                </td>
                <td>{{price*count}}</td>
                <td><a href="#" type="button" class="btn btn-danger" @click="confirmDelete"><i class="bi bi-trash"></i></a></td>
            </tr>
        </tbody>
        </table>
        <hr>
        <div class="shoppingcart-footer">
        <div class="shoppingcart-footer">
            <h5 style="color: red">總計:&nbsp$</h5>&nbsp
            <h5 class="card-price" style="color: red" >{{ allPrice }}</h5>
        </div>
        &nbsp&nbsp
        <div class="shoppingcart-footer" @click="datajson">
            <!-- <router-link to="/payment"> -->
            <a href="#" type="button" class="btn btn-success" > 去買單</a>
            <!-- </router-link> -->
        </div>
        </div>
    </div>



</template>

<script setup>
    import {ref, reactive , inject, onMounted,watch} from "vue"
    import { ElMessage  } from 'element-plus'
    import Swal from "sweetalert2";
    import axios from "axios";
    import router from "../router";

    // const shoppingCartNull = ref(true); //判斷v-if &v-else
    const shoppingCartItems = ref([]);
    const $cookies = inject("$cookies");
    const allPrice = ref(0);//計數
    const returnId = ref(null);//接住點擊的id
    const idPackage = ref([]);//勾選check的時候 計入每組的{id : }
    const selectedItems = ref([])//觸發checkbox的時候紀錄
    const productList =ref([])

    //刪除的時候使用的ID
    const forDeleteJson = reactive({
        id : 0,
        fkMemberId :  parseInt($cookies.get("id"))
    });
    const forUpdataJson = reactive({
        id : 0,
        count : 0
    })
    //會員資料撈取
    const whoShoppingCart = reactive({
        fkMemberId : $cookies.get("id"),
    });
    //結帳時候傳出去的資料
    const payMent = reactive({
        fkMemberId : parseInt($cookies.get("id")),
        totalPrice : 0,
        bonus : null,
        productList : productList.value
    })
    //checkbox取得ID
    const handleCheckboxChange =async (event) =>{
        const itemId = event.target.value;
        console.log('Checkbox changed for id:', event.target.value);
        returnId.value = itemId;
        forDeleteJson.id = parseInt(itemId);
        forUpdataJson.id = parseInt(itemId);
        const itemObject = { id: parseInt(itemId) };
        idPackage.value.push(itemObject);
        // console.log(returnId.value);//接住點擊的id
        // console.log(forDeleteJson)//刪除的時候使用的ID
        // console.log(selectedItems.value)//觸發checkbox的時候紀錄
        // console.log(idPackage.value)//勾選check的時候 計入每組的{id : }
        totalPrice();
    }
    // 總金額
    const totalPrice = async()=>{
        let price = 0;
        // console.log(1)
        if(selectedItems.value.length != 0){
            for(const id of selectedItems.value){
                // console.log(id)
                const item = shoppingCartItems.value.find(item => item.id === id);
                price += item.price * item.count;
                allPrice.value = price;
                // console.log(price)
            }
        } else{
        allPrice.value= 0;
        }
        // console.log(allPrice.value)
        }
    //減count
    const decrementCounting = async(id)=>{
        const item = shoppingCartItems.value.find(item => item.id === id);
            if (item && item.count > 0) {
            item.count--;
            }
            forUpdataJson.count = parseInt(item.count)
            shoppingCartUpdate();
            // console.log(forUpdataJson)
    }
    //加count
    const incrementCounting = async(id) =>{
        const item = shoppingCartItems.value.find(item => item.id === id);
            if (item) {
            item.count++;
            }
            forUpdataJson.count = parseInt(item.count)
            shoppingCartUpdate();   
    }
    //確認購物車是否是空的
    // const checkShoppingCart = async () =>{    
    //     if(shoppingCartItems.value.length === 0 ){
    //         shoppingCartNull.value = false;
    //         console.log(shoppingCartNull.value);
    //         // console.log(1);
    //     }else{
    //         shoppingCartNull.value = true;
    //         console.log(shoppingCartNull.value);
    //     }
    // }
    // loadshoppingcart
    const URL = import.meta.env.VITE_API_JAVAURL;
    const URLFINDCART = `${URL}member/shoppingcart`
    const loadShoppingCart = async()=>{
        const response = await axios.post(URLFINDCART,whoShoppingCart)
        shoppingCartItems.value = response.data;
        // console.log(response.data)
        // console.log(shoppingCartItems)
    }
    //confirmDelete
    const confirmDelete = async() =>{
        const result = await Swal.fire({
            title: '確定要將此筆清單移除嗎?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor : '#3085d6',
            confirmButtonText : '確認移除!',
            cancelButtonColor : '#d33',
            cancelButtonText : '取消'
        });
        if(result.isConfirmed){
            await shoppingCartRemove();
            loadShoppingCart();
        }
    }
    //removeshoppingcart
    const URLREMOVE = `${URL}member/shoppingCartRemove`
    const shoppingCartRemove = async() =>{
        const response = await axios.post(URLREMOVE, forDeleteJson)
        console.log(response.data);
        if(response.data.message === "刪除成功"){
            Swal.fire({
                icon : "success",
                title : "刪除成功!"
            })
            selectedItems.value = [];
            allPrice.value = 0;
            loadShoppingCart();

        }else{
            Swal.fire({
                icon : "error",
                title : "刪除失敗,請選擇要刪除的品項!"
            })
            loadShoppingCart();
        }
        loadShoppingCart();
    }
    //updateshoppingcart
    const URLUPDATE = `${URL}member/shoppingcartupdate`
    const shoppingCartUpdate = async()=>{
        const response = await axios.put(URLUPDATE, forUpdataJson)
        console.log(response.data)
        if(response.data.message ==="購物車不存在"){
            ElMessage({
                message: '請先點選修改商品!',
                type: 'warning',
            })
            loadShoppingCart();
            
        }
        else if(response.data.message ==="修改成功"){
                ElMessage({
                    message: '修改完成!',
                    type: 'success',
            })
            totalPrice();
            loadShoppingCart();
            }
    }
    const URLPAYMENT = `${URL}shoppingcart/payment`
    const datajson = async()=>{
        for(const id  of selectedItems.value){
                console.log(shoppingCartItems)
                const item = shoppingCartItems.value.find(item => item.id === id); 
                // console.log(item)
                payMent.totalPrice = allPrice.value
                const itemObject = {id : item.id, productId : parseInt(item.productId) ,count : item.count, shopName:item.shopName, price : item.price, name : item.name};
                // console.log(itemObject)
                payMent.productList.push(itemObject);         
        }
        console.log(payMent)
        $cookies.set("payment",payMent)
        // const response = await axios.post(URLPAYMENT, payMent)
        router.push("/payment")
        // document.location.href = "/payment"
        // console.log(response.data)

    }
    


    watch(
        ()=>selectedItems.value,
        (newValue, oldValue)=>{
            if(newValue != oldValue){
                totalPrice();
            }
        }
    )
        loadShoppingCart();
</script>
    
<style scoped>
    #shoppingCartnull{
        display: flex;
        justify-content: center; /* 水平居中 */
        align-items: center; /* 垂直居中 */
        flex-direction :column   
    }
    .shoppingcart-footer{
        display: flex;
        justify-content: center; /* 水平居中 */
        align-items: center; /* 垂直居中 */
    }
</style>
