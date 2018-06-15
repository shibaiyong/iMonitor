<template>
  <div class="trend" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="block_rzl" v-if="timeTrendDatas.categoryArr.length">
      <div class="title_rzl">传播时间趋势</div>
      <lineChart idName="timeTrendCharts" :height="400" :chartData="timeTrendDatas"></lineChart>
      <div class="arc-box">
        <div style="display: inline-block;">
          <img src="../../assets/svg/arc_left.svg" class="left-img"/>
          <div>转载数最高峰: {{comprehensiveDate}}</div>
          <img src="../../assets/svg/arc_right.svg" class="right-img"/>
        </div>
        <span>当日文章转载数排行Top10</span>
      </div>
      <tables :data="comprehensiveData"
              :columnData="comprehensiveColumn"
              :options="options"
              :showPageControl="false"
              @refresh-data="refreshData">
      </tables>
    </div>


    <div class="block_rzl" v-if="publishTrendDatas.categoryArr.length">
      <div class="title_rzl">作品数发布时间趋势</div>
      <!--<lineChart idName="zpfbsjqs" :height="400" :chartData="timeTrendData" :options="{isArea:true}"></lineChart>-->
      <lineChart idName="time-lines" :height="450"
                 :options="{isArea:true}"
                 :areaData="publishTrendDatas"></lineChart>
    </div>

    <div class="empty_block" v-if="!timeTrendDatas.categoryArr.length && !publishTrendDatas.categoryArr.length">暂无相关数据</div>

  </div>
</template>

<script>
  import lineChart from '@/components/common/ZCChartsLine'
  import Tables from '@/components/common/ZCTables'
  import echarts from 'echarts'

  export default {
    name: "trend-content",
    components: {lineChart, Tables},
    props: {
      isGroupPlantform: {type: Boolean, require: true},
      plantformId: {type: String / Number, require: true},
      startTime: {type: String, require: true},
      accountType: {type: String, require: true},
    },
    watch: {
      plantformId(val, oldVal) {

        this.loadTimeTrendData(val)
        this.loadComprehensiveNum(val)
        this.loadPublishData(val);

      },
      startTime(val) {
        if (this.plantformId) {
          this.loadTimeTrendData(this.plantformId)
          this.loadComprehensiveNum()
          this.loadPublishData(this.plantformId);
        }
      },
      accountType(val) {
        if (this.plantformId) {
          this.loadTimeTrendData(this.plantformId)
          this.loadComprehensiveNum()
          this.loadPublishData(this.plantformId);
        }
      }
    },
    data() {
      return {
        fullscreenLoading:false,

        //传播时间趋势数据
        timeTrendDatas: {categoryArr: [], valueArr: []},

        //当日文章top10
        comprehensiveDate: '',
        comprehensiveData: [],
        comprehensiveColumn: [],
        options: {},

        //作品发布时数据
        publishTrendDatas: {categoryArr: [], valueArr: []},
      }
    },
    methods: {
      refreshData({selected, currentPage, pageSize, sortingIndex}) {
        // //console.log(`筛选项=${selected},当前页=${currentPage},每页数=${pageSize},排序项=${sortingIndex}`);
      },
      clickTablecell({rowIndex, columnIndex}) {
        // //console.log(`行号=${rowIndex},列号=${columnIndex}`);
      },

      //传播时间趋势
      loadTimeTrendData(ID) {
        // const loading = this.$loading({
        //   lock: true,
        //   text: '玩命加载中',
        //   spinner: 'el-icon-loading',
        //   background: 'rgba(0, 0, 0, 0.7)'
        // });

        var params = {startTime: this.startTime, accountType: this.accountType};
        if (this.plantformId.length > 1) {
          if (this.isGroupPlantform) {
            params.platformTypeId = ID;
          } else {
            params.platformId = ID;
          }
        }
        this.fullscreenLoading = true;

        this.$http.get(this.baseUrl + '/spreadTrend/timeTrend', {params: params}).then(function (res) {
          var response = JSON.parse(res.bodyText)
          console.log('传播时间趋势数据')
          console.log(response)
          // loading.close();
          this.fullscreenLoading = false;

          this.timeTrendDatas = {categoryArr: [], valueArr: []}

          if (response.code == 200 && response.data) {
            this.handleData_TimeTrend(response.data)
          }

        }, function (err) {
          // loading.close();
          //console.log('传播时间趋势失败');
          //console.log(err);
          this.fullscreenLoading = false;

        })
      },
      handleData_TimeTrend(data) {
        // //console.log('传播时间趋势数据');
        // //console.log(data);

        var categoryArr = [];
        var valueArr = [
          // {name: '综合数值', value: []},
          {name: '转载数', value: []},
          {name: '评论数', value: []},
          {name: '阅读数', value: []},
        ];

        data.forEach(function (value) {
          categoryArr.push(value.create_time);
        });

        valueArr.forEach(function (value, index) {

          data.forEach(function (dataValue) {
            //暂时隐去综合数值
            // if(index == 0){
            //   value.value.push(dataValue.comprehensive_num)
            // }else
            //暂时隐去综合数值
            if (index == 0) {
              value.value.push(dataValue.trans_num)
            } else if (index == 1) {
              value.value.push(dataValue.comment_num)
            } else {
              value.value.push(dataValue.read_num)
            }
          })
        })
        this.timeTrendDatas = {categoryArr: categoryArr, valueArr: valueArr}
      },


      //当日文章top10
      loadComprehensiveNum(ID) {
        var params = {startTime: this.startTime, accountType: this.accountType};
        if (this.plantformId.length > 1) {
          if (this.isGroupPlantform) {
            params.platformTypeId = ID;
          } else {
            params.platformId = ID;
          }
        }
        // params.orderCode = 1;
        console.log(params)
        this.$http.get(this.baseUrl + '/trans/comprehensiveNum', {params: params}).then(function (res) {
          var response = JSON.parse(res.bodyText)
          console.log('当日文章top10数据')
          console.log(response);
          this.comprehensiveData = [];
          if (response.code == 200 && response.data) {
            this.handleData_comprehensive(response.data)
          }

        }, function (err) {

          //console.log('当日文章top10失败');
          //console.log(err);
        })
      },
      handleData_comprehensive(data) {
        // //console.log('当日文章top10数据')
        // //console.log(data)

        this.comprehensiveDate = data.top_date;

        data.articles.forEach(function (value, index) {
          value.index = index + 1;
        })

        this.comprehensiveData = data.articles;
        this.comprehensiveColumn = [
          {prop: 'index', label: '排名'},
          {prop: 'publish_time', label: '发布时间'},
          {prop: 'title', label: '文章标题'},
          {prop: 'platform', label: '平台'},
          {prop: 'trans_num', label: '转载数'},
          {prop: 'comment_num', label: '评论数'},
          {prop: 'read_num', label: '阅读数'},
          // {prop: 'comprehensive_num', label: '综合数值'},
        ];
        this.options = {
          id: 'trend_tables',
          total: 10,
          titleStyle: {
            fontSize: '20px',
            color: '#111111',
            paddingBottom: '0'
          },
          showBorder: false,
          //表格列样式
          columnStyle: {
            indexs: [0, 1, 2, 3, 4, 5, 6],
            styles: [
              {width: this.getLineUnitWidth(13)*0.6},
              {width: this.getLineUnitWidth(13) * 2},
              {textAlign: 'left', color: '#4642ff'},
              {width: this.getLineUnitWidth(13) * 2},
              {width: this.getLineUnitWidth(13)},
              {width: this.getLineUnitWidth(13)},
              {width: this.getLineUnitWidth(13)},
              {width: this.getLineUnitWidth(13)},
            ],
            commons: {textAlign: 'center', color: '#444'}
          },
          //表格表头样式
          headerStyle: {
            indexs: [2],
            styles: [{textAlign: 'left'}],
            commons: {backgroundColor: '#f4f4f4', textAlign: 'center', padding: '5px 0'}
          },
        }

      },


      //作品发布时间趋势
      loadPublishData(ID) {
        var params = {startTime: this.startTime, accountType: this.accountType};
        if (this.plantformId.length > 1) {
          if (this.isGroupPlantform) {
            params.platformTypeId = ID;
          } else {
            params.platformId = ID;
          }
        }
        this.$http.get(this.baseUrl + '/article/publish/trend/find', {params: params}).then(function (res) {
          var response = JSON.parse(res.bodyText)
          // console.log('作品发布时间趋势数据')
          // console.log(response);
          this.publishTrendDatas = {categoryArr: [], valueArr: []}
          if (response.code == 200 && response.data) {
            this.handleData_publish(response.data);
          }
        }, function (err) {

          //console.log('失败');
          //console.log(err);
        })
      },
      handleData_publish(data) {
        // //console.log('作品发布时间趋势数据')
        // //console.log(data)

        var categoryArr = [];
        var valueArr = [
          {name: '作品数', value: []},
        ];

        data.forEach(function (value) {
          categoryArr.push(value.date);
        });
        valueArr.forEach(function (value, index) {
          data.forEach(function (dataValue) {
            value.value.push(dataValue.value)
          })
        })
        this.publishTrendDatas = {categoryArr: categoryArr, valueArr: valueArr}
      },


    },

  }
</script>

<style scoped>
  @import '../../assets/css/trend/trend.css';
</style>
