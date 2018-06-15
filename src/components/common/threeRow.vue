<template>
  <div class="hot">
    <el-row type="flex" justify="space-between">
      <el-col>
        <h4>{{hotWork}}</h4>
      </el-col>
    </el-row>

    <el-table :data="tableList" :span-method="objectSpanMethod">
      <el-table-column v-for="item in theadList" :property="item.property" :label="item.label"></el-table-column>
      <el-table-column inline-template label="" align="center" property="id">
        <el-button type="text" size="mini" @click="handleRemove">删除</el-button>
      </el-table-column>
    </el-table>

    <div class="footer">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10,30,40]"
        :page-size="10"
        layout="total,sizes"
        :total="30">
      </el-pagination>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10,30,40]"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="30">
      </el-pagination>
      <el-button size="small">确认</el-button>
    </div>
  </div>
</template>

<script>
  export default{
    name:'hotworkTable',
    data(){
      return{
        hotWork:'已添加对比列表',
        title:'传播监测系统',
        theadList:[
          {property:'createtime',label:'创建时间'},
          {property:'title',label:'文章标题'},
          {property:'media',label:'媒体来源'},
          {property:'time',label:'发布时间'},
          {property:'reprintNum',label:'转载数'},
          {property:'judgeNum',label:'评论数'},
          {property:'readNum',label:'阅读数'},
          {property:'goodNum',label:'点赞数'},
          {property:'monitor',label:'监控状态'},
          {property:'monitortime',label:'监控剩余时间'}
        ],
        tableList:[
          {
            id:'删除',
            media:'齐鲁网',
            title:'携手2018世界杯 蒙牛拥抱新时代',
            reprintNum:'54',
            judgeNum:'22',
            readNum:'66',
            goodNum:'55',
            time:'2017-3-1 15:35',
            writer:'佚名',
            createtime:'2017-1-1 10:35',
            monitor:'监控中',
            monitortime:'7天/14天'
          },
          {
            id:'删除',
            media:'齐鲁网',
            title:'携手2018世界杯 蒙牛拥抱新时代',
            reprintNum:'54',
            judgeNum:'22',
            readNum:'66',
            goodNum:'55',
            time:'2017-3-1 15:35',
            writer:'佚名',
            createtime:'2017-1-1 10:35',
            monitor:'监控中',
            monitortime:'7天/14天'
          },
          {
            id:'删除',
            media:'齐鲁网',
            title:'携手2018世界杯 蒙牛拥抱新时代',
            reprintNum:'54',
            judgeNum:'22',
            readNum:'66',
            goodNum:'55',
            time:'2017-3-1 15:35',
            writer:'佚名',
            createtime:'2017-1-1 10:35',
            monitor:'监控中',
            monitortime:'7天/14天'
          },
          {
            id:'删除',
            media:'齐鲁网',
            title:'携手2018世界杯 蒙牛拥抱新时代',
            reprintNum:'54',
            judgeNum:'22',
            readNum:'66',
            goodNum:'55',
            time:'2017-3-1 15:35',
            writer:'佚名',
            createtime:'2017-1-1 10:35',
            monitor:'监控中',
            monitortime:'7天/14天'
          },
          {
            id:'删除',
            media:'原创',
            title:'携手2018世界杯 蒙牛拥抱新时代',
            reprintNum:'54',
            judgeNum:'22',
            readNum:'66',
            goodNum:'55',
            time:'2017-3-1 15:35',
            writer:'佚名',
            createtime:'2017-1-1 10:35',
            monitor:'监控中',
            monitortime:'7天/14天'
          },
          {
            id:'删除',
            media:'原创',
            title:'携手2018世界杯 蒙牛拥抱新时代',
            reprintNum:'54',
            judgeNum:'22',
            readNum:'66',
            goodNum:'55',
            time:'2017-3-1 15:35',
            writer:'佚名',
            createtime:'2017-1-1 10:35',
            monitor:'监控中',
            monitortime:'7天/14天'
          },
          {
            id:'删除',
            media:'原创',
            title:'携手2018世界杯 蒙牛拥抱新时代',
            reprintNum:'54',
            judgeNum:'22',
            readNum:'66',
            goodNum:'55',
            time:'2017-3-1 15:35',
            writer:'佚名',
            createtime:'2017-1-1 10:35',
            monitor:'监控中',
            monitortime:'7天/14天'
          }
        ]
      }
    },
    methods:{
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if(columnIndex===9||columnIndex===10||columnIndex===8||columnIndex === 0){
          if (rowIndex % 3 === 0) {
            return {
              rowspan: 3,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
      handleRemove(){  //删除当前列
        //var tableData = this.tableList;
        this.$message({message:'删除成功'});
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      loadData:function(pno){
        var url="";
        this.$http.get(url).then(function(response){
          this.tableList=response.resultObj;
        });
      }
    },
    mounted(){
      this.loadData(1);
    }
  }
</script>

<style lang="">
  .el-button{
    margin-left:-540px;
  }
  .footer{
    display:flex;
    justify-content:space-between;
    padding:20px 0;
  }
  .confirm{
    float:right;
  }
  .hot {
    width:95%;
    margin:0 auto;
    padding: 1px 25px;
    background-color:#fff;
  }
  .selectAll{
    float:right;
  }
  .el-table th{
    background-color:#f4f4f4;
  }
  th .cell{
    color:#444;
  }
  .el-table_1_column_3,.el-table_1_column_4{
    color:#4642ff;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-table_1_column_3>.cell:hover{
    cursor: pointer;
    color: #409EFF;
    text-decoration:underline;
  }
  .el-table_1_column_4>.cell:hover{
    cursor: pointer;
    color: #409EFF;
    text-decoration:underline;
  }
  .el-table_1_column_5>.cell:hover{
    cursor: pointer;
    color: #409EFF;
    text-decoration:underline;
  }
  .el-table_1_column_6>.cell:hover{
    cursor: pointer;
    color: #409EFF;
    text-decoration:underline;
  }
  .el-table_1_column_7>.cell:hover{
    cursor: pointer;
    color: #409EFF;
    text-decoration:underline;
  }
</style>
