<template>
  <div style="text-align: center;"><h2>動物醫院地圖</h2></div>
<br>
  <div>
    <div id="map" style="height: 400px; width: 100%"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const mainAddress = ref('106台北市大安區復興南路一段390號2樓'); // 主地址
const otherAddresses = ref([]); // 其他地址

let map;
const geocoder = new google.maps.Geocoder();

onMounted(() => {
 
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const locationString = latitude + "," + longitude;
      mainAddress.value = '106台北市大安區復興南路一段390號2樓'; // 在這裡修改 mainAddress 的值
      console.log("Updated mainAddress: " + mainAddress.value);
      getwhere();
      // 其他代碼不變
      // ...
    }, function(error) {
      console.error("Error getting user's location: " + error.message);
    }, { enableHighAccuracy: true });
  } else {
    console.error("Geolocation is not supported by this browser.");
  }

  getwhere();
  select();

});

function getwhere(){


  geocoder.geocode({ address: mainAddress.value }, (results, status) => {
    if (status === "OK" && results.length > 0) {
      const mainLocation = results[0].geometry.location;
      initializeMap(mainLocation);
      createMainMarker(mainLocation, mainAddress.value);
    } else {
      console.error(
        "Geocode for main address was not successful for the following reason: " +
        status
      );
    }
  });
}


function initializeMap(mainLocation) {
  map = new google.maps.Map(document.getElementById("map"), {
    center: mainLocation,
    zoom: 15,
    styles: darkMapStyle,
  });

  otherAddresses.value.forEach((hospital) => {
    const { address, name ,phone} = hospital;
    // console.log(address, name ,phone)

    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK" && results.length > 0) {
        const location = results[0].geometry.location;
        // console.log(location)
        // console.log(name)
        // console.log(phone)
        

        createMarker(location, name, phone,address);
        
      } else {
        console.error(
          "Geocode for the address was not successful for the following reason: " +
            status
        );
      }
    });
  });
}

function createMainMarker(location, name) {
  new google.maps.Marker({
    map: map,
    position: location,
    title: name,
    icon:"./icons8-dog-64.png"
  });
}


// function createMarker(location, name) {
//   new google.maps.Marker({
//     map: map,
//     position: location,
//     title: name,
//   });
// }
function createMarker(location, name, phone,address) {
  // console.log(location)
  //       console.log(name)
  //       console.log(phone)
  const marker = new google.maps.Marker({
    map: map,
    position: location,
    title: name,
  });
  const link = '<a href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(name) + '" target="_blank">查看地图</a>';

  const infoWindow = new google.maps.InfoWindow({
    content: '院名: '+name+'<br>'+'電話: '+phone+'<br>'+'地址: '+address+link, // 这里的 info 参数是显示在弹出窗口中的内容
  });

  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });
}

const URL = import.meta.env.VITE_API_JAVAURL;
const URLAPI = `${URL}pet_web/hospital`;
const select = async () => {
  const response = await axios.get(URLAPI);
  otherAddresses.value = response.data;
// console.log(otherAddresses.value )
  otherAddresses.value.forEach((hospital) => {
    const { address, name ,phone} = hospital;
    // console.log(address, name ,phone)

    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK" && results.length > 0) {
        const location = results[0].geometry.location;
        // console.log(location)
        // console.log(name)
        // console.log(phone)
        

        createMarker(location, name, phone,address);
        
      } else {
        console.error(
          "Geocode for the address was not successful for the following reason: " +
            status
        );
      }
    });
  });
};

const darkMapStyle=[
      { elementType: 'geometry', stylers: [{color: '#242f3e'}] },
      { elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}] },
      { elementType: 'labels.text.fill', stylers: [{color: '#746855'}] },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
      }
    ]

    
</script>
