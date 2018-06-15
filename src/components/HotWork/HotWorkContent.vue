<template>

  <div class="hotwork" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="block_rzl">
      <div class="title_rzl">热门作品</div>
      <tables :data="hotworkData"
              :columnData="hotworkColumn"
              :options="options"
              @refresh-data="refreshData"
              @click-tablecell="clickTablecell">
      </tables>

    </div>
    <!--<div class="empty_block" v-if="!hotworkData.length">暂无相关数据</div>-->
  </div>


</template>

<script>
  import Tables from '@/components/common/ZCTables'

  export default {
    name: "hot-work-content",
    components: {Tables},
    props: {
      isGroupPlantform: {type: Boolean, require: true},
      plantformId: {type: String / Number, require: true},
      startTime: {type: String, require: true},
      accountType: {type: String, require: true},

    },
    watch: {
      plantformId(val) {
        //console.log('plantformId改变了')
        this.loadHotWorkData()
      },
      startTime(val) {
        if (this.plantformId) {
          //console.log('startTime改变了')
          this.loadHotWorkData();
        }
      },
      accountType(val) {
        if (this.plantformId) {
          //console.log('startTime改变了')
          this.loadHotWorkData();
        }
      },
      pageNo(val) {
        //console.log('pageNo改变了')
        this.loadHotWorkData()
      },
      pageSize(val) {
        //console.log('pageSize改变了')
        this.loadHotWorkData()
      },
      order(val) {
        //console.log('order改变了')
        this.loadHotWorkData()
      },
      original(val) {
        //console.log('original改变了')
        this.loadHotWorkData()
      },
    },
    data() {
      return {
        fullscreenLoading:false,

        //热门作品数据
        hotworkData: [],
        hotworkColumn: [],
        options: {},
        total: 0,//作品总数
        pageNo: 1,//当前页码数
        pageSize: 10,//每页条数
        order: 2,//排序
        original: 0//原创非原创排序
      }
    },
    methods: {
      refreshData({selected, currentPage, pageSize, sortingIndex}) {
        //console.log(`筛选项=${selected},当前页=${currentPage},每页数=${pageSize},排序项=${sortingIndex}`);
        this.pageNo = currentPage;
        this.pageSize = pageSize;
        if (sortingIndex >= 3 && sortingIndex <=7) {
          this.order = sortingIndex - 3;
        }
        this.original = selected;
      },
      clickTablecell({rowIndex, columnIndex}) {
        //console.log(`行号=${rowIndex},列号=${columnIndex}`);
        if (columnIndex == 9) {
          var data = this.hotworkData[rowIndex]
          if (!data.platformTypeId || !data.articleId) {
            this.$message({
              duration: 1500,
              message: "参数错误"
            });
            return
          }
          window.open("/spreadAnalyze?platformTypeId="+data.platformTypeId+"&articleId="+data.articleId)
        }
      },

      window: onresize = function () {
        // return (() => {
        //
        // })
        //console.log('hahahaahah')
      },


      //热门作品页
      loadHotWorkData() {

        // const loading = this.$loading({
        //   lock: true,
        //   text: '玩命加载中',
        //   spinner: 'el-icon-loading',
        //   background: 'rgba(0, 0, 0, 0.7)'
        // });

        var params = {
          startTime: this.startTime,
          accountType: this.accountType,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          original: this.original,
          order: this.order
        };
        if (this.plantformId.length > 1) {
          if (this.isGroupPlantform) {
            params.platformTypeId = this.plantformId;
          } else {
            params.platformId = this.plantformId;
          }
        }
        ;
        //console.log('热门作品页参数')
        //console.log(params)
        this.fullscreenLoading = true;

        this.$http.get(this.baseUrl + '/hotarticle/find', {params: params}).then(function (res) {
          var response = JSON.parse(res.bodyText)
          //console.log('热门作品数据');
          //console.log(response)
          this.hotworkData = [];
          this.total = 0;
          if (response.code == 200 && response.data.content) {
            this.handleData_hotwork(response.data,this.order)
          }
          // loading.close();
          this.fullscreenLoading = false;

        }, function (err) {
          //console.log('失败');
          //console.log(err);
          // loading.close();
          this.fullscreenLoading = false;
        })
      },

      handleData_hotwork(data,index) {
        // //console.log('热门作品数据');
        // //console.log(data);
        this.total = data.totalElements;

        this.hotworkData = data.content;

        //筛选数据
        this.hotworkData.forEach(function (value) {
          // 当"作者"为空时显示"-"
          if (value.author == null || value.author.length == 0) {
            value.author = "-";
          }
          value.analyze = "分析"
        })
        this.hotworkColumn = [
          {prop: 'inx', label: '序号'},
          {prop: 'platform', label: '平台'},
          {prop: 'title', label: '文章标题'},
          {prop: 'transNum', label: '转载数'},
          {prop: 'commentNum', label: '评论数'},
          {prop: 'clickNum', label: '阅读数'},
          {prop: 'thumbsNum', label: '点赞数'},
          {prop: 'publishTime', label: '发布时间'},
          {prop: 'author', label: '作者'},
          // {prop: 'analyze', label: '分析'},
        ];

        this.options = {
          id: 'hotwork_content',
          total: this.total,
          showBorder: false,
          //表格列样式
          columnStyle: {
            indexs: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            styles: [
              {width: this.getLineUnitWidth(57) * 3},
              {width: this.getLineUnitWidth(57) * 5,textAlign: 'left'},
              {textAlign: 'left', color: '#4642ff'},
              {width: this.getLineUnitWidth(57) * 4},
              {width: this.getLineUnitWidth(57) * 4},
              {width: this.getLineUnitWidth(57) * 4},
              {width: this.getLineUnitWidth(57) * 4},
              {width: this.getLineUnitWidth(57) * 8},
              {width: this.getLineUnitWidth(57) * 6},
              // {width: this.getLineUnitWidth(61) * 4, color: '#4642ff',cursor: 'pointer'},
            ],
            commons: {textAlign: 'center', color: '#444'}
          },
          //表格表头样式
          headerStyle: {
            indexs: [1,2, 3, 4, 5, 6, 7],
            styles: [
              {textAlign: 'left'},
              {textAlign: 'left'},
              {cursor: 'pointer'},
              {cursor: 'pointer'},
              {cursor: 'pointer'},
              {cursor: 'pointer'},
              {cursor: 'pointer'},
            ],
            commons: {backgroundColor: '#f4f4f4', textAlign: 'center', padding: '5px 0'}
          },
          // 筛选项数据
          selectData: [
            {value: 0, label: '全部'},
            {value: 1, label: '原创'},
            {value: 2, label: '非原创'},
          ]
        };

        // alert(index)
        this.options.columnStyle.styles[index+3].color = '#4642ff';
        this.options.headerStyle.indexs.push(index+3);
        this.options.headerStyle.styles.push({color:'#4642ff'})
      },
    },
  }
</script>

<style>

</style>
