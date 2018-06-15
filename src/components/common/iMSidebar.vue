<template>
  <div class="iM_sidebar">

    <!-- 二级目录 -->
    <div class="iM_sidebar_group"
         @click="sidebarItemClick([])">
      <div :class="topSelected?'iM_sidebar_group_title_selected':'iM_sidebar_group_title'">苏州广播电视总台</div>
    </div>

    <div class="iM_sidebar_group"
         v-for="(items,indexs) in sidebarDatas">
      <!-- 一级目录 -->
      <div :class="(groupSelectedIndex==indexs && titleSelectedIndex==-1)?'iM_sidebar_group_title_selected':(items.items.length==1?'iM_sidebar_group_title_one':'iM_sidebar_group_title')"
           v-text="items.title"
           @click="sidebarItemClick([indexs])"
           @mouseenter="mouseenter(indexs,$event)"
           @mouseleave="mouseleave(indexs)">
      </div>
      <!-- 二级目录 -->
      <div v-for="(item,index) in items.hasHistory?items.history:items.items"
           :class="(titleSelectedIndex==index && groupSelectedIndex==indexs)?'iM_sidebar_item_selected':'iM_sidebar_item'"
           @click="sidebarItemClick([indexs,index])">
        <div :class="(titleSelectedIndex==index && groupSelectedIndex==indexs)?'iM_sidebar_item_title_selected':'iM_sidebar_item_title'"
             v-text="item.title"
             :title="item.title">
        </div>
      </div>
    </div>

    <div class="customization"
         v-if="false"
         @click="goToCustomization">
      <i class="el-icon-plus">定制监测项</i>
    </div>

    <!--扩展页面-->
    <div class="dialog"
         ref="dialog"
         v-show="showDialog"
         v-if="sidebarDatas.length"
         @mouseenter="mouseenter(currentIndex)"
         @mouseleave="mouseleave(currentIndex)">
      <div class="dialog_title"
           v-for="(item,index) in sidebarDatas[currentIndex].items"
           v-text="item.title"
           :title="item.title"
           @click="sidebarItemClick([currentIndex,index])">
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    name: "i-m-sidebar",
    data() {
      return {
        sidebarDatas: [],
        showDialog: false,
        currentIndex: 0,
        topSelected:true,
        groupSelectedIndex:-1,
        titleSelectedIndex:-1,
      }
    },
    methods: {
      goToCustomization() {
        //定制监测页跳转
        this.$router.push('/customization')
      },

      //鼠标事件
      mouseenter(index, event) {
        let dialogArr = this.sidebarDatas[index].items;
        if (dialogArr.length >= 5) {
          this.showDialog = true;
        }
        //记录当前被选中的indexs
        this.currentIndex = index;
        if (event) {
          //修改视图的顶部位置
          this.$refs.dialog.style.top = event.currentTarget.getBoundingClientRect().top + 'px';
          this.$refs.dialog.style.left = event.currentTarget.getBoundingClientRect().right + 'px';
        }
      },
      mouseleave(index) {
        this.showDialog = false;
      },

      //更新点击历史记录
      refreshHistoryData(type) {
        this.showDialog = false;
        let dialogArr = this.sidebarDatas[this.currentIndex].items;
        let dialogItem = dialogArr[type[1]];

        //console.log('~~~~悬浮窗被点击了~~~~~~~');
        //console.log(dialogItem);
        //console.log(this.sidebarDatas);
        this.addHistoryData(dialogItem);
      },
      //本地更新历史记录
      refreshLocalHistoryData(){

        this.sidebarDatas.forEach(function (value,index) {
          if(value.hasHistory && value.title==='微信'){
            var history = value.history;
            history.forEach(function (historyItem,index) {

            })
          }
        })

      },

      //侧边栏数据-加载
      loadData() {
        const loading = this.$loading({
          lock: true,
          text: '玩命加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$http.get(this.baseUrl + '/platform/find?pageNo=1&pageSize=100', {}).then(function (res) {
          var response = JSON.parse(res.bodyText);
          var dataArr = response.data;
          // console.log('侧边栏数据')
          // console.log(response)
          if (response.code == 200) {
            this.handleData(dataArr.content);
          }
          loading.close();
        }, function (res) {
          //console.log('erro')
          //console.log(res);
          loading.close();
        });
      },
      //侧边栏数据-处理
      handleData(data) {
        //console.log('侧边栏数据')
        // //console.log(data)
        var dataGroup = [], map = {};
        data.forEach(function (dataItem) {
          //创建组
          if (!map[dataItem.platformTypeId]) {

            var groupItem = {
              typeID: dataItem.platformTypeId,
              title: dataItem.platformTypeName,
              items: [],
              history:[],
            };
            if(dataItem.platformTypeName === '微信'){
              groupItem.hasHistory = true;
            }else{
              groupItem.hasHistory = false;
            }
            dataGroup.push(groupItem);
            map[dataItem.platformTypeId] = dataItem;
          }
          //为每组增加项目
          dataGroup.forEach(function (groupItem) {
            if(groupItem.typeID == dataItem.platformTypeId){
              groupItem.items.push({title:dataItem.name,typeID:dataItem.id,groupTitle:dataItem.platformTypeName,groupID:dataItem.platformTypeId})
            }
          })
        });
        //console.log(dataGroup);
        this.sidebarDatas = dataGroup

        this.loadHistoryData(dataGroup)
      },


      //微信的点击历史记录-获取
      loadHistoryData(){

        var params = {platformTypeId:'9b113bcb1f804d6b83a7a25f5b761460'};
        this.$http.get(this.baseUrl + '/platform/history/list', {params: params}).then(function (res) {
          var response = JSON.parse(res.bodyText);
          //console.log('微信点击历史数据');
          //console.log(response);
          if (response.code == 200 && response.data) {
            this.handleHistoryData(response.data);
          }
        }, function (res) {
          //console.log('error');
          //console.log(res);
        });
      },
      //微信的点击历史记录-处理
      handleHistoryData(data){

        this.sidebarDatas.forEach(function (value, index) {
          if(value.title === '微信'){
            value.history = [];
            data.forEach(function (dataItem) {
              value.history.push({
                title:dataItem.platformName,
                typeID:dataItem.platformId,
                groupTitle:dataItem.platformTypeName,
                groupID:dataItem.platformTypeId})
            })
          }
        })

        var record = window.localStorage.getItem('sidebarClickRecord');
        //console.log('读取记录')
        //console.log(record)

        var type = [];
        this.sidebarDatas.forEach(function (value,index) {
          if(value.typeID == record){
            type.push(index);
          }
          if(value.hasHistory){
            value.history.forEach(function (item,indexpath) {
              if(item.typeID == record){
                type.push(index)
                type.push(indexpath);
              }
            })
          }else{
            value.items.forEach(function (item,indexpath) {
              if(item.typeID == record){
                type.push(index)
                type.push(indexpath);
              }
            })
          }
        });

        this.sidebarItemClick(type)
      },


      //增加微信历史记录
      addHistoryData(data){
        var params = {platformId:data.typeID,platformName:data.title,platformTypeId:data.groupID,platformTypeName:data.groupTitle};
        //console.log('==========增加微信历史记录');
        //console.log(params);
        //console.log('==========增加微信历史记录');

        this.$http.get(this.baseUrl + '/platform/history/add', {params: params}).then(function (res) {
          var response = JSON.parse(res.bodyText);
          //console.log('增加微信历史记录');
          //console.log(response);
          if (response.code == 200 && response.data){
            this.handleHistoryData(response.data)
          }
        }, function (res) {
          //console.log('增加微信历史记录error');
          //console.log(res);
        });
      },

      // 目录点击事件
      sidebarItemClick(types) {

        console.log('目录点击事件');
        console.log(types);

        var type ;
        if(Object.prototype.toString.call(types)=='[object Array]'){
          type = types;
        }else{
          type = types.split(',')
        }
        var isGroup = null;
        var typeID = null;
        if (type.length == 1) {
          if(this.sidebarDatas[type[0]].items.length == 1){
            return;
          }
          isGroup = true;
          typeID = this.sidebarDatas[type[0]].typeID;

          this.topSelected = false;
          this.groupSelectedIndex = type[0];
          this.titleSelectedIndex = -1;

        } else if (type.length == 2) {
          isGroup = false;
          var hasHistory = this.sidebarDatas[type[0]].hasHistory;
          if(hasHistory && !this.showDialog){
            typeID = this.sidebarDatas[type[0]].history[type[1]].typeID
          }else{
            typeID = this.sidebarDatas[type[0]].items[type[1]].typeID
          }
          console.log(this.sidebarDatas);
          console.log(typeID)
          this.topSelected = false;
          this.groupSelectedIndex = type[0];
          this.titleSelectedIndex = type[1];

        } else {
          isGroup = true;
          typeID = '0';
          this.topSelected = true;
          this.groupSelectedIndex = -1;
          this.titleSelectedIndex = -1;
        }
        //console.log('存储记录')
        //console.log(typeID)
        window.localStorage.setItem('sidebarClickRecord',typeID);
        // 增加历史记录
        if(this.showDialog && !isGroup){
          this.refreshHistoryData(type);
        }

        this.$emit('sidebar-item-click', {
          isGroup: isGroup,
          id: typeID
        });

      },

    },
    mounted() {
      this.loadData()
    }
  }
</script>

<style scoped>

  .iM_sidebar {
    background-color: #fff;
    height: 100%;
    overflow: auto;
  }

  .iM_sidebar_group {
    padding: 5px 0;
  }

  .iM_sidebar_group_title {
    height: 35px;
    line-height: 35px;
    margin-left: 10px;
    font-weight: 600;
    font-size: 20px;
    cursor: pointer;
  }
  .iM_sidebar_group_title_selected{
    height: 35px;
    line-height: 35px;
    margin-left: 10px;
    font-weight: 600;
    font-size: 20px;
    color: #4642ff;
  }
  .iM_sidebar_group_title:hover{
    color: #4642ff;
  }

  .iM_sidebar_group_title_one{
    height: 35px;
    line-height: 35px;
    margin-left: 10px;
    font-weight: 600;
    font-size: 20px;
    cursor: default;
  }

  .iM_sidebar_item {
    background-color: #fff;
    color: #565656;
    padding-left: 20px;
  }

  .iM_sidebar_item_selected{
    color: white;
    background-color: #4642ff;
    padding-left: 20px;
  }
  .iM_sidebar_item:hover {
    color: white;
    background-color: #4642ff;
  }

  .iM_sidebar_item_title {
    height: 50px;
    font-weight: 100;
    line-height: 50px;
    cursor: pointer;
    font-size: 16px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }

  .iM_sidebar_item_title_selected{
    height: 50px;
    font-weight: 100;
    line-height: 50px;
    font-size: 16px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    color: white;
  }
  .customization {
    background-color: #4642ff;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    cursor: pointer;
    margin-bottom: 20px;
  }

  .customization i {
    margin-right: 10px;
    font-weight: 700;
    font-size: 18px;
  }

  .dialog {
    position: fixed;
    width: 600px;
    padding: 10px 10px;
    background-color: #fff;
    border: #E2E3E4 1px solid;
    z-index: 100;
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.2);
  }

  .dialog .dialog_title {
    float: left;
    line-height: 35px;
    width: 100px;
    text-align: left;
    color: #565656;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    padding: 0 10px;

  }

  .dialog .dialog_title:hover {
    color: #4642ff;
    font-weight: 900;
  }
</style>
