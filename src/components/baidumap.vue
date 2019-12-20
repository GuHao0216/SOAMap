<template>
  <div>
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
      <!-- <span>我来啦!</span> -->
      <!-- <audio src="http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text=中南大学铁道学院" controls="controls"></audio> -->
      <el-card class="box-card" shadow="always" style="margin-bottom: 20px;">
        <div slot="header" class="clearfix">
          <span>天气</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        </div>
        <el-row>
          <iframe
            name="weather_inc"
            src="http://i.tianqi.com/index.php?c=code&id=2&num=3&py=changsha"
            width="440"
            height="70"
            frameborder="0"
            marginwidth="0"
            marginheight="0"
            scrolling="no"
          ></iframe>
        </el-row>
      </el-card>
      <el-card class="box-card" shadow="always">
        <div slot="header" class="clearfix">
          <span>识别图片位置</span>
        </div>
        <el-button @click="flag = true" plain>上传图片</el-button>
      </el-card>
<!-- 
      <el-card class="box-card">
        <el-button @click="showBusLine" plain>公交前往</el-button>
      </el-card> -->
    </el-drawer>
    <el-dialog title="上传图片" :visible.sync="flag">
      <el-upload
        action="http://localhost:8081/soa/pictures"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-success="handleSuccess"
        :on-remove="handleRemove"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
      <!-- <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>-->
      <el-button @click="resultFlag = true" v-show="buttonFlag" plain>查看结果</el-button>
    </el-dialog>
    <el-dialog title="解析结果" :visible.sync="resultFlag" width="80%">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="GPS Date Stamp" label="拍摄日期" width="180"></el-table-column>
        <el-table-column prop="Make" label="设备品牌" width="180"></el-table-column>
        <el-table-column prop="Model" label="设备型号" width="180"></el-table-column>
        <el-table-column prop="GPS Longitude" label="经度"></el-table-column>
        <el-table-column prop="GPS Latitude" label="纬度"></el-table-column>
      </el-table>
      <el-button @click="change" plain>在地图中显示</el-button>
    </el-dialog>
    <!-- <baidu-map class="map" :center="{lng:112.9985537638,lat:28.1456998494}" :zoom="18" :scroll-wheel-zoom="true"></baidu-map> -->
    <!-- <baidu-map>
        <label>关键词：<input v-model="keyword"></label>
  <label>地区：<input v-model="location"></label>
    <bm-view class="map"></bm-view>
    <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location"></bm-local-search>
    </baidu-map>-->
    <baidu-map
      :center="{lng: 112.9985537638, lat: 28.1456998494}"
      :zoom="18"
      @ready="handler"
      :scroll-wheel-zoom="true"
    >
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
            <bm-control style="float:left; clear:both;position = fixed" :offset="{width: '10px', height: '10px'}">
        <bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 1}">
          <!-- <input placeholder="请输入地名关键字"/>  -->
          
           
              <el-input clearable v-model="keyword" placeholder="请输入地名关键字" size="small" style="width:300px;"></el-input>

              <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">更多功能</el-button>
              <!-- <el-button @click="driveFlag = true" plain>定位</el-button> -->
              <el-button @click="showDriveLine" v-show="this.pointflag" plain>驾车前往</el-button>
              <el-button @click="showBusLine" v-show="this.pointflag" plain>公交前往</el-button>
            <!-- </el-col>
            <el-col :span="12">
              <el-button icon="el-icon-microphone" circle></el-button>
            </el-col> -->
          
        </bm-auto-complete>
      </bm-control>
      <bm-view class="map">   
      </bm-view>
      <div v-if="pointflag">
        <bm-marker :position="this.point" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
          <bm-label
            :content="this.content"
            :labelStyle="{color: 'red', fontSize : '24px'}"
            :offset="{width: -35, height: 30}"
          />
        </bm-marker>
      </div>
    <!-- <el-row > -->

      <!-- </el-row> -->
      <bm-local-search v-if="searchFlag" :keyword="keyword" :auto-viewport="true"></bm-local-search>

             <bm-transit :start="busStart" :end="keyword" :selectFirstResult="true" :auto-viewport="true" location="长沙" v-if="busFlag"></bm-transit>
      <bm-driving
        v-if="driveFlag"
        :selectFirstResult="true"
        :start="driveStart"
        :end="keyword"
        :startCity="driveStartCity"
        :endCity="driveEndCity"
        :auto-viewport="true"
      ></bm-driving>
    </baidu-map>
  </div>
</template>

<script>
// import BMap from 'BMap'
export default {
  name: "baidumap",
  data() {
    return {
      location: "长沙",
      keyword: "",
      dialogImageUrl: "",
      dialogVisible: false,
      flag: false,
      driveFlag: false,
      searchFlag: false,
      busFlag:false,
      drawer: false,
      pointflag: false,
      resultFlag: false,
      buttonFlag: false,
      content: "",
      tableData: [],

      busStart:{lng: 112.9985537638, lat: 28.1456998494},
      busEnd:{lng: 112.9985537638, lat: 28.1456998494},
      busShow: false,
      driveStart: { lng: 112.9985537638, lat: 28.1456998494 },
      driveEnd: { lng: 112.8985537638, lat: 28.1456998494 },
      driveStartCity: "",
      driveEndCity: ""

      // BMap:"",
      // map:""
    };
  },
  watch: {
    keyword() {
      if (this.keyword == "") {
        document.getElementsByClassName("map")[0].style.height = "100%";
        document.getElementsByClassName("map")[0].style.position = "absolute";
        this.pointflag = false;
        this.driveFlag = false;
        this.busFlag = false;
        this.searchFlag = false
      } else {
        document.getElementsByClassName("map")[0].style.position = "relative";
        document.getElementsByClassName("map")[0].style.height = "400px";
        this.driveStart = this.keyword
        this.pointflag = true
        this.searchFlag = true
      }
    },
    driveFlag() {
      if (this.driveFlag) {
        // document.getElementsByClassName("map")[0].style.height = "400px";
        // document.getElementsByClassName("map")[0].style.position = "relative";
        this.searchFlag = false
        this.busFlag = false;
      } else {
        // document.getElementsByClassName("map")[0].style.height = "100%";
        // document.getElementsByClassName("map")[0].style.position = "absolute";
      }
    },
    busFlag() {
      if (this.busFlag) {
        // document.getElementsByClassName("map")[0].style.height = "400px";
        // document.getElementsByClassName("map")[0].style.position = "relative";
        this.searchFlag = false
        this.driveFlag = false;
      } else {
        // document.getElementsByClassName("map")[0].style.height = "100%";
        // document.getElementsByClassName("map")[0].style.position = "absolute";
      }
    }
  },
  methods: {
    handler: function({ BMap, map }) {
      this.BMap = BMap;
      this.map = map;
    },
    handleSuccess(response, file, fileList) {
      console.log(response);
      this.tableData.push(response);
      console.log(response["GPS Latitude"]);
      console.log(response["GPS Longitude"]);
      this.Long = response["lon"];
      this.Lat = response["lat"];
      this.buttonFlag = true;
      console.log(response.Make + response.Model);

      console.log(file + fileList);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    change() {
      this.resultFlag = false;
      this.buttonFlag = false;
      this.dialogVisible = false;
      this.drawer = false;
      this.flag = false;
      this.tableData = [];
      // this.Long = 112.98407313967395;
      // this.Lat = 28.198545517187803;
      // var convertor = new this.BMap.Convertor()
      let point = new this.BMap.Point(this.Long, this.Lat);

      // convertor.translate(pointArr,3,5,this.translateCallBack())
      const gc = new this.BMap.Geocoder();
      var strLong = "" + this.Long;
      var strLat = "" + this.Lat;
      //  console.log(str)
      //  let point = new this.BMap.Point(116.279943,39.9125);

      var marker = new this.BMap.Marker(new this.BMap.Point(strLong, strLat));
      //  var marker = new this.BMap.Marker(point);
      console.log(marker);
      //  this.map.addOverlay(marker);
      //  marker.setAnimation(BMAP_ANIMATION_BOUNCE);
      this.point = point;
      console.log(point);
      //  let point = new this.BMap.Point("112.97194444444445\"","28°11'46.74\"");
      // console.log(gc)
      // console.log(gc.getLocation())
      var content = "";
      gc.getLocation(
        point,
        function(rs) {
          console.log(rs);
          var addComp = rs.address + "关键词：" + rs.business;
          this.keyword = rs.address;
          console.log(addComp);
          content = addComp;
          this.content = content;
          this.pointflag = true;
          // this.addr = addComp.province + ', ' + addComp.city + ', ' + addComp.district + ', ' + addComp.street + ', ' + addComp.streetNumber
          //  _this.addr = rs.address
          // this.keyword = ""
        }.bind(this)
      );
    },
    showDriveLine() {
      // this.busEnd = new this.BMap.Point("112.9985537638","28.1456998494");
      this.drawer = false;
      this.driveFlag = true;
      this.driveStart = new this.BMap.Point("112.9985537638", "28.1456998494");
      this.driveEnd = this.point;
    },
    showBusLine() {
      // this.driveEnd = new this.BMap.Point("112.9985537638", "28.1456998494");
      // this.busEnd = this.point;
            this.drawer = false;
      this.busFlag = true;
      this.busStart = new this.BMap.Point("112.9985537638", "28.1456998494");
      this.busEnd = this.point;
    }
  },
  mounted() {
    // this.init();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.map {
  position: absolute;
  width: 100%;
  /* height: 400px; */
  height: 100%;
  top: 0px;
  /* bottom: 0px; */
  left: 0px;
}
</style>
