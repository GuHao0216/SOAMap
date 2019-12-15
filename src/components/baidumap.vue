<template>
<div>
 <baidu-map class="map" :center="{lng:112.9985537638,lat:28.1456998494}" :zoom="18" :scroll-wheel-zoom="true"></baidu-map>
</div>
</template>

<script>
// import BMap from 'BMap'
export default {
  name: 'baidumap',
method:{
// init(){
//         var map = new BMap.Map("container");
//     // 创建地图实例  
//     var point = new BMap.Point(112.9985537638,28.1456998494);
//     // 创建点坐标  
//     map.centerAndZoom(point, 15);
//     // 初始化地图，设置中心点坐标和地图级别  
// }
},
mounted(){
// this.init();
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.map {
  width: 100%;
  height: 400px;
}
</style>
