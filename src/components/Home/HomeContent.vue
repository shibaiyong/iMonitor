<template>
  <div class="overView"
       id="overView"
       v-loading.fullscreen.lock="fullscreenLoading">

    <!--传播情况统计-->
    <div class="block_rzl" v-if="spreadData.length">
      <div class="title_rzl">传播情况统计</div>
      <div class="statistic clearfix" id="statisticParentBox">
        <div class="statistic_box" v-for="item in spreadData"
             :style="'height:'+statisticBoxWidth+';width:'+statisticBoxWidth+';paddingLeft:'+statisticBoxPadding+';paddingRight:'+statisticBoxPadding">
          <div class="statistic_boxItem">
            <div class="boxItemContent">
              <span class="title_rzl">{{item.title}}</span><br/><br/>
              <span class="title_rzl" style="color: #4642FF">{{item.count>=10000?(item.count/10000).toFixed(2)+'万':item.count}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--各平台作品数对比-->
    <div class="block_rzl clearfix" v-if="platformData.length&&isGroupPlantform">
      <div class="home_works">
        <div class="title_rzl">各平台作品数占比</div>
        <div class="home_works_ratio">
          <pieChart idName="ptdbs"
                    :height="300"
                    :chartData="platformData">
          </pieChart>
        </div>
      </div>
      <div class="home_works">
        <div class="title_rzl"  style="margin-left: 20px;">作品数</div>
        <div class="home_works_count" style="margin-left: 20px;">
          <div class="home_works_count_content" v-for="item in workCountsData.split('')"
               :style="'width:'+100/workCountsData.split('').length+'%'+';font-size:'+homeWorkNumFontSize">
            <div class="home_works_count_content_num" :style="'background-size:'+homeWorkNumBackgroundSize">{{item}}
            </div>
          </div>
        </div>

      </div>
    </div>

    <!--原创文章占比-->
    <div class="block_rzl" v-if="originalData.length">
      <div class="title_rzl">原创文章占比</div>
      <div class="original_article clearfix">
        <div class="original_article_l">
          <pieChart idName="ycwzzb" :height="300" :chartData="originalData"></pieChart>
        </div>
        <div class="original_article_r" style="padding-top: 40px">
          <el-table
            :data="weekedCircle"
            style="width: 100%">
            <el-table-column
              prop="title"
              label=""
              width="180">
            </el-table-column>
            <el-table-column
              label="周环比"
              align="center"
              width="180">
              <template slot-scope="scope">
                <span class="percentage"
                      :style="{ 'color': getColor(scope.row.sequential),'margin-right':'5px' }">
                  {{ scope.row.sequential }}
                </span>
                <span :style="{'margin-left':'5px'}">{{ scope.row.sequentialtext }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="prevWeek"
              align="center"
              label="上周">
            </el-table-column>
            <el-table-column
              prop="week"
              align="center"
              label="本周">
            </el-table-column>
          </el-table>
        </div>
      </div>

    </div>

    <!--传播时间趋势-->
    <div class="block_rzl" v-if="timeTrendDatas.categoryArr.length">
      <div class="title_rzl">传播时间趋势</div>
      <lineChart idName="timeTrendCharts" :height="400" :chartData="timeTrendDatas" ref="echartsBox"></lineChart>
    </div>

    <!--传播地域分析-->
    <div class="block_rzl" v-if="areaData.length">
      <div class="title_rzl">传播地域分布</div>
      <div class="region clearfix">
        <div class="region_map">
          <mapCharts idName="map" :height="600" :chartData="areaData"></mapCharts>
        </div>

        <div class="region_chart">
          <div class="region_chart_title clearfix">
            <div class="region_chart_title_l">
              <div>覆盖地域数量</div>
              <span>{{areaData.length}}</span>
            </div>
            <div class="region_chart_title_r">
              <div>{{provienceTransName}}地区转载数量</div>
              <span>{{provienceTransnumData?provienceTransnumData:'无'}}</span>
            </div>
          </div>

          <barChart :height="550"
                    idName="time"
                    :chartData="areaRankData"
                    :options="{direction:'vertical',showRankingList:true,emphasizeColor:true}">
          </barChart>

        </div>
      </div>
    </div>

    <!--媒体转载分析-->
    <div class="block_rzl"
         v-if="transMediaTypeData.length||transChannelTypeData.length||platformTransData.length||mediaTransData.length">
      <div class="title_rzl">媒体转载分析</div>
      <div class="reprints clearfix" id="reprints">
        <div class="reprint_per"
             style="border-top: #E2E3E4 1px solid;border-bottom: #E2E3E4 1px solid"
             v-if="transMediaTypeData.length">
          <div class="title_rzl">转载媒体占比</div>
          <!--<div class="halfBox-left">-->
          <pieChart idName="reprint_per1" :height="300" :chartData="transMediaTypeData"/>
          <!--</div>-->
        </div>
        <div class="reprint_per"
             style="border-top: #E2E3E4 1px solid;border-bottom: #E2E3E4 1px solid"
             v-if="transChannelTypeData.length">
          <div class="title_rzl" >转载渠道占比</div>
          <!--<div class="halfBox-right">-->
          <pieChart idName="reprint_per2" :height="300" :chartData="transChannelTypeData"/>
          <!--</div>-->
        </div>
        <div class="reprint_per" v-if="platformTransData.categoryArr.length">
          <div class="title_rzl" >平台转载排行</div>
          <div class="halfBox-left">
            <barChart :height="600"
                      idName="ptzzph"
                      :chartData="platformTransData"
                      :options="{direction:'vertical',showLegend:false}"/>
          </div>
        </div>
        <div class="reprint_per" v-if="mediaTransData.categoryArr.length">
          <div class="title_rzl">媒体转载排行</div>
          <div class="halfBox-right">
            <barChart :height="600"
                      idName="mtzzph"
                      :chartData="mediaTransData"
                      :options="{direction:'vertical',showLegend:false}">
            </barChart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import pieChart from '@/components/common/ZCChartsPie'
  import lineChart from '@/components/common/ZCChartsLine'
  import mapCharts from '@/components/common/mapCharts'
  import barChart from '@/components/common/ZCChartsBar'

  export default {
    name: 'Home-content',
    components: {pieChart, lineChart, mapCharts, barChart},
    props: {
      isGroupPlantform: {type: Boolean, require: true},
      plantformId: {type: String / Number, require: true},
      startTime: {type: String, require: true},
      accountType: {type: String, require: true},
    },
    watch: {
      plantformId(val, oldVal) {
        this.loadAllData(val);
      },
      startTime(val) {
        if (this.plantformId) {
          this.loadAllData(this.plantformId);
        }
      },
      accountType(val) {
        if (this.plantformId) {
          this.loadAllData(this.plantformId);
        }
      }
    },
    data() {
      return {
        fullscreenLoading:false,
        statisticBoxWidth: "0px",
        statisticBoxPadding: "0px",
        homeWorkNumFontSize: "0px",
        homeWorkNumBackgroundSize: "0px",
        //传播情况统计数据
        spreadData: [],
        //各平台作品数对比数据
        platformData: [],
        //作品数
        workCountsData: '0',
        //原创文章占比
        originalData: [],
        weekedCircle: [],
        //传播时间趋势数据
        timeTrendDatas: {categoryArr: [], valueArr: []},
        //传播地域分析数据
        areaOriginalData: [],
        areaData: [],
        provienceTransnumData: 0,
        provienceTransName: '',
        areaRankData: {categoryArr: [], valueArr: []},
        //**********媒体转载分析*********
        //转载媒体占比
        transMediaTypeData: [],
        //转载渠道占比
        transChannelTypeData: [],
        //平台转载排行
        platformTransData: {categoryArr: [], valueArr: []},
        //媒体转载排行
        mediaTransData: {categoryArr: [], valueArr: []},
      }
    },

    methods: {
      getPerPadding: function () {
        var padding = screen.width < 1920 ? 25 : 100;
        return padding + "px"
      },
      getPerWidth: function () {
        var width = screen.width < 1920 ? 25 : 100;
        return "calc(50% - " + (width * 2) + "px)";
      },
      getColor: (sequential) => {
        return !sequential.startsWith("-") ? '#fb5959' : '#46dd31';
      },
      getPlatformPercent: function () {
        return {
          pieIdName: 'platformPercent',
          pieName: '转载占比',
          pieFormatterFun: (params, ticket, callback) => {
            return '{black|' + params.name + '：}{black|' + params.value + '篇}\n{blue|' + params.percent + '%}';
          },
          pieRich: {
            black: {
              align: 'center',
              fontSize: 14,
              padding: [10, 0],
              color: '#444444'
            },
            blue: {
              align: 'center',
              fontSize: 16,
              padding: [8, 0, 0, 0],
              fontWeight: 'bold',
            }
          },
          // radius: ['40%', '45%'],
          center: ['50%', '50%'],
          data: [{
            value: 103,
            name: '名城苏州网'
          }, {
            value: 96,
            name: '微信'
          }, {
            value: 142,
            name: '看苏州APP'
          }, {
            value: 78,
            name: '无线苏州APP'
          }, {
            value: 109,
            name: '微博'
          }],
          pieColor: ['#4642ff', '#00c6ff', '#46dd31', '#ffd541', '#ff9241']
        }
      },
      getOriginalPercent: function () {
        return {
          pieIdName: 'originalPercent',
          pieName: '原创与非原创',
          pieFormatterFun: (params, ticket, callback) => {
            return '{black|' + params.name + '：}{black|' + params.value + '篇}\n{blue|' + params.percent + '%}';
          },
          pieRich: {
            black: {
              align: 'center',
              fontSize: 14,
              padding: [10, 0],
              color: '#444444'
            },
            blue: {
              align: 'center',
              fontSize: 16,
              padding: [8, 0, 0, 0],
              fontWeight: 'bold',
            }
          },
          data: [{
            value: 103,
            name: '原创'
          }, {
            value: 96,
            name: '非原创'
          }],
          pieColor: ['#4642ff', '#00c6ff']
        }
      },
      getOriginalPercentB: function () {
        return {
          pieIdName: 'originalPercentB',
          pieName: '原创与非原创',
          pieFormatterFun: (params, ticket, callback) => {
            return '{black|' + params.name + '：}{black|' + params.value + '篇}\n{blue|' + params.percent + '%}';
          },
          pieRich: {
            black: {
              align: 'center',
              fontSize: 14,
              padding: [10, 0],
              color: '#444444'
            },
            blue: {
              align: 'center',
              fontSize: 16,
              padding: [8, 0, 0, 0],
              fontWeight: 'bold',
            }
          },
          data: [{
            value: 103,
            name: '原创'
          }, {
            value: 96,
            name: '非原创'
          }],
          pieColor: ['#4642ff', '#00c6ff']
        }
      },
      getOriginalPercentA: function () {
        return {
          pieIdName: 'originalPercentA',
          pieName: '原创与非原创',
          pieFormatterFun: (params, ticket, callback) => {
            return '{black|' + params.name + '：}{black|' + params.value + '篇}\n{blue|' + params.percent + '%}';
          },
          pieRich: {
            black: {
              align: 'center',
              fontSize: 14,
              padding: [10, 0],
              color: '#444444'
            },
            blue: {
              align: 'center',
              fontSize: 16,
              padding: [8, 0, 0, 0],
              fontWeight: 'bold',
            }
          },
          data: [{
            value: 103,
            name: '原创'
          }, {
            value: 96,
            name: '非原创'
          }],
          pieColor: ['#4642ff', '#00c6ff']
        }
      },
      getEchartsObj() {
        return this.$refs.echartsBox.echartsObj
      },


      loadAllData(val) {
        //传播情况
        this.loadSpreadData(val);
        if (this.isGroupPlantform == false) {
          this.platformTransData = {categoryArr: [], valueArr: []}
        } else {
          //各平台作品数
          this.loadPlatformData(val);
          //平台转载排行
          this.loadPlatformTransData(val)
        }

        //原创作品数
        this.loadOriginalData(val)
        //周环比
        this.loadCircleData(val);
        //传播地域分析
        this.loadAreaData(val)
        //传播时间趋势
        this.loadTimeTrendData(val);
        // 媒体转载排行
        this.loadMediaTransData(val)
        //媒体转载占比
        this.loadTransMediaTypeData(val)
        //渠道转载占比
        this.loadTransChannelTypeData(val)
      },

      //情况统计
      loadSpreadData(ID) {
        // const loading = this.$loading({
        //   fullscreen:true,
        //   // lock: true,
        //   text: '玩命加载中',
        //   spinner: 'el-icon-loading',
        //   background: 'rgba(0, 0, 0, 0.7)',
        //   customClass:'rgba(1, 1, 1, 1)'
        // });
        this.fullscreenLoading = true;
        var params = {startTime: this.startTime, accountType: this.accountType};
        if (this.plantformId.length > 1) {
          if (this.isGroupPlantform) {
            params.platformTypeId = ID;
          } else {
            params.platformId = ID;
          }
        }
        ;
        //console.log('=======情况统计')
        //console.log(params)
        //console.log('=======情况统计')

        this.$http.get(this.baseUrl + '/spread/accounted', {params: params}).then(function (res) {
          var response = JSON.parse(res.bodyText)
          //console.log('情况统计数据')
          //console.log(response)
          this.spreadData = [];
          this.workCountsData = '0'
          this.fullscreenLoading = false;

          if (response.code == 200 && response.data) {
            this.handleData_spread(response.data)
          }
          // loading.close();

        }, function (err) {
          //console.log('情况统计数据失败');
          //console.log(err);
          // loading.close();

        })
      },
      handleData_spread(data) {
        // //console.log('情况统计数据')
        // //console.log(data)

        this.spreadData = [
          {title: '阅读数', count: data.readNum},
          {title: '转载数', count: data.transNum},
          {title: '收藏数', count: data.collectionNum},
          {title: '分享数', count: data.shareNum},
          {title: '评论数', count: data.commentNum},
          {title: '点赞数', count: data.rewardNum},
          {title: '打赏数', count: data.thumbsNum},
        ];
        if (this.isGroupPlantform) {
          this.workCountsData = data.articleTotalNum.toString();
          var length = 8 - this.workCountsData.length
          var cardinalSize = screen.width < 1920 ? 40 : 60;
          var size = cardinalSize * (1 + (length / 8) * 1.5)
          size = Math.floor(size)
          // this.homeWorkNumFontSize = size + "px";
          // this.homeWorkNumBackgroundSize = size + "px";
        } else {
          this.spreadData.splice(0, 0, {title: '作品数', count: data.articleTotalNum})
        }
        this.layoutSubviews();
      },


      //各平台作品数占比
      loadPlatformData(ID) {
        var params = {startTime: this.startTime, accountType: this.accountType};
        if (this.plantformId.length > 1) {
          if (this.isGroupPlantform) {
            params.platformTypeId = ID;
          } else {
            params.platformId = ID;
          }
        }
        // console.log('======各平台作品数占比')
        // console.log(params)
        // console.log('======各平台作品数占比')
        this.$http.get(this.baseUrl + '/spread/platform/articlenum/accounted', {params: params}).then(function (res) {
          var response = JSON.parse(res.bodyText)
          // console.log('各平台占比数据')
          // console.log(response);
          this.platformData = [];
          if (response.code == 200 && response.data) {
            this.handleData_platform(response.data)
          }
        }, function (err) {
          //console.log('各平台占比数据失败');
          //console.log(err);
        })
      },
      handleData_platform(data) {

        // //console.log('各平台占比');
        // //console.log(data)
        var platformData = [];
        data.forEach(function (value, index) {
          if (value.platformName) {
            if (value.count) {
              platformData.push({name: value.platformName, value: value.count})
            }
          } else {
            if (value.count) {
              platformData.push({name: value.platformTypeName, value: value.count})
            }
          }
        })

        this.platformData = platformData;

        // //console.log(this.platformData)
      },


      //原创文章占比
      loadOriginalData(ID) {
        var params = {startTime: this.startTime, accountType: this.accountType};
        if (this.plantformId.length > 1) {
          if (this.isGroupPlantform) {
            params.platformTypeId = ID;
          } else {
            params.platformId = ID;
          }
        }
        this.$http.get(this.baseUrl + '/spread/platform/originalnum/accounted', {params: params}).then(function (res) {
          var response = JSON.parse(res.bodyText)
          console.log('原创文章数据')
          console.log(response);
          this.originalData = [];
          if (response.code == 200 && response.data) {
            this.handleData_original(response.data)
          }
        }, function (err) {
          //console.log('原创文章数据失败');
          //console.log(err);
        })
      },
      handleData_original(data) {
        // //console.log('原创文章数据');
        // //console.log(data);
        var originalData = [];
        if (data.originalCount != 0 || data.unoriginalCount != 0) {
          originalData.push({name: '原创', value: data.originalCount});
          originalData.push({name: '非原创', value: data.unoriginalCount});
        }
        this.originalData = originalData;
      },


      //周环比数据
      loadCircleData(ID) {
        var params = {startTime: this.startTime, accountType: this.accountType};
        if (this.plantformId.length > 1) {
          if (this.isGroupPlantform) {
            params.platformTypeId = ID;
          }
          else {
            params.platformId = ID;
          }
        }
        //console.log('=======周环比数据')
        //console.log(params)
        //console.log('=======周环比数据')

        this.$http.get(this.baseUrl + '/spread/platform/weeked/circle', {params: params}).then(function (res) {
          var response = JSON.parse(res.bodyText)
          console.log('周环比数据')
          console.log(response)
          this.weekedCircle = [];
          if (response.code == 200 && response.data) {
            this.weekedCircle = response.data
          }
        }, function (err) {
          //console.log('周环比数据失败');
          //console.log(err);
        })
      },


      //传播时间趋势
      loadTimeTrendData(ID) {
        var params = {startTime: this.startTime, accountType: this.accountType};
        if (this.plantformId.length > 1) {
          if (this.isGroupPlantform) {
            params.platformTypeId = ID;
          } else {
            params.platformId = ID;
          }
        }
        this.$http.get(this.baseUrl + '/spreadTrend/timeTrend', {params: params}).then(function (res) {
          var response = JSON.parse(res.bodyText)
          //console.log('传播时间趋势数据')
          //console.log(response);
          this.timeTrendDatas = {categoryArr: [], valueArr: []}
          if (response.code == 200 && response.data) {
            this.handleData_TimeTrend(response.data)
          }

        }, function (err) {

          //console.log('传播时间趋势失败');
          //console.log(err);
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
            // if (index == 0) {
            //   value.value.push(dataValue.comprehensive_num)
            // } else
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
        this.layoutSubviews();
      },


      //传播地域分析
      loadAreaData(ID) {
        var params = {startTime: this.startTime, accountType: this.accountType};
        if (this.plantformId.length > 1) {
          if (this.isGroupPlantform) {
            params.platformTypeId = ID;
          } else {
            params.platformId = ID;
          }
        }
        this.$http.get(this.baseUrl + '/spread/area/current', {params: params}).then(function (res) {
          var response = JSON.parse(res.bodyText)
          //console.log('传播地域分析数据')
          //console.log(response)
          this.areaOriginalData = [];
          this.areaData = [];
          this.areaRankData = {categoryArr: [], valueArr: []}
          if (response.code == 200 && response.data) {
            this.handleData_area(response.data)
            this.handleData_areaRank(response.data)
          }
        }, function (err) {
          //console.log('传播地域分析数据失败');
          //console.log(err);
        })
      },
      handleData_area(data) {
        // //console.log('传播地域分析数据')
        // //console.log(data)
        var areaData = [];
        var thiz = this;
        data.forEach(function (value, index) {
          if (value.province) {
            // areaData.push({name: thiz.cutProvinceName(value.province), value: value.transNum})
            areaData.push({name: value.province, value: value.transNum})
            thiz.areaOriginalData.push(value)
          }
        });
        this.areaData = areaData;

        this.loadProvienceTransnumData(this.plantformId, '江苏省')


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

        if (categoryArr.length > 10) {
          this.areaRankData = {categoryArr: categoryArr.slice(0, 10), valueArr: valueArr.slice(0, 10)}
        } else {
          this.areaRankData = {categoryArr: categoryArr, valueArr: valueArr}
        }

        // //console.log(this.areaRankData)
      },
      areaMapClick({name, index}) {
        // alert(`name=${name},index=${index}`);
        // this.provienceTransName = name;
        var thiz = this;
        this.areaOriginalData.forEach(function (value, index) {
          if (value.province.indexOf(name) != -1) {
            thiz.loadProvienceTransnumData(thiz.plantformId, value.province)
          }
        })

      },


      //某地区转载数量
      loadProvienceTransnumData(ID, province) {
        var params = {startTime: this.startTime, accountType: this.accountType};
        if (this.plantformId.length > 1) {
          if (this.isGroupPlantform) {
            params.platformTypeId = ID;
          } else {
            params.platformId = ID;
          }
        }
        params.province = province;
        this.provienceTransName = this.cutProvinceName(province);
        // console.log(`=======某地区转载数量参数`);
        // console.log(params)
        // console.log(`=======某地区转载数量参数`);
        var thiz = this;
        this.$http.get(this.baseUrl + '/spread/provience/transnum', {params: params}).then(function (res) {
          var response = JSON.parse(res.bodyText)
          // console.log('某地区转载数量数据')
          // console.log(response)
          if (response.code == 200 && response.data) {
            this.handleData_provienceTransnum(response.data);
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


      //转载媒体占比
      loadTransMediaTypeData(ID) {
        var params = {startTime: this.startTime, accountType: this.accountType};
        if (this.plantformId.length > 1) {
          if (this.isGroupPlantform) {
            params.platformTypeId = ID;
          } else {
            params.platformId = ID;
          }
        }
        this.$http.get(this.baseUrl + '/platform/trans/mediatype/find', {params: params}).then(function (res) {
          var response = JSON.parse(res.bodyText)
          //console.log('转载媒体占比数据')
          //console.log(response);
          this.transMediaTypeData = [];
          if (response.code == 200 && response.data) {
            this.handleData_transMediaType(response.data)
          }
        }, function (err) {

          //console.log('转载媒体占比数据失败');
          //console.log(err);
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
        if (this.plantformId.length > 1) {
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
          if (response.code == 200 && response.data) {
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
      loadPlatformTransData(ID) {
        var params = {startTime: this.startTime, accountType: this.accountType};
        if (this.plantformId.length > 1) {
          if (this.isGroupPlantform) {
            params.platformTypeId = ID;
          } else {
            params.platformId = ID;
          }
        }
        //console.log(`=======平台转载排行`);
        //console.log(params)
        //console.log(`=======平台转载排行`);
        this.$http.get(this.baseUrl + '/spread/platform/trans', {params: params}).then(function (res) {
          var response = JSON.parse(res.bodyText)
          //console.log('平台转载排行数据')
          //console.log(response);
          this.platformTransData = {categoryArr: [], valueArr: []}
          if (response.code == 200 && response.data) {
            this.handleData_platformTrans(response.data)
          }
        }, function (err) {
          //console.log('平台转载排行失败');
          //console.log(err);
        })
      },
      handleData_platformTrans(data) {
        //console.log('平台转载排行数据')
        // //console.log(data)

        var categoryArr = [];
        var valueArr = [
          {name: '文章转载篇数', value: []},
        ];

        data.forEach(function (value) {
          if (value.transNum) {
            categoryArr.push(value.platformName);
          }
        });
        valueArr.forEach(function (value, index) {
          data.forEach(function (dataValue) {
            if (dataValue.transNum) {
              value.value.push(dataValue.transNum)
            }
          })
        })
        this.platformTransData = {categoryArr: categoryArr, valueArr: valueArr}
        // //console.log(this.platformTransData)
      },


      //媒体转载排行
      loadMediaTransData(ID) {
        var params = {startTime: this.startTime, accountType: this.accountType};
        if (this.plantformId.length > 1) {
          if (this.isGroupPlantform) {
            params.platformTypeId = ID;
          } else {
            params.platformId = ID;
          }
        }
        this.$http.get(this.baseUrl + '/spreadTrend/mediaOrder', {params: params}).then(function (res) {
          var response = JSON.parse(res.bodyText)
          //console.log('媒体转载排行数据')
          //console.log(response);
          this.mediaTransData = {categoryArr: [], valueArr: []}

          if (response.code == 200 && response.data.mediaList) {
            this.handleData_mediaTrans(response.data.mediaList)
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


      layoutSubviews() {
        var parentWidth = this.$parent.showSiderbar ? screen.width * 0.85 - 117 : screen.width - 117
        var length = this.spreadData.length;
        var width = 0;
        var padding = screen.width < 1920 ? 25 : 45;
        width = (parentWidth - (padding * length * 2)) / length
        if (width > 180) {
          width = 180
          padding = (parentWidth - (180 * length)) / (length * 2)
        }
        if (width < 110) {
          width = 110
          padding = (parentWidth - (110 * length)) / (length * 2)
        }
        if (navigator.userAgent.indexOf('Firefox') >= 0) {
          this.statisticBoxWidth = (Math.floor(width) - 3) + "px"
          this.statisticBoxPadding = (Math.floor(padding)) + "px"
        } else {
          this.statisticBoxWidth = Math.floor(width) + "px"
          this.statisticBoxPadding = Math.floor(padding) + "px"
        }
        this.homeWorkNumFontSize = screen.width < 1920 ? "40px" : "60px";
        this.homeWorkNumBackgroundSize = screen.width < 1920 ? "40px" : "60px";
      }
    },
  }
</script>

<style scoped>

  /*传播情况统计*/
  .statistic {
    background-color: #fff;
    margin-top: 10px;
    padding: 20px 0;
  }

  .statistic .statistic_box {
    float: left;
  }

  .statistic .statistic_boxItem {
    width: 100%;
    border: 4px solid #4642ff;
    padding-bottom: 100%;
    margin: 0 auto;
    border-radius: 50%;
    position: relative;
  }

  .statistic .statistic_boxItem .boxItemContent {
    position: absolute;
    left: 0;
    right: 0;
    top: calc((100% - 60px) / 2);
    text-align: center;
  }

  /*各个平台作品数*/
  .home_works {
    float: left;
    width: 50%;
  }

  .home_works_count, .home_works_ratio {
    height: 300px;
    line-height: 300px;

  }

  .home_works_count .home_works_count_content {
    float: left;
    text-align: center;
  }

  .home_works_count_content .home_works_count_content_num {
    background: url("../../assets/image/artBg.png") no-repeat center;
    margin: 0 auto;
  }

  /*原创文章*/
  .original_article_l, .original_article_r {
    float: left;
    width: 50%;
  }

  /*传播地域分析*/
  .region .region_map {
    float: left;
    width: 56%;
  }

  .region .region_chart {
    float: left;
    width: 38%;
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
  }

  /*媒体转载分析*/

  .reprint_per {
    float: left;
    width: calc(50% - 2px);
    /*border: #E2E3E4 1px solid;*/
    /*border-top: 0;*/

  }

  .halfBox-left {
    width: 86%;
    padding-right: 14%;
    /*padding-left: 7%;*/
  }

  .halfBox-right {
    width: 86%;
    padding-right: 14%;
    /*padding-left: 7%;*/
  }

</style>



