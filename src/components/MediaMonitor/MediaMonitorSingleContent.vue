<template>

  <div class="single_content">

    <div class="single_tables">
      <tables :data="tableData"
              :columnData="columnData"
              :options="tableOptions"
              @zctable-update="zctableUpdate"
              @click-tablecell="tablecellClick"
              @handle-cell-click="handleCellClick">
      </tables>
    </div>
  </div>
</template>

<script>

  import Tables from '@/components/common/ZCTables'

  export default {
    name: "media-monitor-single-content",
    components:{Tables},
    data(){
      const item_table =
        {
          platform: '看苏州App',
          title_original: '携手2018年世界杯 蒙牛拥抱新时代',
          reprint: '新浪',
          title_reprint: '携手2018年世界杯 蒙牛拥抱新时代',
          time: '2017-12-22 15:51',
          author: '非首页',
          duration: '3小时',
        };
      return {
        //表格数据
        tableData: Array(15).fill(item_table),
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
          id: 'single_content',
          title: '重点监测媒体转载列表-凤凰网',
          total:500,
          titleStyle: {fontSize: '20px', color: '#111111'},
          //表格列样式
          columnStyle: {
            indexs: [0, 1, 2, 3, 4, 5, 6],
            styles: [
              {width: '100px'},
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
            indexs: [1, 3],
            styles: [{textAlign: 'left'}, {textAlign: 'left'}],
            commons: {backgroundColor: '#f4f4f4', textAlign: 'center', padding: '5px 0'}
          },
          //操作按钮
          handleTitle:'删除'
        },
      }
    },
    methods: {
      zctableUpdate({selected, pageNum, counts}) {
        alert(`筛选项=${selected},当前页=${pageNum},每页数=${counts}`);
      },

      tablecellClick({rowIndex,columnIndex}){
        alert(`行号=${rowIndex},列号=${columnIndex}`);
      },

      handleCellClick({rowIndex}){
        alert(`点击了第${rowIndex}行的操作键`);
      }
    },

    mounted(){
      console.log(this.$route.params.type);
    }
  }
</script>

<style scoped>

  .single_content{
    background-color: #fff;
    padding: 20px 50px;
    margin-top: 5px;
    border-top: #E2E3E4 1px solid;
    border-bottom: #E2E3E4 1px solid;
  }

</style>
