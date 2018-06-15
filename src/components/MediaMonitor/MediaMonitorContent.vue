<template>

  <div class="media_monitor">

    <!--重点监测媒体转载列表-->
    <div class="block_rzl">
      <div class="title_rzl" style="margin-bottom: 10px">重点监测媒体转载列表</div>
      <tables :data="tableData"
              :columnData="columnData"
              :options="tableOptions"
              @zctable-update="zctableUpdate"
              @click-tablecell="tablecellClick">
      </tables>
    </div>

    <!--重点监测媒体charts-->
    <div class="block_rzl clearfix">
      <div style="width: 50%;float: left;">
        <div class="title_rzl" style="margin-bottom: 10px">重点监测媒体转载排行</div>
        <!--<div :style="{backgroundColor:this.getRandomColor(),height:'500px'}"></div>-->
        <barChart :height="500"
                  idName="zdjcmtzzph"
                  :chartData="timeData"
                  :options="{direction:'vertical'}">
        </barChart>
      </div>
      <div style="width:50%;float: left;">
        <div class="title_rzl" style="margin-bottom: 10px">平台转载排行</div>
        <!--<div :style="{backgroundColor:this.getRandomColor(),height:'500px'}"></div>-->
        <barChart :height="500"
                  idName="ptzzph"
                  :chartData="timeData"
                  :options="{direction:'vertical'}">
        </barChart>
      </div>
    </div>

  </div>


</template>

<script>
  import Tables from '@/components/common/ZCTables'
  import barChart from '@/components/common/ZCChartsBar'

  export default {
    name: "media-monitor-content",
    components: {Tables, barChart},
    data() {
      return {
        //表格数据
        tableData: Array(10).fill({
          platform: '看苏州App',
          title_original: '携手2018年世界杯 蒙牛拥抱新时代',
          reprint: '新浪',
          title_reprint: '携手2018年世界杯 蒙牛拥抱新时代',
          time: '2017-12-22 15:51',
          author: '非首页',
          duration: '3小时',
        }),
        //表格表头数据
        columnData: [
          {prop: 'platform', label: '平台'},
          {prop: 'title_original', label: '原文标题'},
          {prop: 'reprint', label: '转载媒体'},
          {prop: 'title_reprint', label: '转载标题'},
          {prop: 'time', label: '转载时间'},
          {prop: 'author', label: '当前刊登状态'},
          {prop: 'duration', label: '首页刊登时长'},
        ],
        //表格参数列表
        tableOptions: {
          id:'mediamonitor_content',
          total:500,
          //表格列样式
          columnStyle: {
            indexs: [0, 1, 2, 3, 4, 5, 6],
            styles: [
              {width: '100px', textAlign: 'left'},
              {textAlign: 'left', color: '#4642ff',cursor:'pointer'},
              {width: '100px'},
              {textAlign: 'left', color: '#4642ff',cursor:'pointer'},
              {width: '150px'},
              {width: '120px'},
              {width: '120px'},
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
            indexs: [0, 1, 3],
            styles: [{textAlign: 'left'}, {textAlign: 'left'}, {textAlign: 'left'}],
            commons: {backgroundColor: '#f4f4f4', textAlign: 'center', padding: '5px 0'}
          },
        },


        //传播地域分析数据
        timeData: {
          categoryArr: ['网易', '凤凰网', '腾讯网', '搜狐', '人民网'],
          valueArr: [
            {name: '首页', value: [1, 20, 9, 5, 5]},
            {name: '非首页', value: [7, 4, 6, 8, 10]},
          ]
        },
      }
    },
    methods: {
      zctableUpdate({selected, pageNum, counts}) {
        // alert('筛选项='+selected+','+'当前页='+pageNum+','+'每页数='+counts);
        console.log('筛选项=' + selected + ',' + '当前页=' + pageNum + ',' + '每页数=' + counts);
      },

      tablecellClick({rowIndex,columnIndex}){
        console.log('行=' + rowIndex + ',' + '列=' + columnIndex);
        this.$router.push({path:'/single/mediamonitor'});
      },
    },
  }
</script>


