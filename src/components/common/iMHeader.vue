<template>

  <div id="iM_header">

    <div class="iM_header_search" v-if="!breadcrumbData.length">
      <el-autocomplete placeholder="请输入文章标题"
                       :disabled="true"
                       v-model="searchResult"
                       suffix-icon="el-icon-search"
                       :trigger-on-focus="false"
                       :fetch-suggestions="articleSearch"
                       @select="articleSearchSelect">
      </el-autocomplete>
    </div>

    <div class="iM_header_datapicker" v-if="!breadcrumbData.length">
      已选择:
      <el-select :value="selectedPickerType.name"
                 placeholder="请选择"
                 @change="selectedPickerChanged">
        <el-option
          v-for="(item,index) in pickerTypes"
          :key="index"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>

      <el-date-picker :type="selectedPickerType.value"
                      align="right"
                      v-model="selectedDatePicker"
                      :format="selectedPickerType.format"
                      :editable="false"
                      :clearable="false"
                      :placeholder="'请选择'+selectedPickerType.name+'数据'"
                      prefix-icon="el-icon-arrow-down"
                      :picker-options="{firstDayOfWeek:1,disabledDate(time) {return Date.now() < time.getTime()}}"
                      @change="datePickerChanged">
      </el-date-picker>
    </div>

    <div class="iM_refresh_time" v-if="!breadcrumbData.length">数据更新时间:2018-05-01 4:04</div>


    <div class="breadcrumb" v-if="breadcrumbData.length">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item,index) in breadcrumbData" :to="{path:item.path}" :key="index">{{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="report"><span>生成报告</span></div>

  </div>

</template>

<script>
  export default {
    name: "i-m-header",
    props: {
      breadcrumbData: {
        type: Array,
        require: false,
        default() {
          return [
            // {path:'/',name:'首页'},
            // {path:'/mediamonitor',name:'重点媒体监测'},
            // {path:'/',name:'重点媒体监测列表-凤凰网'},
          ]
        }
      },
    },
    data() {
      return {
        searchResult: '',
        selectedDatePicker: '',
        selectedDatePicker1: '',
        //时间选择器参数
        selectedPickerType: {name: '周', value: 'week', type: 3,format:'yyyy年第WW周'},
        pickerTypes: [
          {name: '天', value: 'date', type: 0,format:'yyyy/MM/dd'},
          {name: '周', value: 'week', type: 3,format:'yyyy年第WW周'},
          {name: '月', value: 'month', type: 2,format:'yyyy年MM月'},
          {name: '年', value: 'year', type: 1,format:'yyyy年'},
        ]
      }
    },
    methods: {

      // ******************************************搜索框方法****************************************//
      //搜索功能
      articleSearch(queryString, callback) {
        var recommends = this.loadAll();
        var results = recommends.filter(this.createFilter(queryString));
        // 调用 callback 返回建议列表的数据
        callback(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
        };
      },
      //搜索结果推荐点击事件
      articleSearchSelect(item) {
        if (item.id != undefined) {
          this.$router.push({path: '/detail/' + item.id});
        }
      },

      //用于测试搜索推荐数据
      loadAll() {
        return [
          {"value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号", "id": "12"},
          {"value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号", "id": "13"},
          {"value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113", "id": "14"},
          {"value": "泷千家(天山西路店)", "address": "天山西路438号"},
          {"value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"},
          {"value": "贡茶", "address": "上海市长宁区金钟路633号"},
          {"value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号"},
          {"value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号"},
          {"value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107"},
          {"value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号"},
          {"value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号"},
          {"value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号"},
          {"value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F"},
          {"value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层", 'id': '100'},
          {"value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号"},
          {"value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路"},
          {"value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺"},
          {"value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819"},
          {"value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306"},
          {"value": "枪会山", "address": "上海市普陀区棕榈路"},
          {"value": "纵食", "address": "元丰天山花园(东门) 双流路267号"},
          {"value": "钱记", "address": "上海市长宁区天山西路"},
          {"value": "壹杯加", "address": "上海市长宁区通协路"},
          {"value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元"},
          {"value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室"},
          {"value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺"},
          {"value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6"},
          {"value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号"},
          {"value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号"},
          {"value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号"},
          {"value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号"},
          {"value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号"},
          {"value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室"},
          {"value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1"},
          {"value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号"},
          {"value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室"},
          {"value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部"},
          {"value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B"},
          {"value": "浏阳蒸菜", "address": "天山西路430号"},
          {"value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路"},
          {"value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室"},
          {"value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号"},
          {"value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号"},
          {"value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位"},
          {"value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号"},
          {"value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼"},
          {"value": "阳阳麻辣烫", "address": "天山西路389号"},
          {"value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13"}
        ];
      },
      // ****************************************时间选择器方法******************************************//

      //日期类型选择器更改
      selectedPickerChanged(item) {
        var thiz = this;
        this.selectedPickerType.value = item;
        this.pickerTypes.forEach(function (value) {
          if (value.value == item) {
            thiz.selectedPickerType.name = value.name;
            thiz.selectedPickerType.format = value.format;
            thiz.selectedPickerType.type = value.type;
          }
        });

        //console.log('类型选择器值=====');
        //console.log(item);
      },

      //日期选择器更改
      datePickerChanged(item) {
        //console.log('日期选择器更改了')
        this.handleDateData(item);
      },

      refreshPickerData(type, time) {
        this.$emit('click-datepicker', {
          type: type,
          time: time
        });
      },

      //用于更新时间选择器上的日期字符串
      refreshSelectedDate(type,time){

        //console.log('更新时间选择器上的日期字符串++type')
        //console.log(type)
        //console.log('更新时间选择器上的日期字符串++time')
        //console.log(time)

        if(type.value == 'week'){
          this.selectedDatePicker = time
        }

      },

      handleDateData(dateM){
        var date = dateM?new Date(dateM):new Date();

        this.refreshSelectedDate(this.selectedPickerType,date);
        window.localStorage.setItem('datePickerClickRecord',date);

        //初始化时候选择上周数据
        var day = date.getDay();
        var result = date.setDate(date.getDate() - day + 1 - (dateM?0:7));
        var startTime = new Date(result).Format('MM/dd/yyyy');
        this.refreshPickerData(this.selectedPickerType.type,startTime);

      }
    },
    mounted() {
      var dateRecord = window.localStorage.getItem('datePickerClickRecord');
      if(dateRecord){
        this.handleDateData(dateRecord)
      }else{
        this.handleDateData();
      }
    }
  }
</script>

<style scoped>

  #iM_header {
    height: 43px;
    padding: 0 50px;
    line-height: 43px;
    background-color: #ffffff;
    border: #E2E3E4 1px solid;
    overflow: hidden;
  }

  .iM_header_search, .iM_header_datapicker, .iM_refresh_time {
    float: left;
    line-height: 43px;
    margin-left: 20px;
  }

  /*搜索框样式*/
  .iM_header_search {
    margin-left: 150px;
  }

  .iM_header_search >>> .el-input__inner {
    width: 400px;
    height: 30px;
    border-radius: 50px;
  }

  /*时间选择器样式*/
  .iM_header_datapicker >>> .el-input__inner {
    height: 30px;
    text-align: center;
    padding: 0;
    cursor: pointer;
  }

  .iM_header_datapicker .el-date-editor {
    width: 130px;
  }

  .iM_header_datapicker >>> .el-input__prefix {
    left: auto;
    right: 0px;
    display: none;
  }

  .iM_header_datapicker .el-select >>> .el-input__inner {
    width: 50px;
  }

  .iM_header_datapicker .el-select >>> .el-input__suffix {
    right: 0px;
    display: none;
  }

  /*刷新时间样式*/
  .iM_refresh_time {
    color: #E2E3E4;
    font-size: 15px;
  }

  /*生成报告样式*/
  .report {
    float: right;
    line-height: 30px;
    padding: 6.5px 0;
  }

  .report span {
    background-color: #4642ff;
    display: inline-block;
    width: 80px;
    text-align: center;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }

  /*面包屑*/
  .breadcrumb {
    /*margin-left: 50px;*/
    float: left;
    height: 43px;
    line-height: 43px;
  }

  .breadcrumb .el-breadcrumb {
    height: 45px;
    line-height: 45px;
  }

  .breadcrumb >>> .el-breadcrumb__inner:hover {
    color: #4642ff;
  }
</style>
