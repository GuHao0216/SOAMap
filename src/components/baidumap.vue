<template>
  <div>
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
      <!-- <span>我来啦!</span> -->
<audio src="http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text=中南大学铁道学院" controls="controls"></audio>
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
      <el-button @click="flag = true" plain>上传图片</el-button>
    </el-drawer>
    <el-dialog title="上传图片" :visible.sync="flag">
      <el-upload
        action="http://10.0.0.16:8080/pictures"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
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
      :scroll-wheel-zoom="true"
    >
      <bm-view class="map"></bm-view>
      <bm-control :offset="{width: '10px', height: '10px'}">
        <bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 1}">
          <!-- <input placeholder="请输入地名关键字"/>  -->
          <el-row style="width:500px">
            <el-col :span="12">
              <el-input
                @input="change()"
                clearable
                v-model="keyword"
                placeholder="请输入地名关键字"
                size="small"
              ></el-input>

              <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">更多功能</el-button>
            </el-col>
            <el-col :span="12">
              <el-button icon="el-icon-microphone" circle></el-button>
            </el-col>
          </el-row>
        </bm-auto-complete>
      </bm-control>
      <bm-local-search :keyword="keyword" :auto-viewport="true"></bm-local-search>
    </baidu-map>
  </div>
</template>

<script>
// import BMap from 'BMap'
export default {
  name: "baidumap",
  data() {
    return {
      location: "北京",
      keyword: "",
      dialogImageUrl: "",
      dialogVisible: false,
      flag: false,
      drawer: false
    };
  },
  watch: {
    keyword() {
      if (this.keyword == "") {
        document.getElementsByClassName("map")[0].style.height = "100%";
        document.getElementsByClassName("map")[0].style.position = "absolute";
      } else {
        document.getElementsByClassName("map")[0].style.height = "400px";
        document.getElementsByClassName("map")[0].style.position = "relative";
      }
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    change() {
      //   document.getElementsByClassName("map")[0].style.position = "static";
      //   document.getElementsByClassName("map")[0].style.height = "400px";
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
