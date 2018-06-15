<template>
  <div class="platform_content">

    <div class="platform_collapse">

      <div class="platform_collapse_header clearfix"
           @click="collapseHeaderClick"
           :style="isActive?'border-bottom: 1px solid #E2E3E4':''">

        <!--折叠按钮-->
        <div class="lineH60" :class="isActive?'arrow_active':'arrow_nomal'"><i :class="isActive?'fa fa-caret-up':'fa fa-caret-down'"/></div>

        <span style="color: #444;font-size: 17px;float: left"
              class="lineH60">选择平台
        </span>
        <span style="color: #e4e4e4;margin-left: 10px;width: 300px;float: left"
              class="lineH60">最多可勾选{{platformsMax}}个平台同时对比
        </span>

        <!--搜索框激活状态-->
        <div class="search_active lineH60" v-show="isActive">
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

        <!--搜索框未激活状态-->
        <div class="search_nomal lineH60" v-show="!isActive">
          <el-autocomplete size="medium"
                           placeholder=""
                           suffix-icon="el-icon-search"
                           :disabled="!isActive">

          </el-autocomplete>
        </div>

        <!--已选平台-->
        <div class="selected lineH60" v-show="platformSelected.length">

          <span style="margin-right: 10px;">已选平台 :</span>

          <!--已选的平台块-->
          <div :class="isActive?'selected_item_active':'selected_item_nomal'"
               v-for="(item,index) in platformSelected"
               :title="item"
               @click="selectedItemClick(index)">
            <span class="selected_item_title">{{item}}</span>
            <!--{{item}}-->
            <i v-if="isActive" class="el-icon-close"/>
          </div>

          <!--清空按钮-->
          <div class="selected_clear"
               v-if="isActive"
               @click="selectedClearClick">
            清空
          </div>
        </div>

      </div>

      <!--折叠面板主体内容-->
      <div :class="isActive?'platform_collapse_item_active':'platform_collapse_item'">

        <div class="collapse_item clearfix" v-for="titles in platformsData">

          <div class="collapse_item_name">{{titles.name+':'}}</div>

          <div class="collapse_item_title">
            <el-checkbox-group v-model="platformSelected" :max="platformsMax">
              <el-checkbox v-for="item in titles.titles"
                           :label="item.title+item.id"
                           :key="item.id"
                           :disabled="platformSelected.length>= platformsMax"
                           >
              </el-checkbox>
            </el-checkbox-group>
          </div>

        </div>

        <div  class="contrast_count" @click="contrastCountClick($event)">
          <span>对比统计</span>
        </div>

      </div>

    </div>

    <!--图表部分-->
    <div class="platform_charts clearfix">
      <div class="platform_charts_item" :class="index%2?'platform_charts_item_right':'platform_charts_item_left'"
           v-for="(item,index) in chartsData">
        <!--<div :style="{height:'300px'}"></div>-->

        <barChart :height="300"
                  :idName="'pddbfx'+index"
                  :chartData="item"
                  :options="{direction:'horizontal'}">
        </barChart>

      </div>
    </div>

  </div>
</template>

<script>

  import barChart from '@/components/common/ZCChartsBar'

  export default {
    name: "platform-content1",
    components:{barChart},
    data() {
      return {
        //当前处于展开状态
        isActive: true,

        //展开数据
        platformsData: [
          {
            name: '网站',
            titles: [
              {title: '网站', id: 1},
              {title: '网站', id: 2},
            ]
          },
          {
            name: 'APP',
            titles: [
              {title: 'APP', id: 1},
              {title: 'APP', id: 2},
            ]
          },
          {
            name: '微信',
            titles: [
              {title: '微信平台名称', id: 1},
              {title: '微信平台名称', id: 2},
              {title: '微信平台名称', id: 3},
              {title: '微信平台名称', id: 4},
              {title: '微信平台名称', id: 5},
              {title: '微信平台名称', id: 6},
              {title: '微信平台名称', id: 7},
              {title: '微信平台名称', id: 8},
              {title: '微信平台名称', id: 9},
              {title: '微信平台名称', id: 10},
              {title: '微信平台名称', id: 11},
              {title: '微信平台名称', id: 12},
              {title: '微信平台名称', id: 13},
              {title: '微信平台名称', id: 14},
              {title: '微信平台名称', id: 15},
              {title: '微信平台名称', id: 16},
              {title: '微信平台名称', id: 17},
              {title: '微信平台名称', id: 18},
              {title: '微信平台名称', id: 19},
              {title: '微信平台名称', id: 20},
              {title: '微信平台名称', id: 21},
              {title: '微信平台名称', id: 22},
              {title: '微信平台名称', id: 23},
              {title: '微信平台名称', id: 24},
              {title: '微信平台名称', id: 25},
              {title: '微信平台名称', id: 26},
              {title: '微信平台名称', id: 27},
              {title: '微信平台名称', id: 28},
              {title: '微信平台名称', id: 29},
              {title: '微信平台名称', id: 30},
              {title: '微信平台名称', id: 31},
              {title: '微信平台名称', id: 32},
              {title: '微信平台名称', id: 33},
              {title: '微信平台名称', id: 34},
              {title: '微信平台名称', id: 35},
              {title: '微信平台名称', id: 36},
              {title: '微信平台名称', id: 37},
            ]
          },
          {
            name: '微博',
            titles: [
              {title: '微博平台名称', id: 1},
              {title: '微博平台名称', id: 2},
              {title: '微博平台名称', id: 3},
              {title: '微博平台名称', id: 4},
              {title: '微博平台名称', id: 5},
              {title: '微博平台名称', id: 6},
              {title: '微博平台名称', id: 7},
              {title: '微博平台名称', id: 8},
              {title: '微博平台名称', id: 9},
              {title: '微博平台名称', id: 10},
              {title: '微博平台名称', id: 11},
              {title: '微博平台名称', id: 12},
            ]
          },
        ],

        // 被选中平台列表
        platformSelected:[],

        // 被选中平台列表最大值
        platformsMax:3,

        //模糊搜索推荐
        recommendsData:[],

        //下拉菜单选中的平台名称
        recommendSelected:'',

        chartsData: [
          {
            categoryArr: ['网易', '凤凰网', '腾讯网', '搜狐', '人民网'],
            valueArr: [
              {name: '首页', value: [1, 20, 9, 5, 5]},
              {name: '非首页', value: [7, 4, 6, 8, 10]},
            ]
          },
          {
            categoryArr: ['网易', '凤凰网', '腾讯网', '搜狐', '人民网'],
            valueArr: [
              {name: '首页', value: [1, 20, 9, 5, 5]},
              {name: '非首页', value: [7, 4, 6, 8, 10]},
            ]
          },
          {
            categoryArr: ['网易', '凤凰网', '腾讯网', '搜狐', '人民网'],
            valueArr: [
              {name: '首页', value: [1, 20, 9, 5, 5]},
              {name: '非首页', value: [7, 4, 6, 8, 10]},
            ]
          },
          {
            categoryArr: ['网易', '凤凰网', '腾讯网', '搜狐', '人民网'],
            valueArr: [
              {name: '首页', value: [1, 20, 9, 5, 5]},
              {name: '非首页', value: [7, 4, 6, 8, 10]},
            ]
          },
        ],
      }
    },
    methods: {

      //头部折叠响应方法
      collapseHeaderClick(event) {
        if (event.target.className.indexOf('platform_collapse_header') >= 0 ||
          event.target.className.length==0 ||
          event.target.className.indexOf('arrow') >= 0) {
          this.isActive = !this.isActive;
        }
      },

      //已选平台块点击事件
      selectedItemClick(index){
        if (this.isActive){
          //删除从index开始第1个元素,即为删除第index个元素
          this.platformSelected.splice(index,1)
        }
      },

      //已选平台清空按钮点击
      selectedClearClick(){
        this.platformSelected.splice(0,this.platformSelected.length)
      },

      // 对比统计按钮点击事件
      contrastCountClick(event){
        if (event.target.nodeName == 'SPAN'){
          if (this.platformSelected.length){
            alert('对比统计按钮点击')
          }else {
            alert('请至少选择一个平台')
          }
        }
      },

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
        if (this.platformSelected.length < this.platformsMax) {
          this.platformSelected.push(item.value);
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

    },

    mounted(){
      this.recommendsData = this.loadAll();
    }
  }
</script>

<style scoped>

  @import '../../assets/css/platform/platform.css';




</style>
