<template>
  <div class="region" v-loading.fullscreen.lock="fullscreenLoading">

    <div class="block_rzl clearfix" v-if="areaData.length">
      <div class="title_rzl">传播地域分布</div>
      <div class="region_map">
        <mapCharts idName="map1" height="600" :chartData="areaData" @click-map="areaMapClick"></mapCharts>
      </div>
      <div class="region_chart">
        <div class="region_chart_title clearfix">
          <div class="region_chart_title_l">
            <div>覆盖地域数量</div>
            <span>{{areaData.length}}</span>
          </div>
          <div class="region_chart_title_r">
            <div>江苏地区转载数量</div>
            <span>{{provienceTransnumData?provienceTransnumData:0}}</span>
          </div>
        </div>

        <barChart :height="550"
                  idName="cbdyfx"
                  :chartData="areaRankData"
                  @click-barchart="clickBarchart"
                  :options="{direction:'vertical',showRankingList:true,emphasizeColor:true}">
        </barChart>

      </div>
    </div>

    <div class="block_rzl" v-if="provienceTransList.length">
      <div class="title_rzl" style="margin-bottom: 25px">{{provienceTransName}}地区转载列表</div>
      <tables :data="provienceTransList"
              :columnData="provienceTransListColumn"
              :options="options"
              @refresh-data="refreshData">
      </tables>
    </div>

    <div class="empty_block" v-if="!areaData.length && !provienceTransList.length">暂无相关数据</div>
  </div>
</template>

<script>

  import mapCharts from '@/components/common/mapCharts.vue'
  import Tables from '@/components/common/ZCTables'
  import barChart from '@/components/common/ZCChartsBar'

  export default {
    name: "region-content",
    components: {mapCharts, Tables, barChart},
    props: {
      isGroupPlantform: {type: Boolean, require: true},
      plantformId: {type: String / Number, require: true},
      startTime:{type:String,require:true},
      accountType:{type:String,require:true},
    },

    watch: {
      plantformId(val, oldVal) {
        this.loadAreaData(val)
      },
      startTime(val){
        // alert(this.plantformId)
        if(this.plantformId.length){
          this.loadAreaData(this.plantformId)
        }
      },
      accountType(val){
        if(this.plantformId){
          this.loadAreaData(this.plantformId)
        }
      },
      pageNo(val) {
        //console.log('pageNo改变了')
        this.loadProvienceTransList(this.plantformId,this.provienceTransName)
      },
      pageSize(val) {
        //console.log('pageSize改变了')
        this.loadProvienceTransList(this.plantformId,this.provienceTransName)
      },
    },
    data() {
      return {
        fullscreenLoading:false,

        //表格数据
        options:{},
        //传播地域分析数据
        areaOriginalData: [],
        areaData: [],
        provienceTransnumData: 0,
        provienceTransName: '',
        areaRankData: {categoryArr: [], valueArr: []},
        //列表
        provienceTransList:[],
        provienceTransListColumn:[],
        total: 0,//作品总数
        pageNo: 1,//当前页码数
        pageSize: 10,//每页条数



      }
    },
    methods: {
      refreshData({selected, currentPage, pageSize, sortingIndex}) {
        //console.log(`筛选项=${selected},当前页=${currentPage},每页数=${pageSize},排序项=${sortingIndex}`);
        this.pageNo = currentPage;
        this.pageSize = pageSize;
      },
      clickTablecell({rowIndex, columnIndex}) {
        //console.log(`行号=${rowIndex},列号=${columnIndex}`);
      },


      //传播地域分析
      loadAreaData(ID) {
        var params = {startTime: this.startTime, accountType: this.accountType};
        if(this.plantformId.length > 1){
          if (this.isGroupPlantform) {
            params.platformTypeId = ID;
          } else {
            params.platformId = ID;
          }
        }
        this.fullscreenLoading = true;

        this.$http.get(this.baseUrl + '/spread/area/current', {params: params}).then(function (res) {
          var response = JSON.parse(res.bodyText);
          // console.log('传播地域分析数据');
          // console.log(response);
          this.areaData = [];
          this.areaRankData = {categoryArr: [], valueArr: []};
          this.provienceTransList = [];
          this.fullscreenLoading = false;

          if(response.code == 200 && response.data) {
            this.handleData_area(response.data);
            this.handleData_areaRank(response.data);
          }
        }, function (err) {
          //console.log('传播地域分析数据失败');
          //console.log(err);
          this.fullscreenLoading = false;
        })
      },
      handleData_area(data) {
        // //console.log('传播地域分析数据')
        // //console.log(data)
        this.areaOriginalData = [];
        var areaData = [];
        var thiz = this;
        data.forEach(function (value, index) {
          if (value.province) {
            // areaData.push({name: thiz.cutProvinceName(value.province), value: value.transNum})
            areaData.push({name: thiz.cutProvinceName(value.province), value: value.transNum})
            thiz.areaOriginalData.push(value)
          }
        });
        this.areaData = areaData;
        this.loadProvienceTransnumData(this.plantformId,'江苏省')

      },
      handleData_areaRank(data) {
        // //console.log('传播地域分析排行数据')
        // //console.log(data)

        var categoryArr = [];
        var valueArr = [
          {name: '文章转载篇数', value: []},
        ];

        var thiz = this;
        data.forEach(function (value) {
          if (value.province) {
            categoryArr.push(thiz.cutProvinceName(value.province));
          }
        });

        valueArr.forEach(function (value, index) {
          data.forEach(function (dataValue) {
            if (dataValue.province) {
              value.value.push(dataValue.transNum)
            }
          })
        });

        if(categoryArr.length > 10){
          this.areaRankData = {categoryArr: categoryArr.slice(0,10), valueArr: valueArr.slice(0,10)}
        }else{
          this.areaRankData = {categoryArr: categoryArr, valueArr: valueArr}
        }

        // //console.log(this.areaRankData)
      },
      areaMapClick({name,index}){
        // alert(`name=${name},index=${index}`);

        var thiz = this;
        this.pageNo = 1;

        this.areaOriginalData.forEach(function (value,index) {
          // //console.log('++++++++'+index)
          // //console.log(value)


          if(value.province.indexOf(name) != -1){
            thiz.loadProvienceTransList(thiz.plantformId,value.province);
          }
        })

      },
      clickBarchart({name,index}){
        this.pageNo = 1;
        this.loadProvienceTransList(this.plantformId,this.areaOriginalData[index].province);
      },

      //某地区转载数量
      loadProvienceTransnumData(ID,province) {
        var params = {startTime: this.startTime, accountType: this.accountType};
        if(this.plantformId.length > 1){
          if (this.isGroupPlantform) {
            params.platformTypeId = ID;
          } else {
            params.platformId = ID;
          }
        }
        params.province = province;
        this.provienceTransName = this.cutProvinceName(province);

        // //console.log(`某地区转载数量参数=`);
        // //console.log(params)
        var thiz = this;
        this.$http.get(this.baseUrl + '/spread/provience/transnum', {params: params}).then(function (res) {
          var response = JSON.parse(res.bodyText)
          //console.log('某地区转载数量数据')
          //console.log(response)
          this.provienceTransnumData = 0
          if(response.code == 200 && response.data) {
            this.handleData_provienceTransnum(response.data)
          }
        }, function (err) {

          //console.log('某地区转载数量数据失败');
          //console.log(err);
        })
      },
      handleData_provienceTransnum(data) {
        // //console.log('某地区转载数量数据')
        // //console.log(data)

        this.provienceTransnumData = data
      },


      //某地区转载列表
      loadProvienceTransList(ID,privince){
        var params = {startTime: this.startTime, accountType: this.accountType,pageNo:this.pageNo,pageSize:this.pageSize};
        if(this.plantformId.length > 1){
          if (this.isGroupPlantform) {
            params.platformTypeId = ID;
          } else {
            params.platformId = ID;
          }
        }
        params.province = privince;
        console.log('=======某地区转载列表')
        console.log(params)
        console.log('=======某地区转载列表')
        var thiz = this;
        this.$http.get(this.baseUrl + '/spread/area/trans/list', {params:params}).then(function (res) {
          var response = JSON.parse(res.bodyText)
          console.log('某地区转载列表数据')
          console.log(response)
          this.provienceTransList = [];
          this.provienceTransName = '';
          this.total = 0;
          if (response.code == 200 && response.data.resultList){
            this.total = response.data.count
            this.handleData_provienceTransList(response.data.resultList);
            this.provienceTransName = thiz.cutProvinceName(privince);
          }
        }, function (err) {
          //console.log('某地区转载列表数据失败');
          //console.log(err);
        })
      },
      handleData_provienceTransList(data){
        //console.log('某地区转载列表数据')
        //console.log(data)
        this.provienceTransList = data;

        this.provienceTransListColumn = [
          {prop: 'rowNum', label: '序号'},
          {prop: 'transMeida', label: '转载媒体'},
          {prop: 'transTitle', label: '转载标题'},
          {prop: 'platformName', label: '平台'},
          {prop: 'originalTitle', label: '原文标题'},
          {prop: 'transTime', label: '转载时间'},
        ];
        var total = this.total;
        this.options= {
          id: 'region_tables',
            total: total,
            titleStyle: {
            fontSize: '20px',
              color: '#111111',
              paddingBottom: '0'
          },
          showBorder: false,
            //表格列样式
            columnStyle: {
            indexs: [0, 1, 2, 3, 4,5],
              styles: [
              {width: this.getLineUnitWidth(12) * 0.8},
              {width: this.getLineUnitWidth(12) * 1.5,textAlign: 'left'},
              {textAlign: 'left', color: '#4642ff'},
              {textAlign: 'left', width: this.getLineUnitWidth(12) * 1.5},
              {textAlign: 'left', color: '#4642ff'},
              {width: this.getLineUnitWidth(12) * 1.7},
            ],
              commons: {textAlign: 'center', color: '#444'}
          },
          //表格表头样式
          headerStyle: {
            indexs: [1,2,3,4],
              styles: [{textAlign: 'left'},{textAlign: 'left'},{textAlign: 'left'},{textAlign: 'left'}],
              commons: {backgroundColor: '#f4f4f4', textAlign: 'center', padding: '5px 0'}
          },
        };

      }
    }
  }
</script>

<style scoped>
  
  /*传播地域分析*/
  .region .region_map {
    float: left;
    width: 60%;
  }

  .region .region_chart {
    float: left;
    width: 40%;
  }

  .region_chart_title_l, .region_chart_title_r {
    text-align: center;
    float: left;
    width: 50%;
  }

  .region_chart_title_l div, .region_chart_title_r div {
    color: #444;
    font-size: 18px;
    font-weight: 900;
  }

  .region_chart_title_l span, .region_chart_title_r span {
    color: #4642ff;
    font-size: 18px;
    font-weight: 900;
  }

  .region_chart_ranking {
    margin-top: 10px;
    height: 550px;
  }

</style>

