<template>
  <div class="monitorCustomization">
    <div class="choose">
      <div class="choose-platform">
        <span class=" left-title title">选择平台</span>
        <div class="right-search">
          <el-autocomplete
            v-model="state4"
            :fetch-suggestions="querySearchAsync"
            placeholder="输入平台名称"
            @select="handleSelect"
          ></el-autocomplete>
          <i class="el-icon-search search-icon"/>
        </div>
      </div>
      <div class=" choose-item-box">
        <chooseOptionList :listData="itemData" @selectListener="selectListener"/>
      </div>
      <div style="padding-bottom: 8px">
        <el-row>
          <el-col :span="2">
            <div class="title" style="height: 50px;line-height: 50px;margin-left: 40px"> 已选平台</div>
          </el-col>
          <el-col :span="22">
            <div class="show-choose-platform">
              <div class="has-choose">
                <span v-for="(item,index) in selectItemData" v-if="item.choose">{{getSelectListItemName(item.name)}}
                      <i class="fa fa-times canClick" @click="deleteItem(index)"/>
                </span>
              </div>
              <div class="has-choose-name">
                <div class="box">
                  <i>*</i>
                  <div class="hint title">检测组名称</div>
                  <input v-model="chooseName" placeholder="请输入名称"/>
                  <div class="enter canClick" @click="addChooseList()">确定</div>
                  <div class="cancel canClick" @click="clearHasChoose()">清空</div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="show-box">
      <div class="showList">
        <div class="showList-title title">
          已经添加的监测列表
        </div>
        <div class="list-box">
          <monitorList :listData="tableData"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import chooseOptionList from '@/components/Customization/chooseOptionList.vue'
  import monitorList from '@/components/Customization/monitorList.vue'

  export default {

    data() {
      return {
        restaurants: [],
        state4: '',
        timeout: null,
        itemData: null,
        selectItemData: null,
        chooseName: "",
        tableData: []
      };
    },
    components: {chooseOptionList, monitorList},
    methods: {
      loadAll() {
        return [
          {"value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号"},
          {"value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号"},
          {"value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113"},
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
          {"value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层"},
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
      selectListener(index1, index2) {
        var item = this.itemData[index1].items[index2]
        if (item.choose) {
          item.index1 = index1;
          item.index2 = index2;
          item.index = this.selectItemData.length;
          this.selectItemData.push(item)
        } else {
          this.selectItemData.splice(item.index, 1);
          for (var i = 0; i < this.selectItemData.length; i++) {
            this.selectItemData[i].index = i
          }
        }
      },
      getItemDate() {
        return [
          {name: "网站", items: [{name: "名城苏州网", choose: false}, {choose: false}]},
          {name: "App", items: [{name: "看苏州App", choose: false}, {name: "无线苏州App", choose: false}]},
          {
            name: "微信",
            items: [{name: "微信栏目名称", choose: false}, {name: "微信栏目名称", choose: false}, {
              name: "微信栏目名称",
              choose: false
            }, {name: "微信栏目名称", choose: false}, {name: "微信栏目名称", choose: false}, {
              name: "微信栏目名称",
              choose: false
            }, {name: "微信栏目名称", choose: false}]
          },
          {
            name: "微博",
            items: [{name: "微信栏目名称", choose: false}, {name: "微信栏目名称", choose: false}, {
              name: "微信栏目名称",
              choose: false
            }, {name: "微信栏目名称", choose: false}, {name: "微信栏目名称", choose: false}, {
              name: "微信栏目名称",
              choose: false
            }]
          },
        ]
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        // this.timeout = setTimeout(() => {
        cb(results);
        // }, 3000 * Math.random());
      },
      clearHasChoose() {
        this.selectItemData = []
        for (var i = 0; i < this.itemData.length; i++) {
          for (var j = 0; j < this.itemData[i].items.length; j++) {
            this.itemData[i].items[j].choose = false
          }
        }
      },
      addChooseList() {
        var name = this.chooseName
        if (name == "") {
          alert("组名不能为空")
          return
        }
        if (this.selectItemData.length == 0) {
          alert("选项不能为空")
          return
        }
        var content = []
        for (var i = 0; i < this.selectItemData.length; i++) {
          content.push(this.selectItemData[i].name)
        }
        this.tableData.push({
          name: name,
          items: content,
          time: '2018/01/01 18:30'
        })
        this.clearHasChoose()
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      },
      getSelectListItemName(name) {
        return name.length > 16 ? name.slice(0, 15) + "..." : name
      },
      deleteItem(index) {
        var item = this.selectItemData[index]
        var index1 = item.index1
        var index2 = item.index2
        this.itemData[index1].items[index2].choose = false
        this.selectItemData.splice(index, 1);
        for (var i = 0; i < this.selectItemData.length; i++) {
          this.selectItemData[i].index = i
        }
      }
    },
    mounted() {
      this.restaurants = this.loadAll();
      this.itemData = this.getItemDate();
      this.selectItemData = [];
    }
  }
</script>

<style scoped>
  @import '../../assets/css/Customization/monitorCustomization.css';
</style>
