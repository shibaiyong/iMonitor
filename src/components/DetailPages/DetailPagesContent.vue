<template>
  <div class="detail_pages" id="detail_pages">

    <!--新闻数据-->
    <div class="block_rzl clearfix">

      <!--文章正文-->
      <div class="detail_box detail_article">

        <div class="detail_article_title"
             v-if="articleInfo">{{articleInfo?articleInfo.title:null}}
        </div>
        <div class="detail_article_title fontSize14"
             style="color: #444;line-height: 30px;text-align: center;font-weight: 100">
          <span>发布平台:{{articleInfo?articleInfo.source:"无"}} </span>
          <span style="margin-left: 40px">发布时间:{{articleInfo?articleInfo.publishTime:"无"}}</span>
        </div>
        <div class="detail_article_title fontSize14"
             style="color: #444;line-height: 30px;border-bottom: 1px solid #E2E3E4;text-align: center;font-weight: 100">
          <span>文章链接:</span>
          <span class="detail_article_webpage color_base"
                @click="detailArticleWebpageClick">{{articleInfo?articleInfo.url:"无"}}</span>
        </div>
        <div class="detail_article_content" v-html="articleInfo?this.escape2Html(articleInfo.content):null"
             v-if="articleInfo"></div>

      </div>

      <!--文章概况-->
      <div class="detail_box detail_box_right">
        <div class="title_rzl">文章概况</div>
        <tables :data="platformAnalysisData"
                :columnData="platformAnalysisColumnData"
                :showPageControl="false"
                :options="platformAnalysisOptions">
        </tables>
      </div>

      <!--本文转载媒体类型-->
      <div class="detail_box detail_box_right">
        <div class="title_rzl" style="margin-top: 30px">本文转载媒体类型</div>
        <div v-if="transMediaTypeData.length">
          <pieChart :height="200"
                    idName="zzmtlx"
                    :chartData="transMediaTypeData">
          </pieChart>
        </div>
        <div class="noMoreData" style="height: 200px;padding-top: 0;line-height: 200px"
             v-if="!transMediaTypeData.length">暂无相关数据
        </div>

      </div>

      <!--转载趋势-->
      <div class="detail_box detail_box_right">
        <div class="title_rzl" style="margin-top: 20px">传播趋势</div>
        <lineChart height="320" idName="zzqs" v-if="reprintTrend.categoryArr.length"
                   :chartData="reprintTrend"></lineChart>
        <div class="noMoreData" style="height: 320px;padding-top: 0;line-height: 320px"
             v-if="!reprintTrend.categoryArr.length">暂无相关数据
        </div>
      </div>


      <!--传播途径-->
      <div class="detail_box" :style="{width:'100%'}">
        <div class="title_rzl">传播路径</div>

        <!--爆发图和时间线-->
        <div style="text-align: right;margin-bottom: 10px">
          <el-dropdown @command="handleArticalTrackCommand">
            <div class="el-dropdown-link" style="border: 1px solid #999;padding: 5px 10px;border-radius: 5px">
              {{showBurst?"爆发图":"时间线"}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1" key="baofatu">爆发图</el-dropdown-item>
              <el-dropdown-item command="2" key="shijainxian">时间线</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </div>

        <div class="baofatu" v-if="showBurst">
          <div style="border: #E2E3E4 solid 1px;margin-top: 10px" v-if="burstData">
            <graph-chart :height="700" :chartData="burstData"></graph-chart>
          </div>
          <div class="noMoreData" style="height: 100px;padding-top: 0;line-height: 100px"
               v-if="!burstData">暂无相关数据
          </div>

        </div>

        <div class="shijianxian" v-if="!showBurst">
          <div v-if="articalTrack">
            <!--<treeChart :height="500" idName="chuanbolujingdemo" :chartData="articalTrack"></treeChart>-->
            <TimeLine :data="articalTrack"></TimeLine>

          </div>
          <div class="noMoreData" style="height: 100px;padding-top: 0;line-height: 100px"
               v-if="!articalTrack">暂无相关数据
          </div>

        </div>

      </div>

      <!--转载新闻列表-->
      <div class="detail_box" :style="{width:'100%'}">
        <div class="title_rzl" style="margin-bottom: 20px">转载文章列表</div>

        <div class="newslist_screening">
          <el-select :value="newslistSourceValue"
                     size="mini"
                     @change="newsListSourceChange"
                     style="width: 100px">
            <el-option v-for="item in newsListSourceOption"
                       :value="item.value"
                       :label="item.label"
                       :key="item.label"></el-option>
          </el-select>
          <el-select :value="newslistCopyrightValue"
                     size="mini"
                     @change="newsListCopyrightChange"
                     style="width: 100px">
            <el-option v-for="item in newsListCopyrightOption"
                       :value="item.value"
                       :label="item.label"
                       :key="item.label"></el-option>
          </el-select>
        </div>

        <tables :data="newslistData"
                :columnData="newslistcolumnData"
                :showPageControl="false"
                @click-tablecell="clickTablecell"
                :options="newslistDataOptions">
        </tables>
        <div class="newslist_page clearfix">
          <div class="newslist_page_count">
            当前第{{newslistData.length>1?
            (((newsListCurrentPage-1)*10+1)+'-'+(newsListCurrentPage*10>newsListTotal?newsListTotal:newsListCurrentPage*10))
            :newslistData.length}}条 共计{{newsListTotal}}条
          </div>
          <div class="newslist_page_control">
            <el-pagination :background="true" :current-page="newsListCurrentPage" :page-size="10"
                           layout="prev, pager, next,jumper"
                           :total="newsListTotal" @current-change="newslistCurrentChange"></el-pagination>
          </div>
        </div>
      </div>
    </div>


    <!--评论分析部分-->
    <div class="block_rzl comment clearfix" style="padding-top: 0">
      <div class="title_rzl">评论分析</div>

      <div style="border-top: 1px solid #e2e3e4">
        <!--评论情感占比-->
        <div class="comment_item">
          <div class="comment_item_title">评论情感占比</div>
          <div class="comment_item_content" v-if="emotionData.length">
            <pieChart :height="300"
                      idName="qgfx"
                      :chartData="emotionData">
            </pieChart>
          </div>
          <div class="comment_empty" v-else>本文无可用数据</div>
        </div>
        <!--评论典型意见-->
        <div class="comment_item">
          <div class="comment_item_title">评论典型意见</div>
          <div class="comment_item_content" v-if="typicalCases.length">

            <Tables :data="typicalCaseData"
                    :columnData="typicalCaseColumn"
                    :showPageControl="false"
                    :options="typicalCaseOptions">
            </Tables>

            <div style="text-align: right;padding: 5px 0;" v-if="typicalCases.length >typicalCaseSize">
              <el-pagination :background="true" :current-page="typicalCaseCurrent" :page-size="typicalCaseSize"
                             layout="prev, pager, next"
                             :total="typicalCases.length"
                             @current-change="typicalCaseCurrentChange">
              </el-pagination>
            </div>


          </div>
          <div class="comment_empty" v-else>本文无可用数据</div>

        </div>
        <!--评论词云-->
        <div class="comment_item">
          <div class="comment_item_title">评论词云</div>
          <div class="comment_item_content" v-if="commentsWordCloud.length">

            <Wordle :data="commentsWordCloud"></Wordle>

            <!--<WordCloudPic :decorateCircleColor="['#99acfb']"-->
            <!--:size="WordCloudHeight"-->
            <!--:data="commentsWordCloud">-->
            <!--</WordCloudPic>-->
          </div>
          <div class="comment_empty" v-else>本文无可用数据</div>

        </div>
        <!--实体词识别-->
        <div class="comment_item">
          <div class="comment_item_title">实体词识别</div>
          <div class="comment_item_content" style="overflow-y: auto" v-if="tagsData.length">
            <span class="comment_tags" v-for="item in tagsData">{{item}}</span>
          </div>
          <div class="comment_empty" v-else>本文无可用数据</div>

        </div>
        <!--评论时间趋势-->
        <div class="comment_item">
          <div class="comment_item_title">评论时间趋势</div>
          <div class="comment_item_content" v-if="timeData.categoryArr.length">
            <barChart :height="300"
                      idName="time"
                      :chartData="timeData"
                      :options="{direction:'horizontal',showLegend:false}">
            </barChart>
          </div>
          <div class="comment_empty" v-else>本文无可用数据</div>

        </div>
        <!--评论地域分布-->
        <div class="comment_item">
          <div class="comment_item_title">评论地域分布</div>
          <div class="comment_item_content" v-if="areaData.length">
            <mapChart idName="region" height="300" :chartData="areaData" :showProvice="false" showName="文章评论数"></mapChart>
          </div>
          <div class="comment_empty" v-else>本文无可用数据</div>

        </div>


        <!--评论列表-->
        <div class="comments_list" v-if="commentData.length">
          <div class="comment_type">
            <span :class="isHotComment?'selected bgc_base':'nomal color_base'"
                  @click="hotCommentClick(true)">热门评论</span>
            <span :class="!isHotComment?'selected bgc_base':'nomal color_base'"
                  @click="hotCommentClick(false)">最新评论</span>
          </div>
          <div class="commentList_item" v-for="item in commentData">
            <span class="commentList_item_name color_base">{{item.name}}</span>
            <span class="commentList_item_time">{{item.time}}</span>
            <div class="commentList_item_text" v-html="item.text"></div>
          </div>
          <div style="margin-top: 10px">
            <el-pagination
              :background="true"
              layout="total,->,prev, pager, next,->, jumper"
              :total="commentTotal"
              :current-page="commentCurrentPage"
              @current-change="commentsListCurrentChange">
            </el-pagination>
          </div>
        </div>

      </div>
    </div>


  </div>

</template>

<script>
  import GraphChart from '@/components/common/ZCChartsGraph'
  import Tables from '@/components/common/ZCTables'
  import pieChart from '@/components/common/ZCChartsPie'
  import barChart from '@/components/common/ZCChartsBar'
  import lineChart from '@/components/common/ZCChartsLine'
  import mapChart from '@/components/common/mapCharts'
  import WordCloudPic from '@/components/common/WordCloudPic'
  import treeChart from '@/components/common/ZCChartsTree'
  import TimeLine from '../common/ZCTimeLine'
  import Wordle from '../common/ZCWordle'


  export default {
    name: "detail-pages-content",
    components: {
      GraphChart,
      Tables,
      pieChart,
      barChart,
      mapChart,
      lineChart,
      WordCloudPic,
      treeChart,
      TimeLine,
      Wordle
    },
    data() {
      return {

        articleId: null,
        unionId: null,
        fullscreenLoading: false,

        /*平台情况分析*/
        articleInfo: null,
        platformAnalysisData: [],
        platformAnalysisColumnData: [
          {prop: 'QGExponent', label: '文章QG正面值'},
          {prop: 'commentProportion', label: '正面评论占比'},
          {prop: 'clickNum', label: '阅读数'},
          {prop: 'transNum', label: '转载数'},
          {prop: 'commentNum', label: '评论数'},
        ],
        platformAnalysisOptions: {
          id: 'hotwork_content',
          total: 10,
          showBorder: false,
          //表格列样式
          columnStyle: {
            indexs: [0],
            styles: [{textAlign: 'center'}],
            commons: {textAlign: 'center'}
          },
          //表格表头样式
          headerStyle: {
            indexs: [],
            styles: [],
            commons: {backgroundColor: '#f4f4f4', textAlign: 'center', padding: '5px 0'}
          },
        },


        /*本文转载媒体类型*/
        transMediaTypeData: [],
        /*转载趋势*/
        trendType: [
          {name: '阅读数', value: 0},
          {name: '转载数', value: 1},
          {name: '评论数', value: 2},
          {name: '点赞数', value: 3},
        ],
        trendTypeSelected: '阅读数',
        reprintTrendData: [],
        reprintTrend: {categoryArr: [], valueArr: []},


        //传播路径分析
        showBurst: true,
        burstData: null,
        articalTrack: null,
        /*转载新闻列表数据*/
        newsListSourceOption: [
          {
            value: 9,
            label: '全部'
          },
          {
            value: 1,
            label: '网页转载'
          },
          {
            value: 2,
            label: '微信转载'
          },
          {
            value: 3,
            label: '微博转载'
          },
          {
            value: 4,
            label: 'APP转载'
          },
          {
            value: 5,
            label: '搜索引擎'
          },
        ],
        newslistSourceValue: 9,
        newsListCopyrightOption: [
          {
            value: 9,
            label: '全部'
          },
          {
            value: 0,
            label: '版权存疑'
          },
          {
            value: 1,
            label: '注明来源'
          }
        ],
        newslistCopyrightValue: 9,
        newsListCurrentPage: 1,
        newsListTotal: 0,
        newslistData: [],
        newslistcolumnData: [
          {prop: 'num', label: '序号'},
          {prop: 'transMedia', label: '转载媒体'},
          {prop: 'transTitle', label: '转载标题'},
          {prop: 'transTime', label: '转载时间'},
          {prop: 'similarity', label: '相似度'},
          {prop: 'transType', label: '转载类型'},
          {prop: 'tort', label: '侵权情况'},
        ],
        newslistDataOptions: {
          id: 'single_content',
          total: 500,
          //表格列样式
          columnStyle: {
            indexs: [0, 1, 2, 3, 4, 5, 6, 7],
            styles: [
              {width: '80px'},
              {width: '150px'},
              {textAlign: 'left', color: '#3B87F5', cursor: 'pointer'},
              {width: '150px'},
              {width: '150px'},
              {width: '100px'},
              {width: '100px'},
              {width: '100px'},
            ],
            commons: {textAlign: 'center'}
          },
          //表格行样式
          rowStyle: {
            indexs: [],
            styles: [],
            commons: {}
          },
          //表格表头样式
          headerStyle: {
            indexs: [2],
            styles: [{textAlign: 'left'}],
            commons: {backgroundColor: '#f4f4f4', textAlign: 'center', padding: '5px 0'}
          },
          //操作按钮
          handleTitle: '详情'
        },


        /*时间趋势数据*/
        timeData: {categoryArr: [], valueArr: []},

        //地域分布
        areaData: [],

        /*情感分析数据*/
        emotionData: [],
        /*标签数据*/
        tagsData: [],


        //词云
        commentsWordCloud: [],
        WordCloudHeight: '0',

        //典型意见
        typicalCases: [],
        typicalCaseData: [],
        typicalCaseColumn: [
          {prop: 'content', label: '典型意见 '},
          {prop: 'num', label: '相关评论数'},
        ],
        typicalCaseOptions: {
          id: 'typicalCase',
          //表格列样式
          columnStyle: {
            indexs: [0, 1],
            styles: [
              {textAlign: 'left', padding: '0 0 0 10px'},
              {width: '150px', textAlign: 'center'},
            ],
            commons: {textAlign: 'center', padding: '5px 0'}
          },
          //表格表头样式
          headerStyle: {
            indexs: [0, 1],
            styles: [{padding: '0 0 0 10px'}, {textAlign: 'center'}],
            commons: {backgroundColor: '#f4f4f4', padding: '5px 0'}
          },
        },
        typicalCaseCurrent: 0,
        typicalCaseSize: 5,

        /*评论数据*/
        commentData: [],
        commentCurrentPage: 1,
        commentTotal: 0,
        isHotComment: true,


      }
    },
    methods: {


      loadAllData() {

        // 文章详情内容
        this.loadArticleInfo(this.unionId);
        // 平台情况分析接口
        this.loadPlatformAnalysis(this.unionId);
        //本文转载媒体类型
        this.loadArticleTransMediaType(this.unionId);

        /*转载趋势接口*/
        this.loadReprintTrendData(this.unionId);

        // 传播路径-爆发图
        this.loadArticalTrackData(this.unionId);
        // 传播路径-时间线
        this.loadArticalTrackTimeData(this.unionId);

        /*转载新闻列表*/
        this.loadNewslistAnalysis(this.unionId);
        //获取时间趋势接口
        this.loadTimeTrendData(this.unionId);
        // 获取分布接口
        this.loadDistributeData(this.unionId);
        // 评论情感分析
        this.loadCommentsSentimentData(this.unionId);
        // 评论标签
        this.loadCommentsTagsData(this.unionId);
        // 评论词云
        this.loadCommentsWordCloudData(this.unionId);
        // 评论典型意见
        this.loadCommentsOptionsData(this.unionId);
        /*评论列表加载*/
        this.loadCommentsListData(this.unionId);

      },


      /*文章详情内容*/
      loadArticleInfo(id) {
        this.fullscreenLoading = true;
        let params = {id: id};

        // this.zc_log('=======文章详情参数');
        // this.zc_log(params);
        // this.zc_log('=======文章详情参数');
        this.$http.get(this.baseUrl + '/article/analysis/info', {params: params}).then(function (res) {
          let response = JSON.parse(res.bodyText);
          this.zc_log('文章详情接口数据');
          this.zc_log(response);
          this.fullscreenLoading = false;
          this.articleInfo = null;
          if (response.code == 200 && response.data) {
            // this.handleArticleInfo(response.data)
            this.articleInfo = response.data;

          }
        }, function (err) {
          this.fullscreenLoading = false;
          this.zc_log('文章详情接口数据失败');
          this.zc_log(err);
        })
      },
      handleArticleInfo(data) {

        // let result = this.escape2Html(data);
        // this.articleInfo = result;

      },
      //转意符换成普通字符
      escape2Html(str) {
        var arrEntities = {'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"'};
        return str.toString().replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
          return arrEntities[t];
        });
      },
      //  转成空格
      nbsp2Space(str) {
        var arrEntities = {'nbsp': ' '};
        return str.replace(/&(nbsp);/ig, function (all, t) {
          return arrEntities[t]
        })
      },

      //回车转为br标签
      return2Br(str) {
        return str.replace(/\r?\n/g, "<br />");
      },
      //去除开头结尾换行,并将连续3次以上换行转换成2次换行
      trimBr(str) {
        str = str.replace(/((\s| )*\r?\n){3,}/g, "\r\n\r\n");//限制最多2次换行
        str = str.replace(/^((\s| )*\r?\n)+/g, '');//清除开头换行
        str = str.replace(/((\s| )*\r?\n)+$/g, '');//清除结尾换行
        return str;
      },
      // 将多个连续空格合并成一个空格
      mergeSpace(str) {
        str = str.replace(/(\s| )+/g, ' ');
        return str;
      },
      detailArticleWebpageClick() {
        if (this.articleInfo && this.articleInfo.url) {
          window.open(this.articleInfo.url)
        }
      },


      /*平台情况分析接口*/
      loadPlatformAnalysis(id) {
        this.fullscreenLoading = true;
        let params = {id: id};

        this.$http.get(this.baseUrl + '/article/analysis/simple', {params: params}).then(function (res) {
          let response = JSON.parse(res.bodyText);
          this.zc_log('平台情况分析接口数据');
          this.zc_log(response);
          this.fullscreenLoading = false;
          this.platformAnalysisData = [];
          if (response.code == 200 && response.data) {
            let result = response.data;

            if (result.commentProportion) {
              result.commentProportion = (parseFloat(result.commentProportion) * 100).toFixed(2) + '%';

            } else {
              result.commentProportion = '0%';

            }

            if (result.QGExponent) {
              result.QGExponent = (parseFloat(result.QGExponent) *100).toFixed(2);

            }


            this.platformAnalysisData = [result];
          }
        }, function (err) {
          this.fullscreenLoading = false;
          this.zc_log('平台情况分析接口数据');
          this.zc_log(err);
        })
      },


      /*本文转载媒体类型*/
      loadArticleTransMediaType(id) {
        this.fullscreenLoading = true;
        let params = {id: id};

        this.$http.get(this.baseUrl + '/article/analysis/media/prop', {params: params}).then(function (res) {
          let response = JSON.parse(res.bodyText);
          this.zc_log('本文转载媒体类型');
          this.zc_log(response);
          this.fullscreenLoading = false;
          if (response.code == 200 && response.data) {
            this.handleArticleTransMediaType(response.data)
          }

        }, function (err) {
          this.fullscreenLoading = false;
          this.zc_log('本文转载媒体类型');
          this.zc_log(err);
        })
      },
      handleArticleTransMediaType(data) {

        // //this.zc_log('转载媒体占比数据');
        // //this.zc_log(data)
        let transMediaTypeData = [];
        data.forEach(function (value, index) {
          if (parseInt(value.value)) {
            transMediaTypeData.push({name: value.name, value: parseInt(value.value), code: value.code})
          }
        });
        this.transMediaTypeData = transMediaTypeData;
        // //this.zc_log(this.transMediaTypeData)
      },


      /*转载趋势接口*/
      loadReprintTrendData(id) {
        this.fullscreenLoading = true;
        let params = {id: id};

        // this.zc_log('=======转载趋势接口参数');
        // this.zc_log(params);
        // this.zc_log('=======转载趋势接口参数');
        this.$http.get(this.baseUrl + '/article/analysis/current', {params: params}).then(function (res) {
          let response = JSON.parse(res.bodyText);
          this.zc_log('转载趋势接口数据');
          this.zc_log(response);
          this.fullscreenLoading = false;
          this.reprintTrendData = null;
          if (response.code == 200 && response.data) {
            this.reprintTrendData = response.data;
            this.handleReprintTrendData(this.reprintTrendData);
          }
        }, function (err) {
          this.fullscreenLoading = false;
          this.zc_log('转载趋势接口数据error');
          this.zc_log(err);
        })
      },
      handleReprintTrendData(data) {

        let categoryArr = [];
        let valueArr = [
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
        });

        this.timeTrendDatas = {categoryArr: categoryArr, valueArr: valueArr}
        // let thiz = this;
        // data.forEach(function (dataItem, dataIndex) {
        //   valueArr.push({name: dataItem.platformName, value: []});
        //   dataItem.dailyList.forEach(function (listItem, listIndex) {
        //     categoryArr.push(listItem.createTime);
        //     if (thiz.trendTypeSelected === '转载数') {//转载数
        //       valueArr[dataIndex].value.push(listItem.transNum);
        //     } else if (thiz.trendTypeSelected === '评论数') {//评论数
        //       valueArr[dataIndex].value.push(listItem.commentNum);
        //     } else if (thiz.trendTypeSelected === '点赞数') {//点赞数
        //       valueArr[dataIndex].value.push(listItem.appriseNum);
        //     } else {//阅读数
        //       valueArr[dataIndex].value.push(listItem.readNum);
        //     }
        //   });
        // });
        //
        // this.reprintTrend = {categoryArr: categoryArr, valueArr: valueArr};

      },
      handleTrendCommand(command) {

        let thiz = this;
        this.trendType.forEach(function (value) {
          if (value.value === command) {
            thiz.trendTypeSelected = value.name;
          }
        });
        this.handleReprintTrendData(this.reprintTrendData);
      },

      // 传播路径-爆发图
      loadArticalTrackData(id) {
        this.fullscreenLoading = true;
        let params = {unionId: id};

        this.zc_log('=======传播路径-爆发图接口参数');
        this.zc_log(params);
        this.zc_log('=======传播路径-爆发图接口参数');
        this.$http.get(this.baseUrl + '/article/track', {params: params}).then(function (res) {
          let response = JSON.parse(res.bodyText);
          this.zc_log('传播路径-爆发图接口数据');
          this.zc_log(response);
          this.fullscreenLoading = false;
          if (response.code == 200 && response.data) {
            this.handleArticalTrackData(response.data);
          }
        }, function (err) {
          this.fullscreenLoading = false;
          this.zc_log('传播路径-爆发图接口数据error');
          this.zc_log(err);
        })
      },
      handleArticalTrackData(data) {

        if (!data.array01 || !data.array03 || data.array01.length === 0 || data.array03.length === 0) {
          return;
        }

        let trackData = data;
        let list = [
          {
            category: '',
            itemStyle: {color: '#6992a9'},
            symbol: 'diamond',
            symbolSize: 64,
            label: {position: 'inside', color: '#fff'},
            emphasis: {label: {position: 'inside', color: '#fff'}}
          },
          {
            category: '爆发点',
            itemStyle: {color: '#d0605c'},
            symbol: 'circle',
            symbolSize: 54,
          },
          {
            category: '传播点',
            itemStyle: {color: '#79c1a9'},
            symbol: 'circle',
            symbolSize: 30,
          },
        ];

        trackData.array01.forEach(function (value) {

          if (value.name === '传播点') {
            value.itemStyle = list[2].itemStyle;
          } else if (value.name === '爆发点') {
            value.itemStyle = list[1].itemStyle;
          } else {
            value.itemStyle = list[0].itemStyle;
          }

        });

        trackData.array03.forEach(function (value) {

          if (value.category === '传播点') {
            value.symbol = list[2].symbol;
            value.symbolSize = list[2].symbolSize;
            value.emphasis = list[2].emphasis;
          } else if (value.category === '爆发点') {
            value.symbol = list[1].symbol;
            value.symbolSize = list[1].symbolSize;
            value.emphasis = list[1].emphasis;
          } else {
            value.symbol = list[0].symbol;
            value.symbolSize = list[0].symbolSize;
            value.emphasis = list[0].emphasis;
            value.label = list[0].label;
          }
        });

        this.burstData = trackData;

      },


      // 传播路径-时间线
      loadArticalTrackTimeData(id) {

        let params = {unionId: id};
        this.$http.get(this.baseUrl + '/article/distribute', {params: params}).then(function (res) {
          let response = JSON.parse(res.bodyText);
          this.zc_log('传播路径图数据返回');
          this.zc_log(response);
          if (response.code == 200 && response.data) {

            this.articalTrack = response.data;
          }
        }, function (err) {
          //this.zc_log('传播地域分析数据失败');
          //this.zc_log(err);
        })
      },
      handleArticalTrackCommand(command) {

        if (command == '1') {
          this.showBurst = true;
        } else {
          this.showBurst = false;
        }
        // this.zc_log(command);
      },


      /*转载新闻列表*/
      loadNewslistAnalysis(id) {
        this.fullscreenLoading = true;
        let params = {
          id: id,
          pageNo: this.newsListCurrentPage,
          pageSize: 10,
          transType: this.newslistSourceValue,
          tort: this.newslistCopyrightValue
        };

        this.zc_log('=======转载新闻列表参数');
        this.zc_log(params);
        this.zc_log('=======转载新闻列表参数');
        this.$http.get(this.baseUrl + '/article/analysis/newslist', {params: params}).then(function (res) {
          let response = JSON.parse(res.bodyText);
          this.zc_log('转载新闻列表接口数据');
          this.zc_log(response);
          this.fullscreenLoading = false;
          this.newslistData = [];
          this.newsListTotal = 0;
          if (response.code == 200 && response.data) {
            var similarity = 0;
            response.data.transInfoList.forEach(function (item, index) {
              similarity = (item.similarity * 100).toFixed(2) + '%';
              item.similarity = similarity;
              if (!item.tort || !item.tort.length) {
                item.tort = "--";
              }
            });
            this.newslistData = response.data.transInfoList;
            this.newsListTotal = response.data.total;
          }
        }, function (err) {
          this.fullscreenLoading = false;
          this.zc_log('转载新闻列表接口数据error');
          this.zc_log(err);
        })
      },
      newslistCurrentChange(val) {
        this.newsListCurrentPage = val;
        this.loadNewslistAnalysis(this.unionId);
      },
      clickTablecell({rowIndex, columnIndex}) {
        this.zc_log(`行号=${rowIndex},列号=${columnIndex}`);
        if (columnIndex === 7) {
          let webpageCode = this.newslistData[rowIndex].webpageCode;
          let uid = this.unionId;
          window.open('copyright?unionId=' + uid + '&webpageCode=' + webpageCode);
        } else if (columnIndex === 2) {

          let url = this.newslistData[rowIndex].url;
          window.open(url);
        }

      },
      newsListSourceChange(val) {
        this.newslistSourceValue = val;
        this.newsListCurrentPage = 1;
        this.loadNewslistAnalysis(this.unionId);
      },
      newsListCopyrightChange(val) {
        this.newslistCopyrightValue = val;
        this.newsListCurrentPage = 1;
        this.loadNewslistAnalysis(this.unionId);
      },


      // 获取时间趋势接口
      loadTimeTrendData(id) {
        this.fullscreenLoading = true;
        let params = {unionId: id, queryType: 2};
        // this.zc_log('=======获取分布接口');
        // this.zc_log(params);
        // this.zc_log('=======获取分布接口');
        this.$http.get(this.baseUrl + '/comment/getDistribute', {params: params}).then(function (res) {
          let response = JSON.parse(res.bodyText);
          this.zc_log('获取时间趋势接口');
          this.zc_log(response);
          this.fullscreenLoading = false;
          this.timeData = {categoryArr: [], valueArr: []};

          if (response.code == 200 && response.data) {
            this.handleTimeTrendData(response.data);
          }

        }, function (err) {
          this.fullscreenLoading = false;
          this.zc_log('获取时间趋势接口失败');
          this.zc_log(err);
        })
      },
      handleTimeTrendData(data) {

        let categoryArr = [];
        let valueArr = [
          {name: '文章评论数', value: []},
        ];
        data.forEach(function (value) {
          categoryArr.push(value.key);
        });
        valueArr.forEach(function (value, index) {
          data.forEach(function (dataValue) {
            value.value.push(dataValue.distribute)
          })
        });
        this.timeData = {categoryArr: categoryArr, valueArr: valueArr};
      },


      /*获取分布接口*/
      loadDistributeData(id) {
        this.fullscreenLoading = true;
        // queryType:1查询地域分布 2查询时间分布
        let params = {unionId: id, queryType: 1};

        // this.zc_log('=======获取分布接口');
        // this.zc_log(params);
        // this.zc_log('=======获取分布接口');
        this.$http.get(this.baseUrl + '/comment/getDistribute', {params: params}).then(function (res) {
          let response = JSON.parse(res.bodyText);
          this.zc_log('获取分布接口数据');
          this.zc_log(response);
          this.fullscreenLoading = false;
          this.areaData = [];
          if (response.code == 200 && response.data) {
            this.handleDistributeData(response.data)
          }
        }, function (err) {
          this.fullscreenLoading = false;
          this.zc_log('获取分布接口数据失败');
          this.zc_log(err);
        })
      },
      handleDistributeData(data) {
        let result = [];
        data.forEach(function (value, index) {
          result.push({name: value.key, value: value.distribute})
        });

        this.areaData = result;
      },


      /*评论情感分析*/
      loadCommentsSentimentData(id) {
        this.fullscreenLoading = true;
        let params = {unionId: id};

        // this.zc_log('=======评论情感分析参数');
        // this.zc_log(params);
        // this.zc_log('=======评论情感分析参数');
        this.$http.get(this.baseUrl + '/comment/getSentiment', {params: params}).then(function (res) {
          let response = JSON.parse(res.bodyText);
          this.zc_log('评论情感分析加载数据');
          this.zc_log(response);
          this.fullscreenLoading = false;
          if (response.code == 200 && response.data) {
            this.handleCommentsSentimentData(response.data)
          }

        }, function (err) {
          this.fullscreenLoading = false;
          this.zc_log('评论情感分析加载数据');
          this.zc_log(err);
        })
      },
      handleCommentsSentimentData(data) {
        let list = [];
        data.forEach(function (value) {
          list.push({name: value.content, value: value.num});
        });
        this.emotionData = list;
      },


      /*评论标签*/
      loadCommentsTagsData(id) {
        this.fullscreenLoading = true;
        let params = {unionId: id};

        // this.zc_log('=======评论标签参数');
        // this.zc_log(params);
        // this.zc_log('=======评论标签参数');
        this.$http.get(this.baseUrl + '/comment/getTags', {params: params}).then(function (res) {
          let response = JSON.parse(res.bodyText);
          this.zc_log('评论标签加载数据');
          this.zc_log(response);
          this.fullscreenLoading = false;
          this.tagsData = [];
          if (response.code == 200 && response.data) {

            this.handleCommentsTagsData(response.data)
          }

        }, function (err) {
          this.fullscreenLoading = false;
          this.zc_log('评论标签加载数据失败');
          this.zc_log(err);
        })
      },
      handleCommentsTagsData(data) {

        let list = [];
        data.forEach(function (value) {
          list.push(value.content);
        });
        this.tagsData = list;
      },

      /*评论词云*/
      loadCommentsWordCloudData(id) {
        this.fullscreenLoading = true;
        let params = {unionId: id};

        // this.zc_log('=======评论词云参数');
        // this.zc_log(params);
        // this.zc_log('=======评论词云参数');
        this.$http.get(this.baseUrl + '/comment/getWordCloud', {params: params}).then(function (res) {
          let response = JSON.parse(res.bodyText);
          this.zc_log('评论词云加载数据');
          this.zc_log(response);
          this.fullscreenLoading = false;
          this.commentsWordCloud = [];
          if (response.code == 200 && response.data) {
            this.handleCommentsWordCloudData(response.data);
          }
        }, function (err) {
          this.fullscreenLoading = false;
          this.zc_log('评论词云加载数据失败');
          this.zc_log(err);
        })
      },

      handleCommentsWordCloudData(data) {

        let result = [];

        data.forEach(function (value, index) {

          result.push({value: value.score, name: value.content})
        });

        this.commentsWordCloud = result;

      },


      /*评论典型意见*/
      loadCommentsOptionsData(id) {
        this.fullscreenLoading = true;
        let params = {unionId: id};

        this.$http.get(this.baseUrl + '/comment/getOpinions', {params: params}).then(function (res) {
          let response = JSON.parse(res.bodyText);
          this.zc_log('评论典型意见加载数据');
          this.zc_log(response);
          this.fullscreenLoading = false;
          if (response.code == 200 && response.data) {

            // this.handleCommentsOptionsData(response.data);
            this.typicalCases = response.data;
            // this.typicalCases = [
            //   {content:'哈哈1',num:1},
            //   {content:'哈哈2',num:1},
            //   {content:'哈哈3',num:1},
            //   {content:'哈哈4',num:1},
            //   {content:'哈哈5',num:1},
            //   {content:'哈哈6',num:1},
            //   {content:'哈哈7',num:1},
            // ];
            this.typicalCaseCurrentChange(1);
          }

        }, function (err) {
          this.fullscreenLoading = false;
          this.zc_log('评论典型意见加载数据');
          this.zc_log(err);
        })
      },
      handleCommentsOptionsData(data) {

        let categoryArr = [];
        let valueArr = [
          {name: '文章评论数', value: []},
        ];
        data.forEach(function (value) {
          categoryArr.push(value.content);
        });
        valueArr.forEach(function (value, index) {
          data.forEach(function (dataValue) {
            value.value.push(dataValue.num)
          })
        });

        this.typicalCaseData = {categoryArr: categoryArr, valueArr: valueArr}

      },
      typicalCaseCurrentChange(val) {
        this.typicalCaseCurrent = val;

        let start = (val - 1) * this.typicalCaseSize,
          end = (val * this.typicalCaseSize > this.typicalCaseCurrent.length) ? this.typicalCaseCurrent.length : val * this.typicalCaseSize
        let result = this.typicalCases.slice(start, end);
        this.typicalCaseData = result;

      },

      /*评论列表加载*/
      loadCommentsListData(id) {
        this.fullscreenLoading = true;
        let params = {
          unionId: id,
          orderField: this.isHotComment ? 'upNum' : 'publishTime',
          pageNo: this.commentCurrentPage,
          pageSize: 10
        };

        // this.zc_log('=======评论列表加载');
        // this.zc_log(params);
        // this.zc_log('=======评论列表加载');
        this.$http.get(this.baseUrl + '/comment/findComments', {params: params}).then(function (res) {
          let response = JSON.parse(res.bodyText);
          this.zc_log('评论列表加载数据');
          this.zc_log(response);
          this.fullscreenLoading = false;
          this.commentData = [];
          if (response.code == 200 && response.data.content) {
            this.handleCommentsListData(response.data);
          }

        }, function (err) {
          this.fullscreenLoading = false;
          this.zc_log('评论列表加载数据失败');
          this.zc_log(err);
        })
      },
      handleCommentsListData(data) {

        let list = [];
        let thiz = this;
        data.content.forEach(function (value) {

          let pubTime = new Date(value.publishTime);

          let year = pubTime.getFullYear();
          let month = pubTime.getMonth();
          let day = pubTime.getDate();
          let hour = pubTime.getHours();
          let minutes = pubTime.getMinutes();

          let time = year + '-' + (month < 10 ? ('0' + month) : month) + '-' + (day < 10 ? ('0' + day) : day) + ' ' + (hour < 10 ? ('0' + hour) : hour) + ':' + (minutes < 10 ? ('0' + minutes) : minutes)
          list.push({
            name: value.userName,
            time: thiz.dataFormat(value.publishTime),
            text: value.content
          })
        });
        this.commentData = list;
        this.commentTotal = data.totalElements;
      },
      commentsListCurrentChange(val) {
        this.commentCurrentPage = val;
        this.loadCommentsListData(this.unionId);
      },
      hotCommentClick(isHotComment) {
        this.commentCurrentPage = 1;
        this.isHotComment = isHotComment;
        this.loadCommentsListData(this.unionId);
      },


    },

    mounted() {
      this.unionId = this.$route.query.uid;
      this.loadAllData();

      this.WordCloudHeight = (screen.width - 100) / (2 * 1.5);

    },
    created() {
      let data = {
        id: "detail_pages",
        name: document.title
      };
      this.registerCreateReportParams(this.$route.path, data);
    }
  }
</script>

<style scoped>

  .detail_box, .detail_box2 {
    float: left;
    margin-top: 20px;
    background-color: #fff;
  }

  /*文章正文*/
  .detail_article {
    height: calc(800px - 2px);
    width: calc(50% - 62px);
    border: 1px solid #E2E3E4;
    margin-top: 0;
    overflow-y: auto;
    padding: 0 30px;
  }

  .detail_article_title {
    text-align: center;
    line-height: 60px;
    /* font-size: 20px; */
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .detail_article_webpage {
    text-decoration: underline;
    cursor: pointer;
  }

  .detail_article_content {
    margin-top: 20px;
  }

  /*平台情况分析 转载趋势*/
  .detail_box_right {
    margin: 0;
    padding-left: 50px;
    width: calc(50% - 50px);
  }

  .newslist_screening {
    margin-bottom: 20px;
  }

  .newslist_page {
    /*height: 50px;*/
    /*line-height: 50px;*/
    padding-top: 20px;
  }

  .newslist_page_count {
    float: left;
    line-height: 30px;
    color: #8c939d;
  }

  .newslist_page_control {
    float: right;
    line-height: 30px;
  }

  /****************评论分析****************/

  .comment_item {
    float: left;
    width: calc((100% - 5%) / 2);
  }

  .comment_item:nth-child(2n) {
    margin-left: 5%;
  }

  .comment_item_content {
    background-color: #fff;
    height: 300px;
  }

  .comment_item_title {
    margin: 15px 0;
    color: #444;
    font-size: 16px;
    font-weight: 500;
  }

  /*实体词识别*/
  .comment_tags {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #3B87F5;
    border-radius: 100px;
    font-size: 15px;
    margin-bottom: 10px;
    margin-right: 15px;
    color: #3B87F5;

  }

  /*评论列表*/
  .comments_list .commentList_item {
    padding: 20px 0;
    border-bottom: #E2E3E4 1px solid;
    /* font-size: 15px; */
  }

  .comments_list .comment_type .selected {
    padding: 5px 20px;
    border-radius: 10px;
    color: #fff;
    display: inline-block;
    /* font-size: 15px; */
    cursor: pointer;
    font-family: "Songti TC";
  }

  .comments_list .comment_type .nomal {
    padding: 5px 20px;
    background: #fff;
    border-radius: 10px;
    display: inline-block;
    /* font-size: 15px; */
    cursor: pointer;
    font-family: "Songti TC";
  }

  .commentList_item .commentList_item_name {
    margin-right: 10px;
  }

  .commentList_item .commentList_item_time {
    color: #E2E3E4;
    font-family: "Songti TC";
  }

  .commentList_item .commentList_item_text {
    color: #444;
    margin-top: 10px;
  }

  .comment_empty {
    background-color: #fbfbfb;
    height: 300px;
    line-height: 300px;
    color: #b7b7b7;
    font-size: 20px;
    text-align: center;
  }
</style>
