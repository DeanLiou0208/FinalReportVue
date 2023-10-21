<template>
      <h4>消費者輪廓與訂單狀態</h4>
      <div class="container " style="display: flex;">
        <v-chart class="chart" :option="option" autoresize />
      &nbsp&nbsp
        <v-chart class="chart" :option="option2" autoresize></v-chart>
      </div>
        <br>
        <hr>
      <h4>商品銷售統計</h4>
      <div class="container " style="display: flex;">
        <v-chart class="chart" :option="barOption" autoresize></v-chart>
      </div>
      <br>
      <hr>
      <div class="container " >
        <h4>商品總覽</h4>
        <div class="accordion" id="accordionExample">
          <div class="accordion-item" v-for="{productId, name , quantity,index} in shopProductCount" :key="index">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                產品編號&nbsp:&nbspG20231019N{{productId}}
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div class="accordion-body">
                商品名稱&nbsp:&nbsp {{ name }} <br> 總計銷售&nbsp:&nbsp{{ quantity }}
              </div>
            </div>
          </div>
        </div>
      </div>


</template>
    
<script setup>

import { ref, provide , reactive , inject} from 'vue';
import axios from 'axios';

import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart, BarChart } from 'echarts/charts';
import {TitleComponent, TooltipComponent, LegendComponent, GridComponent} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';

use([CanvasRenderer, PieChart, BarChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent]);
provide(THEME_KEY, 'dark');

const $cookies = inject("$cookies");
// console.log($cookies.get("username"))
// const shopName = ref({shopName : $cookies.set("好寵")})
const shopProductdata = ref([])
const shopProductCount = ref([])

console.log($cookies.get("username"))
const shopName = reactive({
  shopName : $cookies.get("username")
})
console.log(shopName)
//性別圓餅圖
const option = ref({
  title: {
    text: '消費者輪廓',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['男性', '女性', '不願透漏性別'],
  },
  series: [
    {
      name: '性別',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 335, name: '男性' },
        { value: 310, name: '女性' },
        { value: 310, name: '不願透漏性別'}
        
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
});

const option2 = ref({
  title: {
    text: '訂單狀況',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['訂單已成立', '訂單確認中', '訂單已退貨'],
  },
  series: [
    {
      name: '狀態',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 335, name: '訂單已成立' },
        { value: 310, name: '訂單已完成' },
        { value: 310, name: '訂單已退貨'}
        
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
});

//長條圖
const barOption = ref({
  title: {
    text: '產品銷售數據',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
    type: 'cross',
    },
  },
  legend: {
    data: ['銷售總金額'],
    left: 'left',
  },
  xAxis: {

    type: 'value',
    data: [],
  },
  yAxis: {

    type: 'category',
    data :[]
  },
  series: [
    {
      name: '銷售總金額',
      type: 'bar',
      data: [1,2,3],
      itemStyle: {
        // 设置颜色
        color: 'orange',
      },
    },
  ],
});

const today = new Date();
const year = today.getFullYear(); // 获取年份
const month = today.getMonth() + 1; // 月份从0开始，所以要加1
const day = today.getDate(); // 获取日期
// 格式化日期
const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

console.log(formattedDate);

  //找出要分析的資料
  const URL = import.meta.env.VITE_API_JAVAURL;
  const URLANALYSIS = `${URL}shopproductanalysis`
  const loadAnalysis = async() =>{
    const response = await axios.post(URLANALYSIS, shopName)
    shopProductdata.value = response.data
    console.log(shopProductdata.value)
    // console.log(shopProductdata.value.length)
    //找出年齡的資料
      let men = 0;
      let women = 0;
      let none = 0;
    for(let i = 0; response.data.length > i ; i++){

      if(response.data[i].gender === true){
        men ++;
      }else if(response.data[i].gender === false){
        women ++;
      }
    }
    none = parseInt(response.data.length) - men - women
    // console.log(men)
    // console.log(women)
    // console.log(none)
    // console.log(option.value.series[0].data[0].value)
    option.value.series[0].data[0].value = men;
    option.value.series[0].data[1].value = women;
    option.value.series[0].data[2].value = none;
    
        const priceMap = {};
        shopProductdata.value.forEach(item => {
          const productId = item.productId;
          const price = item.price;
          if (priceMap[productId] === undefined) {
            priceMap[productId] = price; // 如果该商品名称还没有在 quantityMap 中，创建一个新条目
          } else {
            // 如果已经有了，累加数量
            priceMap[productId] += price;
          }
        });
        //将加总后的数据存储在一个新数组中
        const priceResult = Object.keys(priceMap).map(productId => ({
          productId,
          price: priceMap[productId],
        }));
        const productIds = priceResult.map(item => item.productId);//各自裝成陣列
        const prices = priceResult.map(item => item.price);//各自裝成陣列
        console.log(priceResult)
        barOption.value.series[0].data = prices;
        barOption.value.yAxis.data = productIds;

      let have = 0;
      let ok = 0;
      let fail = 0;
    for(let i = 0; response.data.length > i ; i++){

      if(response.data[i].state === "訂單已成立"){
        have ++;
      }else if(response.data[i].state === "訂單已完成"){
        ok ++;
      }
    }
    fail = parseInt(response.data.length) - men - women
    // console.log(men)
    // console.log(women)
    // console.log(none)
    // console.log(option.value.series[0].data[0].value)
    option2.value.series[0].data[0].value = have;
    option2.value.series[0].data[1].value = ok;
    option2.value.series[0].data[2].value = fail;

      const productData = {};
  shopProductdata.value.forEach(item => {
      const productId = item.productId;
      const name = item.name;
      const quantity = item.quantity;
    if (!productData[productId]) {
      // 如果该产品尚未在 productData 中创建条目，则创建一个新条目
      productData[productId] = {
        productId: productId,
        name: name,
        quantity: quantity,
      };
    } else {
      // 否则，累加数量
      productData[productId].quantity += quantity;
    }
  });
  // 将 productData 转换为数组形式
  const resultArray = Object.values(productData);
  shopProductCount.value = resultArray
  console.log(resultArray);
  console.log(shopProductCount.value);

  }
  
  loadAnalysis();

</script>

<style scoped>
  .chart {
  height: 400px;
} 
</style>