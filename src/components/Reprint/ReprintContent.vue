<template>
  <div class="reprint" v-loading.fullscreen.lock="fullscreenLoading">

    <!--转载媒体占比+转载媒体渠道-->
    <div class="block_rzl clearfix" v-if="transMediaTypeData.length||transChannelTypeData.length">
      <!--转载媒体占比-->
      <div class="ratio" v-if="transMediaTypeData.length">
        <div class="title_rzl">转载媒体占比</div>
        <div class="halfBox-left">
          <pieChart idName="ratio" :height="300" :chartData="transMediaTypeData"></pieChart>
        </div>
      </div>
      <!--转载媒体渠道-->
      <div class="channel" v-if="transChannelTypeData.length">
        <div class="title_rzl">转载渠道占比</div>
        <div class="halfBox-right">
          <pieChart idName="channel" :height="300" :chartData="transChannelTypeData"></pieChart>
        </div>
      </div>
    </div>

    <!--媒体转载排行-->
    <div class="block_rzl clearfix"
         v-if="transMediaTypeData.length != 0">
      <div class="title_rzl">媒体转载排行</div>
      <topSelectMenu :menuData1="mediaTypeData"
                     :menuData2="channelData"
                     @select="topSelectMenuSelectListener">
      </topSelectMenu>

      <!--<div class="topSelectMenu clearfix">-->
        <!--<div class="mediaType">-->
          <!--<div v-for="item in mediaTypeData"><span>{{item.text}}</span></div>-->
        <!--</div>-->
        <!--<div class="channel">-->
          <!--<div v-for="item in channelData"><span>{{item.text}}</span></div>-->
        <!--</div>-->
      <!--</div>-->

      <div class="media-num">覆盖媒体数：{{mediaTransNumData}}</div>
      <!--<div :style="{backgroundColor:this.getRandomColor(),height:'300px'}"></div>-->
      <div class="empty"
           v-if="!mediaTransData.categoryArr.length"
           style="height: 200px;background-color: #fff;color: #8c939d;padding-top: 200px;text-align: center">
        暂无相关数据
      </div>

      <div v-if="mediaTransData.categoryArr.length">
        <barChart :height="400"
                  idName="mtzzph"
                  :chartData="mediaTransData"
                  :options="{direction:'horizontal'}">
        </barChart>
      </div>

    </div>

    <!--平台转载排行-->
    <div class="block_rzl" v-if="platformTransData.categoryArr.length">
      <div class="title_rzl">平台转载排行</div>
      <!--<div :style="{backgroundColor:this.getRandomColor(),height:'300px'}"></div>-->
      <barChart :height="400"
                idName="ptzzph"
                :chartData="platformTransData"
                :options="{direction:'horizontal'}">
      </barChart>
    </div>

    <!--转载文章分类+经济类转载文章-->
    <div class="block_rzl clearfix" v-if="classificationData.length">
      <!--转载文章分类-->
      <div class="classify">
        <div class="title_rzl">转载文章分类</div>
        <pieChart idName="classify" :height="480" :chartData="classificationData" @click-piechart="clickPiechart"></pieChart>
      </div>

      <!--经济类转载文章TOP-->
      <div class="top10" v-if="classificationTopData.length">
        <div class="title_rzl">{{classificationTopName}}类转载文章TOP 10</div>
        <tables :data="classificationTopData"
                :columnData="classificationTopColumn"
                :showPageControl="false"
                :options="options"></tables>
      </div>
    </div>

    <!--转载时段占比-->
    <div class="block_rzl" v-if="transPeriodData.categoryArr.length">
      <div class="title_rzl">转载时段占比</div>
      <!--<div :style="{backgroundColor:this.getRandomColor(),height:'300px'}"></div>-->
      <barChart :height="400"
                idName="zzsdzb"
                :chartData="transPeriodData"
                :options="{direction:'horizontal'}">
      </barChart>
    </div>

    <div class="empty_block" v-if="transMediaTypeData.length == 0 &&
         transChannelTypeData.length == 0 &&
         mediaTransData.categoryArr.length ==0 &&
         platformTransData.categoryArr.length == 0 &&
         classificationData.length ==0 &&
         transPeriodData.categoryArr.length == 0">暂无相关数据</div>

  </div>
</template>

<script>
  import pieChart from '@/components/common/ZCChartsPie'
  import topSelectMenu from '@/components/common/TopSelectMenu'
  import barChart from '@/components/common/ZCChartsBar'
  import tables from '@/components/common/ZCTables'

  export default {
    name: "reprint-content",
    components: {pieChart, tables, topSelectMenu, barChart},
    props: {
      isGroupPlantform: {type: Boolean, require: true},
      plantformId: {type: String / Number, require: true},
      startTime:{type:String,require:true},
      accountType:{type:String,require:true},
    },
    watch: {
      plantformId(val, oldVal) {
        this.loadAllData(val)
      },
      startTime(val){
        if(this.plantformId){
          this.loadAllData(this.plantformId)
        }
      },
      accountType(val){
        if(this.plantformId){
          this.loadAllData(this.plantformId)
        }
      }
    },
    data() {
      return {
        fullscreenLoading:false,

        options: {
          id: '215423',
          total: 10,
          //表格列样式
          columnStyle: {
            indexs: [0, 1, 2,3],
            styles: [
              {width: '80px'},
              {textAlign: 'left', color: '#4642ff'},
              {width: '120px'},
              {width: '150px'},
            ],
            commons: {textAlign: 'center', color: '#444', height: "45px", padding: '5px 0'}
          },
          //表格表头样式
          headerStyle: {
            indexs: [1],
            styles: [{textAlign: 'left'}],
            commons: {backgroundColor: '#f4f4f4', textAlign: 'center', padding: '5px 0'}
          },
        },

        //转载媒体占比
        transMediaTypeData: [],
        //转载渠道占比
        transChannelTypeData: [],
        //平台转载排行
        platformTransData:{categoryArr:[],valueArr:[]},
        //媒体转载排行
        mediaTransData: {categoryArr: [], valueArr: []},
        mediaTransNumData:0,
        mediaTypeData:[
          {text: "全部", select: true,value:0},
          {text: "官方媒体", select: false,value:1},
          {text: "政府网站", select: false,value:2},
          {text: "商业媒体", select: false,value:3},
          {text: "自媒体", select: false,value:4},
          {text: "国外媒体", select: false,value:5},
          {text: "其他", select: false,value:6},
        ],
        channelData:[
          {text: '网站', select: false,value:1},
          {text: '微信', select: false,value:2},
          {text: '微博', select: false,value:3},
          {text: 'APP', select: false,value:4},
          {text: '其他', select: false,value:5},
        ],


        //转载文章分类占比
        classificationData:[],
        classificationTopData:[],
        classificationTopName:'',
        classificationTopColumn:[],
        //转载时段占比
        transPeriodData:{categoryArr:[],valueArr:[]}

      }
    },
    methods: {

      topSelectMenuSelectListener(menu) {
        //console.log(menu);
        if(menu[1] == 0){
          var path = menu[0];
          if(path <= 6){
            var menuData = this.mediaTypeData;
            this.loadMediaTransData(this.plantformId,menuData[path].value,null)
          }
        }else{
          var path = menu[0];
          var menuData = this.channelData;
          this.loadMediaTransData(this.plantformId,null,menuData[path-8].value)
        }
      },

      loadAllData(val){
        //转载媒体占比
        this.loadTransMediaTypeData(val)
        // 转载渠道占比
        this.loadTransChannelTypeData(val)
        this.loadMediaTransData(val,0,null)

        if (this.isGroupPlantform == false) {
          this.platformTransData = {categoryArr:[],valueArr:[]}
        }else {
          //平台转载排行
          this.loadPlatformTransData(val)
        }
        // 转载时段占比数据
        this.loadTransPeriodData(val)
        //转载文章占比
        this.loadClassificationData(val)
      },

      // 转载媒体占比
      loadTransMediaTypeData(ID) {
        // const loading = this.$loading({
        //   lock: true,
        //   text: '玩命加载中',
        //   spinner: 'el-icon-loading',
        //   background: 'rgba(0, 0, 0, 0.7)'
        // });

        var params = {startTime: this.startTime, accountType: this.accountType};
        if(this.plantformId.length > 1){
          if (this.isGroupPlantform) {
            params.platformTypeId = ID;
          } else {
            params.platformId = ID;
          }
        }
        this.fullscreenLoading = true;

        this.$http.get(this.baseUrl + '/platform/trans/mediatype/find', {params: params}).then(function (res) {
          var response = JSON.parse(res.bodyText)
          //console.log('转载媒体占比数据')
          //console.log(response)
          // loading.close();
          this.fullscreenLoading = false;

          this.transMediaTypeData = [];
          if(response.code == 200 && response.data) {
            this.handleData_transMediaType(response.data)
          }
        }, function (err) {
          // loading.close();
          //console.log('转载媒体占比数据失败');
          //console.log(err);
          this.fullscreenLoading = false;

        })
      },
      handleData_transMediaType(data) {

        // //console.log('转载媒体占比数据');
        // //console.log(data)
        var transMediaTypeData = [];
        data.forEach(function (value, index) {
          if (parseInt(value.value)) {
            transMediaTypeData.push({name: value.name, value: parseInt(value.value)})
          }
        })
        this.transMediaTypeData = transMediaTypeData;
        // //console.log(this.transMediaTypeData)
      },

      //转载渠道占比
      loadTransChannelTypeData(ID) {
        var params = {startTime: this.startTime, accountType: this.accountType};
        if(this.plantformId.length > 1){
          if (this.isGroupPlantform) {
            params.platformTypeId = ID;
          } else {
            params.platformId = ID;
          }
        }
        this.$http.get(this.baseUrl + '/platform/trans/channel/find', {params: params}).then(function (res) {
          var response = JSON.parse(res.bodyText)
          //console.log('转载渠道占比数据')
          //console.log(response);
          this.transChannelTypeData = [];
          if(response.code == 200 && response.data) {
            this.handleData_transChannelType(response.data)
          }
        }, function (err) {

          //console.log('转载渠道占比数据失败');
          //console.log(err);
        })
      },
      handleData_transChannelType(data) {

        // //console.log('转载渠道占比数据');
        // //console.log(data)
        var transChannelTypeData = [];
        data.forEach(function (value, index) {
          if (parseInt(value.value)) {
            transChannelTypeData.push({name: value.name, value: parseInt(value.value)})
          }
        })
        this.transChannelTypeData = transChannelTypeData;
        // //console.log(this.transChannelTypeData)
      },


      //平台转载排行
      loadPlatformTransData(ID){
        var params = {startTime: this.startTime, accountType: this.accountType};
        if(this.plantformId.length > 1){
          if (this.isGroupPlantform) {
            params.platformTypeId = ID;
          } else {
            params.platformId = ID;
          }
        }
        this.$http.get(this.baseUrl + '/spread/platform/trans', {params:params}).then(function (res) {
          var response = JSON.parse(res.bodyText)
          // console.log('平台转载排行数据')
          // console.log(response)
          this.platformTransData = {categoryArr:[],valueArr:[]}
          if(response.code == 200 && response.data) {
            this.handleData_platformTrans(response.data)
          }
        }, function (err) {

          // console.log('平台转载排行失败');
          // console.log(err);
        })
      },
      handleData_platformTrans(data){
        // //console.log('平台转载排行数据')
        // //console.log(data)

        var categoryArr = [];
        var valueArr = [
          {name: '文章转载篇数', value: []},
        ];

        data.forEach(function (value) {
          if(value.transNum) {
            categoryArr.push(value.platformName);
          }
        });
        valueArr.forEach(function (value,index) {
          data.forEach(function (dataValue) {
            if(dataValue.transNum) {
              value.value.push(dataValue.transNum)
            }
          })
        })
        this.platformTransData = {categoryArr:categoryArr,valueArr:valueArr}
      },

      //媒体转载排行
      loadMediaTransData(ID,mediaType,channel) {
        var params = {startTime: this.startTime, accountType: this.accountType};
        if(this.plantformId.length > 1){
          if (this.isGroupPlantform) {
            params.platformTypeId = ID;
          } else {
            params.platformId = ID;
          }
        }
        if(mediaType){
          params.mediaType = mediaType;
        }
        if(channel){
          params.channel = channel;
        }
        //console.log('========媒体转载排行数据')
        //console.log(params)
        //console.log('========媒体转载排行数据')
        this.$http.get(this.baseUrl + '/spreadTrend/mediaOrder', {params: params}).then(function (res) {
          var response = JSON.parse(res.bodyText)
          //console.log('媒体转载排行数据')
          //console.log(response)
          this.mediaTransData = {categoryArr: [], valueArr: []};
          this.mediaTransNumData = 0;
          if(response.code == 200 && response.data.mediaList) {
            this.handleData_mediaTrans(response.data.mediaList)
            this.mediaTransNumData = response.data.mediaCover
          }
        }, function (err) {

          //console.log('媒体转载排行失败');
          //console.log(err);
        })
      },
      handleData_mediaTrans(data) {
        // //console.log('媒体转载排行数据')
        // //console.log(data)
        var categoryArr = [];
        var valueArr = [
          {name: '文章转载篇数', value: []},
        ];

        data.forEach(function (value) {
          categoryArr.push(value.media_name);
        });
        valueArr.forEach(function (value, index) {
          data.forEach(function (dataValue) {
            value.value.push(dataValue.trans_num)
          })
        })
        this.mediaTransData = {categoryArr: categoryArr, valueArr: valueArr}
      },


      //转载文章分类占比
      loadClassificationData(ID){
        var params = {startTime: this.startTime, accountType: this.accountType};
        if(this.plantformId.length > 1){
          if (this.isGroupPlantform) {
            params.platformTypeId = ID;
          } else {
            params.platformId = ID;
          }
        }
        this.$http.get(this.baseUrl + '/platform/trans/classification/find', {params: params}).then(function (res) {
          var response = JSON.parse(res.bodyText)
          // console.log('转载文章分类占比数据')
          // console.log(response);
          this.classificationData = [];
          if(response.code == 200 && response.data) {
            this.handleData_classification(response.data)
          }
        }, function (err) {

          //console.log('转载文章分类占比数据失败');
          //console.log(err);
        })
      },
      handleData_classification(dataM){

        var data = [];
        dataM.forEach(function (value,index) {
          if(value.value){
            data.push(value);
          }
        })

        if(!data.length){
          return;
        }
        this.classificationData = data;

        if(data[0].name != '综合'){
          this.loadClassificationTopData(this.plantformId,data[0].classification,data[0].name);
        }

      },

      clickPiechart({name,index}){
        //console.log(`name=${name},index=${index}`);

        if(name != '综合'){
          this.loadClassificationTopData(this.plantformId,this.classificationData[index].classification,name);
        }


      },

      //转载文章分类Top10
      loadClassificationTopData(ID,classification,className){
        var params = {startTime: this.startTime, accountType: this.accountType};
        if(this.plantformId.length > 1){
          if (this.isGroupPlantform) {
            params.platformTypeId = ID;
          } else {
            params.platformId = ID;
          }
        }
        params.classification = classification;
        this.$http.get(this.baseUrl + '/platform/trans/classification/top/ten', {params: params}).then(function (res) {
          var response = JSON.parse(res.bodyText)
          // console.log('转载文章分类Top10数据')
          // console.log(response);
          this.classificationTopData = [];
          this.classificationTopName = ''
          if(response.code == 200 && response.data) {
            this.handleData_classificationTop(response.data)
            this.classificationTopName = className;
          }
        }, function (err) {
          //console.log('转载文章分类Top10数据失败');
          //console.log(err);
        })
      },
      handleData_classificationTop(data){

        this.classificationTopData = data;
        this.classificationTopData.forEach(function (value,index) {
          value.index = index+1;
        })
        this.classificationTopColumn = [
          {prop: 'index', label: '排名'},
          {prop: 'title', label: '文章标题'},
          {prop: 'platform', label: '平台'},
          {prop: 'publishTime', label: '发布时间'},
        ];
      },


      //转载时段占比数据
      loadTransPeriodData(ID) {
        var params = {startTime: this.startTime, accountType: this.accountType};
        if(this.plantformId.length > 1){
          if (this.isGroupPlantform) {
            params.platformTypeId = ID;
          } else {
            params.platformId = ID;
          }
        }
        this.$http.get(this.baseUrl + '/trans/transPeriod', {params: params}).then(function (res) {
          var response = JSON.parse(res.bodyText)
          //console.log('转载时段占比数据')
          //console.log(response);
          this.transPeriodData = {categoryArr:[],valueArr:[]}
          if(response.code == 200 && response.data) {
            this.handleData_transPeriod(response.data)
          }

        }, function (err) {

          //console.log('失败');
          //console.log(err);
        })
      },
      handleData_transPeriod(data) {
        // //console.log('转载时段占比数据');
        // //console.log(data);
        var categoryArr = [];
        var valueArr = [
          {name: '文章转载篇数', value: []},
        ];

        data.forEach(function (value) {
          categoryArr.push(value.period_name);
        });
        valueArr.forEach(function (value,index) {
          data.forEach(function (dataValue) {
            value.value.push(dataValue.trans_num)
          })
        })
        this.transPeriodData = {categoryArr:categoryArr,valueArr:valueArr}
        // //console.log(this.transPeriodData)
      },

    }
  }
</script>

<style scoped>

  .reprint .ratio, .reprint .channel {
    float: left;
    width: 50%;
  }

  .reprint .classify, .reprint .top10 {
    float: left;
    width: 50%;
  }

  .topSelectMenu .mediaType div,.topSelectMenu .channel div{
    float: left;
    border-bottom: 2px #4642ff solid;
    color: #4642ff;
  }

  .reprint .media-num {
    /*float: right;*/
    text-align: right;
    font-size: 12px;
    font-weight: bold;
    /*margin-right: 150px*/
  }

  .reprint .halfBox-right {
    /*width: 82%;*/
    /*padding-right: 5%;*/
    /*padding-left: 13%;*/
    width: 100%;
  }

  .reprint .halfBox-left {
    /*width: 82%;*/
    /*padding-right: 13%;*/
    /*padding-left: 5%;*/
    width: 100%;
  }
</style>
