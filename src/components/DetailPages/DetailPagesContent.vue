<template>
  <div class="detail_pages">

    <!--新闻数据-->
    <div class="block_rzl clearfix">
      <!--文章正文-->
      <div class="detail_box detail_article"></div>

      <!--平台情况分析-->
      <div class="detail_box detail_box_right">
        <div class="title_rzl" style="margin-bottom: 20px">平台情况分析</div>
        <tables :data="tableData"
                :columnData="columnData"
                :options="options">
        </tables>
      </div>

      <!--转载趋势-->
      <div class="detail_box detail_box_right">
        <div class="title_rzl">转载趋势</div>
        <lineChart height="320" idName="zzqs" :chartData="timeData"></lineChart>
      </div>

      <!--传播途径-->
      <div class="detail_box" :style="{width:'100%'}">
        <div class="title_rzl">传播路径</div>
        <div style="border: #E2E3E4 solid 1px;margin-top: 10px">
          <graph-chart style="height: 700px;"></graph-chart>
        </div>
      </div>

      <!--转载新闻列表-->
      <div class="detail_box" :style="{width:'100%'}">
        <div class="title_rzl" style="margin-bottom: 20px">转载新闻列表</div>
        <tables :data="tableData2"
                :columnData="columnData2"
                :options="options2">
        </tables>
      </div>
    </div>

    <!--评价分析-->
    <div class="block_rzl comment clearfix">
      <div class="title_rzl comment_title">评论分析</div>
      <!--时间趋势-->
      <div class="time"
           :style="{height:'500px',width:'calc(100% / 3)',float:'left',}">
        <div class="title_rzl" style="margin-bottom: 20px">时间趋势</div>
        <div>
          <barChart :height="460"
                    idName="time"
                    :chartData="timeData"
                    :options="{direction:'horizontal',showLegend:false}">
          </barChart>
        </div>
      </div>

      <!--地域分布-->
      <div class="region"
           :style="{height:'500px',width:'calc(100% / 3)',float:'left'}">
        <div class="title_rzl" style="margin-bottom: 20px">地域分布</div>
        <div>
          <mapChart idName="region" height="460"></mapChart>
        </div>
      </div>

      <!--情感分析-->
      <div class="emotion"
           :style="{height:'500px',width:'calc(100% / 3)',float:'left'}">
        <div class="title_rzl" style="margin-bottom: 20px">情感分析</div>
        <pieChart :height="460"
                  idName="qgfx"
                  :chartData="emotionData"
                  :options="{radius:['32%','35%']}">
        </pieChart>
      </div>

      <!--相关标签+评论词云-->
      <div style="width: 50%;float: left;margin-top: 20px">
        <!--相关标签-->
        <div class="tags_related clearfix ">
          <div class="title_rzl" style="margin-bottom: 20px">相关标签</div>
          <div class="tags_item" v-for="item in tagsData">
            <el-tag :hit="true" color="#fff" size="medium" borderWidth="2px">{{item}}</el-tag>
          </div>
        </div>
        <!--评论词云-->
        <div class="comment_cloud">
          <div class="title_rzl">评论词云</div>
          <div class="cloud" :style="{backgroundColor:this.getRandomColor(),height:'450px'}"></div>
        </div>
      </div>

      <!--典型意见-->
      <div class="advice">
        <div class="title_rzl" style="margin-bottom: 20px">典型意见</div>
        <barChart :height="560"
                  idName="idea"
                  :chartData="timeData"
                  :options="{direction:'vertical',showLegend:false}">
        </barChart>
      </div>

      <!--评论列表-->
      <div class="comments_list">
        <div class="title_rzl comment_type">
          <span>热门评论</span>
          <span>最新评论</span>
        </div>
        <div class="comment_item" v-for="item in commentData">
          <span class="comment_item_name">{{item.name}}</span>
          <span class="comment_item_time">{{item.time}}</span>
          <div class="comment_item_text">{{item.text}}</div>
        </div>
        <div style="margin-top: 10px">
          <el-pagination
            :background="true"
            layout="total,->,prev, pager, next,->, jumper"
            :total="1000">
          </el-pagination>
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

  export default {
    name: "detail-pages-content",
    components: {GraphChart, Tables, pieChart, barChart, mapChart, lineChart},
    data() {
      return {
        //平台情况分析数据
        tableData: Array(5).fill({
          platform: '看苏州App',
          title: '携手2018年世界杯 蒙牛拥抱新时代111',
          reprints: '97',
          comments: '97',
          readings: '103',
          praise: '97',
          time: '2017-12-22',
          author: 'GG'
        }),
        columnData: [
          {prop: 'platform', label: '平台'},
          {prop: 'time', label: '发布时间'},
          {prop: 'readings', label: '阅读数'},
          {prop: 'reprints', label: '转载数'},
          {prop: 'comments', label: '评论数'},
          {prop: 'praise', label: '点赞数'},
        ],
        options: {
          id: 'hotwork_content',
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


        //转载新闻列表数据
        tableData2: Array(10).fill({
          platform: '98',
          title_original: '携手2018年世界杯 蒙牛拥抱新时代',
          reprint: '新浪',
          title_reprint: '携手2018年世界杯 蒙牛拥抱新时代',
          time: '2017-12-22 15:51',
          time_reprint: '2017-12-22 12:00',
          author: '网页转载',
          duration: '版权存疑',
        }),
        //表格表头数据
        columnData2: [
          {prop: 'time', label: '记录时间'},
          {prop: 'reprint', label: '转载媒体'},
          {prop: 'title_reprint', label: '转载标题'},
          {prop: 'title_original', label: '原文标题'},
          {prop: 'time_reprint', label: '转载时间'},
          {prop: 'platform', label: '相似度'},
          {prop: 'author', label: '转载类型'},
          {prop: 'duration', label: '侵权情况'},
        ],
        //表格参数列表
        options2: {
          id: 'single_content',
          total: 500,
          //表格列样式
          columnStyle: {
            indexs: [0, 1, 2, 3, 4, 5, 6, 7],
            styles: [
              {width: '150px'},
              {width: '100px'},
              {textAlign: 'left', color: '#4642ff', cursor: 'pointer'},
              {textAlign: 'left', color: '#4642ff', cursor: 'pointer'},
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
            indexs: [2, 3],
            styles: [{textAlign: 'left'}, {textAlign: 'left'}],
            commons: {backgroundColor: '#f4f4f4', textAlign: 'center', padding: '5px 0'}
          },
          //操作按钮
          handleTitle: '详情'
        },


        //时间趋势数据
        timeData: {
          categoryArr: ['12/11', '12/12', '12/13', '12/14', '12/15', '12/16'],
          valueArr: [
            {name: '文章评论数', value: [4, 9, 6, 12, 6, 9]}
          ]
        },

        //情感分析数据
        emotionData: [
          {value: 103, name: '中性指数'},
          {value: 96, name: '正面指数'},
          {value: 142, name: '负面指数'}
        ],

        //标签数据
        tagsData: ['周恩来', '戴笠', '曹炳生', '向忠发', '毛泽东', '中央', '中国共产党', '国民党', '民国', '共产党', '中国', '上海', '湖北', '日本', '浏阳'],

        //评论数据
        commentData: [
          {name: '有态度的网友', time: '2017/12/23 12:23', text: '这是做客栈的,自己住的那样这样装修的'},
          {name: '有态度的网友', time: '2017/12/24 20:23', text: '人家就是盖了个酒店,然后搞了一个民宿.你非要写成居住的像家一样'},
          {name: '有态度的网友', time: '2017/12/23 12:23', text: '这是做客栈的,自己住的那样这样装修的'},
          {name: '有态度的网友', time: '2017/12/24 20:23', text: '人家就是盖了个酒店,然后搞了一个民宿.你非要写成居住的像家一样'},
          {name: '有态度的网友', time: '2017/12/23 12:23', text: '这是做客栈的,自己住的那样这样装修的'},
          {name: '有态度的网友', time: '2017/12/24 20:23', text: '人家就是盖了个酒店,然后搞了一个民宿.你非要写成居住的像家一样'},
          {name: '有态度的网友', time: '2017/12/23 12:23', text: '这是做客栈的,自己住的那样这样装修的'},
          {name: '有态度的网友', time: '2017/12/24 20:23', text: '人家就是盖了个酒店,然后搞了一个民宿.你非要写成居住的像家一样'},
        ],
      }
    },
  }
</script>

<style scoped>

  .detail_box {
    float: left;
    margin-top: 20px;
    background-color: #fff;
  }

  /*文章正文*/
  .detail_article {
    height: calc(700px - 2px);
    width: calc(50% - 2px);
    border: 1px solid #E2E3E4;
    margin-top: 0;
  }

  /*平台情况分析 转载趋势*/
  .detail_box_right {
    margin: 0;
    padding-left: 50px;
    width: calc(50% - 50px);
    height: 350px;
  }

  /****************评论分析****************/
  .comment .comment_title {
    margin-bottom: 20px;
    border-bottom: #E2E3E4 1px solid;
    padding-bottom: 10px;
  }

  /*相关标签*/
  .tags_related {
    width: 100%;
  }

  .tags_related .tags_item {
    float: left;
    margin-bottom: 10px;
    margin-right: 20px;
  }

  .tags_related .tags_item >>> .el-tag {
    border: #4642ff solid 1px;
    padding: 0 15px;
    color: #4642ff;
    font-size: 14px;
    width: 100px;
    text-align: center;
  }

  /*典型意见*/
  .advice {
    height: 600px;
    width: 50%;
    float: left;
    margin-top: 20px;
  }

  /*评论列表*/
  .comments_list {
    float: left;
    width: 100%;
    margin-top: 10px;
  }

  .comments_list .comment_item {
    padding: 20px 0;
    border-bottom: #E2E3E4 1px solid;
    font-size: 15px;
  }

  .comments_list .comment_type span {
    padding: 5px 20px;
    background: #4642ff;
    border-radius: 10px;
    color: #fff;
    display: inline-block;
    font-size: 15px;
    cursor: pointer;
    font-family: "Songti TC";
  }

  .comment_item .comment_item_name {
    color: #4642ff;
    margin-right: 10px;
  }

  .comment_item .comment_item_time {
    color: #E2E3E4;
    font-family: "Songti TC";
  }

  .comment_item .comment_item_text {
    color: #444;
    margin-top: 10px;
  }
</style>
