<template>

  <div class="works_content">

    <div class="works_header block_rzl">

      <div class="works_header_search">
        <el-autocomplete size="medium"
                         placeholder="请输入平台名称"
                         v-model="recommendSelected"
                         suffix-icon="el-icon-search"
                         :trigger-on-focus="false"
                         :fetch-suggestions="platformSearch"
                         @select="platformSearchSelect"
                         @focus="platformSearchFocus">
        </el-autocomplete>
      </div>

      <span class="sureBtn">确定</span>
      <span style="line-height: 60px;font-size: 14px;color: #eeeeee">最多可勾选{{worksMax}}个平台进行勾线</span>

      <Tables :data="tableData"
              :columnData="columnData"
              :options="options"
              @click-tablecell="clickTablecell">

      </Tables>

      <div class="works_header_save">
        <span class="saveBtn">保存</span>
      </div>

    </div>

    <div class="block_rzl">
      <div class="title_rzl" style="margin-bottom: 10px">已添加对比列表</div>
      <Tables :data="tableData2"
              :columnData="columnData2"
              :options="options2"
              @click-tablecell="clickTablecell">
      </Tables>

    </div>

  </div>

</template>

<script>

  import Tables from '@/components/common/ZCTables'

  export default {
    name: "works-content",
    components:{Tables},
    data(){
      return {

        //************************头部搜索框参数*****************************
        //下拉菜单选中的平台名称
        recommendSelected:'',
        //模糊搜索推荐
        recommendsData:[],
        worksSelected:[],
        worksMax:3,

        //************************头部表格参数*****************************
        //表格数据
        tableData: Array(2).fill({
          title: '携手2018年世界杯 蒙牛拥抱新时代',
          desc: 'http://www.fontawesome.com.cn/icons/caret-down/',
          index: 1
        }),
        //表格表头数据
        columnData: [
          {prop: 'index', label: ''},
          {prop: 'title', label: '文章标题'},
          {prop: 'desc', label: '文章描述'},
        ],
        options: {
          id: 'works_header_tables',
          total: 2,
          showBorder: false,
          //表格列样式
          columnStyle: {
            indexs: [0, 1, 2],
            styles: [
              {textAlign: 'center',color: '#444',width:'100px'},
              {textAlign: 'left',color: '#4642ff'},
              {textAlign: 'left', color: '#4642ff'},
            ],
          },
          //表格表头样式
          headerStyle: {
            indexs: [0, 1,2],
            styles: [{textAlign: 'left'}, {textAlign: 'left'},{textAlign: 'left'}],
            commons: {backgroundColor: '#f4f4f4', textAlign: 'center', padding: '5px 0'}
          },
        },

        //************************作品对比表格参数*****************************

        //表格数据
        tableData2: Array(8).fill({
          platform: '看苏州App',
          title: '携手2018年世界杯 蒙牛拥抱新时代',
          reprints: '97',
          comments: '97',
          readings: '103',
          praise: '97',
          time: '2017-12-22 15:51',
        }),
        //表格表头数据
        columnData2: [
          {prop: 'time', label: '创建时间'},
          {prop: 'title', label: '文章标题'},
          {prop: 'platform', label: '平台'},
          {prop: 'time', label: '发布时间'},
          {prop: 'reprints', label: '转载数'},
          {prop: 'comments', label: '评论数'},
          {prop: 'readings', label: '阅读数'},
          {prop: 'praise', label: '点赞数'},
          {prop: '', label: '监测状态'},
          {prop: '', label: '监测剩余时间'},
        ],
        options2: {
          id: 'hotwork_content',
          total: 20,
          //表格列样式
          columnStyle: {
            indexs: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            styles: [
              {width: '150px'},
              {textAlign: 'left', color: '#4642ff'},
              {width: '100px'},
              {width: '150px'},
              {width: '70px'},
              {width: '70px'},
              {width: '70px'},
              {width: '70px'},
              {width: '80px'},
              {width: '120px'},
            ],
            commons: {textAlign: 'center', color: '#444'}
          },
          //表格表头样式
          headerStyle: {
            indexs: [1],
            styles: [{textAlign: 'left'}],
            commons: {backgroundColor: '#f4f4f4', textAlign: 'center', padding: '5px 0'}
          },
        },
      }
    },
    methods:{

      //搜索框方法
      platformSearch(queryString, cb){
        var recommends = this.recommendsData;
        var results = recommends.filter(this.createFilter(queryString));
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
        };
      },

      //搜索结果推荐点击事件
      platformSearchSelect(item) {
        if (this.worksSelected.length < this.worksMax) {
          this.worksSelected.push(item.value);
        }
      },

      //搜索框获取焦点事件
      platformSearchFocus(){
        this.recommendSelected = null;
      },

      //用于测试搜索推荐数据
      loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
          { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
          { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
          { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
          { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
          { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
          { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
          { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
          { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
          { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
          { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
          { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
          { "value": "枪会山", "address": "上海市普陀区棕榈路" },
          { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
          { "value": "钱记", "address": "上海市长宁区天山西路" },
          { "value": "壹杯加", "address": "上海市长宁区通协路" },
          { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
          { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
          { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
          { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
          { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
          { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
          { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
          { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
          { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
          { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
          { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
          { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
          { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
          { "value": "浏阳蒸菜", "address": "天山西路430号" },
          { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
          { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
          { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
          { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
          { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
          { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
          { "value": "阳阳麻辣烫", "address": "天山西路389号" },
          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ];
      },


      //头部表格的点击方法
      clickTablecell({rowIndex, columnIndex}) {
        console.log(`行号=${rowIndex},列号=${columnIndex}`);
      },
    },

    mounted(){
      this.recommendsData = this.loadAll();
    }

  }
</script>

<style scoped>

  .works_content {
    background: #FAFAFB;
    margin-top: 5px;
    /*清除双击选中文字效果*/
    user-select: none;
    overflow-x: hidden;
  }
  /*********************页面上半部分***************************/
  .works_content .works_header {
    margin-top: 0;
    padding-top: 0;
  }

  /*搜索框*/
  .works_header .works_header_search {
    float: left;
    margin-right: 30px;
    line-height: 60px;
  }

  .works_header .works_header_search >>> .el-input__inner {
    height: 30px;
    width: 300px;
    border-radius: 50px;
    font-size: 10px;
  }

  /*确认按钮*/
  .works_header .sureBtn{
    line-height: 60px;
    background-color: #4642FF;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 12px;
    cursor: pointer;
    margin-right: 30px;
  }

  /*头部的列表*/
  .works_header .works_header_save{
    text-align: center;
    padding: 20px 0;
    font-size: 13px;
  }

  .works_header .works_header_save span{
    border: #4642FF 1px solid;
    padding: 5px 15px;
    border-radius: 5px;
    background-color: #4642FF;
    color: white;
    cursor: pointer;
  }




</style>
