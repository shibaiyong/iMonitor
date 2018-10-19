<template>
  <div class="customConfigureContent clearfix">

    <div class="IM_menu_content">

      <div class="IM_menu_item"
           :style="'width:'+100/menuData.length+'%'"
           v-for="(item,index) in menuData"
           @click="menuClick(index)">

        <!--文字部分-->
        <span class="item_content" :title="item.name">
          {{item.name}}
          <!--底部标记块-->
          <span :class="activeIndex===index?'IM_menu_item_selected':'IM_menu_item_unselected'"></span>
        </span>

      </div>

    </div>

    <div class="configure">

      <input type="text"
             id="configure_input"
             ref="configure_input"
             v-model="configureString"
             @compositionstart="configureCompositionStart"
             @compositionend="configureCompositionEnd"
             @focus="configureInputFocus"
             @input="configureInput">
      <i class="el-icon-loading" style="position: absolute;left: 500px;top: 45px;" v-if="loading"></i>

      <span class="addConfigure bgc_base" :class="selectedConfigure?'':'addConfigure_disabled'" @click="addConfigure">添加检测</span>
      <div class="Tips">注意：&nbsp(1)&nbsp每项最多可添加15个&nbsp&nbsp&nbsp(2)&nbsp添加数据将于次日生效</div>
      <h3>已添加的{{selectedMenuData?selectedMenuData.name:''}}</h3>


      <!--已经添加平台展示页面-->
      <div class="configure_item"
           v-for="(item,index) in configureData"
           @click="configureItemClick(index,$event)">
        <span>{{item.displayName}}</span>
        <i class="el-icon-close" @click="removeConfigureItem(index)" title="删除"></i>
      </div>


      <!--搜索结果展示列表-->
      <div class="search_result"
           ref="search_result"
           v-show="configureResult && configureString">
        <div class="search_result_item"
             v-for="(item,index) in configureResult"
             @click="searchResultItemClick(index)">
          {{item.name}}
        </div>
        <div class="search_result_none"
             v-if="configureResult && !configureResult.length">
          暂无相关数据
        </div>
      </div>

    </div>


    <div class="configure_setting" ref="configure_setting" @click="configureSettingContentClick($event)">
      <div class="configure_setting_content">
        <span style="color: #444">添加用户:</span>
        <span style="color: #999;">{{this.currentConfigure?this.currentConfigure.displayName:''}}</span>

        <div class="user_choose_btn" @click="userChooseBtnClick($event)">
          选择可见用户
          <i class="el-icon-caret-bottom" style="float: right;margin-top: 3px"></i>
        </div>

        <!--当前租户下所有用户-->
        <div class="user_list" id="user_list" ref="user_list">

          <!--<div class="user_list_item" style="cursor: default;">默认全部</div>-->

          <div class="user_list_item"
               v-for="(item,index) in userListAll" @click="userListItemClick(index)">
            <span>{{item.username}}</span>
            <i style="float: right" v-if="item.selected">✔️</i>
          </div>

        </div>

        <div style="font-size: 15px;color: #444;font-weight: 600;margin:20px 0">已添加用户:</div>

        <!--已经添加平台展示页面-->
        <div class="clearfix visible_user">

          <div class="visible_user_item" v-for="(item,index) in userListSelected">
            <span>{{item.username}}</span>
            <i class="el-icon-close"
               style="cursor: pointer;"
               @click="visibleUserRemove(index)"
               title="删除">
            </i>
          </div>

        </div>


        <div class="configure_setting_tools clearfix">
          <div class="setting_tool_item"
               style="margin-right: 20%;background-color: #f3f3f3;"
               @click="cancelAddConfigure($event)">取消</div>
          <div class="setting_tool_item" @click="SureAddConfigure">添加检测</div>
        </div>


      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "custom-configure-content",
    data() {
      return {
        menuData: [
          {name: '网站', type: 1, title: '输入对应的网站名称'},
          {name: 'APP', type: 4, title: '输入对应的APP名称'},
          {name: '微信号', type: 2, title: '输入对应的微信名称、微信号'},
          {name: '微博号', type: 3, title: '输入对应的微博链接'},
        ],
        selectedMenuData: null,

        /*当前点击的类型index*/
        activeIndex: 0,
        /*搜索框输入字符串*/
        configureString: null,
        /*搜索框正在搜索*/
        loading: false,
        /*搜索框正在输入*/
        inputting: false,
        /*搜索结果数组*/
        configureResult: null,
        /*选中的搜索结果数据*/
        selectedConfigure: null,


        /*已添加的定制监测数据*/
        configureData: [],
        /*当前要绑定的平台*/
        currentConfigure:null,

        /*所有用户列表*/
        userListAll:[],
        /*已添加用户列表*/
        userListSelected:[],

      }
    },
    methods: {

      /*菜单点击事件*/
      menuClick(index) {
        this.activeIndex = index;
        this.selectedMenuData = this.menuData[index];
        document.getElementById("configure_input").setAttribute("placeholder", this.selectedMenuData.title);

        //重置操作
        this.configureString = null;
        this.configureResult = null;
        this.selectedConfigure = null;

        //加载已添加的监测项信息
        this.loadConfigureData(this.selectedMenuData.type);
      },


      /***********************搜索框监听方法*******************/
      //失去焦点
      configureInputFocus() {

      },

      //中文输入拼音开始
      configureCompositionStart() {
        this.inputting = true;
      },

      //中文输入拼音开始
      configureCompositionEnd() {
        this.inputting = false;
      },

      //输入事件
      configureInput() {

        if (this.configureString && this.configureString.length && !this.inputting) {
          let result = this.configureString.replace(/\s+/g, "");
          // setTimeout("loadConfigureResultData(result)",5000);
          this.loadConfigureResultData(result);
        }

      },

      /*根据输入搜索内容*/
      loadConfigureResultData(string) {

        if (this.configureResult && this.configureResult.length) this.configureResult.splice(0, this.configureResult.length);
        this.loading = true;
        this.$http.get(this.baseUrl + '/custom/source/info?partten=' + string+'&type='+this.selectedMenuData.type).then(function (res) {
          let response = JSON.parse(res.bodyText);
          this.zc_log('搜索结果');
          this.zc_log(response);
          if (response.code == 200 && response.data) {
            this.handleConfigureResultData(response.data.resultObj, string);
          }

        }, function (err) {
          this.zc_log('搜索结果数据失败');
          this.zc_log(err);
        });

      },
      handleConfigureResultData(data, string) {

        let result = [], thiz = this;

        data.forEach(function (item, index) {

          /*抽离item*/
          let itemM = {name: item.displayName, type: item.type, code: item.code, url: item.url, id: item.innerid}

          /*当数据type和当前页面的type相同*/
          if (itemM.type === thiz.selectedMenuData.type) {

            /*排序,将以搜索内容开头的数据提前*/
            if (itemM.name.indexOf(string) === 0) {
              result.unshift(itemM);
            } else {
              result.push(itemM);
            }
          }

        });
        this.loading = false;

        this.configureResult = result;
      },


      /*搜索结果列表item点击方法*/
      searchResultItemClick(index) {

        this.selectedConfigure = this.configureResult[index];
        this.configureString = this.selectedConfigure.name;
        this.configureResult = null;

      },




      /*********************已添加的监测项*******************/

      /*获取已添加的监测项*/
      loadConfigureData(type) {

        this.$http.get(this.baseUrl + '/custom/source/find?type=' + type).then(function (res) {
          let response = JSON.parse(res.bodyText);
          this.zc_log('获取已添加的监测项');
          this.zc_log(response);
          if (response.code == 200 && response.data) {

            this.configureData = response.data;

          }

        }, function (err) {
          this.zc_log('获取已添加的监测项失败');
          this.zc_log(err);
        });
        // alert(type);

      },


      /*添加检测按钮点击事件*/
      addConfigure() {

        if (!this.selectedConfigure) return;
        // this.configureData.push(this.selectedConfigure);


        let c = this.selectedConfigure,
          params = {code: c.code, displayName: c.name, type: c.type, url: c.url, innerid: c.id};


        this.zc_log(params);
        this.$http.get(this.baseUrl + '/custom/source/save', {params: params}).then(function (res) {
          let response = JSON.parse(res.bodyText);
          this.zc_log('添加监测项');
          this.zc_log(response);

          if (response.code == 200) {
            this.loadConfigureData(this.selectedMenuData.type);
          }

        }, function (err) {
          this.zc_log('添加监测项失败');
          this.zc_log(err);
        });
        this.selectedConfigure = null;
        this.configureString = null;

      },

      /*点击平台显示关联页面*/
      configureItemClick(index, event) {

        if (event && (event.target.localName === 'i')) return ;

        this.currentConfigure = this.configureData[index];

        /*加载当前可见用户列表*/
        this.loadVisibleUserListData();

        this.$refs.configure_setting.style.display = 'block';

      },


      /*移除已添加的监测项*/
      removeConfigureItem(index) {

        let id = this.configureData[index].innerid;
        this.$http.get(this.baseUrl + '/custom/source/del?id=' + id).then(function (res) {
          let response = JSON.parse(res.bodyText);
          this.zc_log('移除已添加的监测项');
          this.zc_log(response);
          if (response.code == 200 && response.data) {
            this.loadConfigureData(this.selectedMenuData.type);
          }

        }, function (err) {
          this.zc_log('移除已添加的监测项失败');
          this.zc_log(err);
        });

      },



      /*********************监测项关联可见用户*******************/

      /*获取当前租户的所有用户*/
      loadTenantUserData() {

        this.$http.get(this.baseUrl + '/custom/source/inews/user/list').then(function (res) {
          let response = JSON.parse(res.bodyText);
          this.zc_log('获取当前租户的所有用户');
          this.zc_log(response);
          if (response.code == 200 && response.data) {
            this.handleTenantUserData(response.data);
          }

        }, function (err) {
          this.zc_log('获取当前租户的所有用户失败');
          this.zc_log(err);
        });

      },
      handleTenantUserData(data){

        let result = [];

        data.forEach(function (item) {
          if(item.username && item.username.length){
            result.push(item)
          }
        });

        this.userListAll = result;

      },


      /*准备对可见用户进行编辑*/
      userChooseBtnClick(event){
        let display = this.$refs.user_list.style.display;
        this.$refs.user_list.style.display = display==='block'?'none':'block';

        this.$refs.user_list.style.width = event.currentTarget.offsetWidth +'px';

      },


      /*当前租户的所有用户点击方法*/
      userListItemClick(index){

        let item = this.userListAll[index];

        if(!item.selected){
          item.selected = true;
          this.userListSelected.push(item);
        }

        this.$set(this.userListAll, "random", {});
        this.$delete(this.userListAll, "random");


      },


      /*加载当前已绑定的用户列表*/
      loadVisibleUserListData(){

        let id = this.currentConfigure.innerid;

        this.$http.get(this.baseUrl + '/custom/source/user/source/list?id='+id).then(function (res) {

          let response = JSON.parse(res.bodyText);
          this.zc_log('加载当前已绑定的用户列表');
          this.zc_log(response);
          if (response.code == 200 && response.data) {
            this.handleVisibleUserListData(response.data);
          }

        }, function (err) {
          this.zc_log('加载当前已绑定的用户列表失败');
          this.zc_log(err);
        });

      },
      handleVisibleUserListData(data){

        let result = [];
        data.forEach(function (item) {
          result.push({username:item.userName,id:item.userId.toString()})
        });

        this.userListAll.forEach(function (userItem) {

          result.forEach(function (dataItem) {
            if(dataItem.username === userItem.username && dataItem.id === userItem.id){
              userItem.selected = true;
            }

          })
        });

        this.$set(this.userListAll, "random", {});
        this.$delete(this.userListAll, "random");

        this.userListSelected = result;

      },



      /*删除当前已绑定的用户*/
      visibleUserRemove(index){

        let item = this.userListSelected[index];

        /*从已选用户列表删除*/
        this.userListSelected.splice(index,1);

        /*所有用户列表标记selected == false*/
        this.userListAll.forEach(function (userItem) {
          if(userItem.id === item.id && userItem.username === item.username){
            userItem.selected = false;
          }
        });

        this.$set(this.userListAll, "random", {});
        this.$delete(this.userListAll, "random");

      },





      /*********************确定/取消*******************/
      configureSettingContentClick(event){
        let className = event.target.className;

        if(className === 'configure_setting_content'){
          this.$refs.user_list.style.display = 'none';
        }
      },

      cancelAddConfigure(event){

        this.$refs.configure_setting.style.display = 'none';
        this.$refs.user_list.style.display = 'none';
        this.userListSelected = [];

      },

      /*增加检测*/
      SureAddConfigure(){

        let params = {
          sourceId:this.currentConfigure.innerid,
          userList:this.userListSelected,
        };

        this.zc_log(params);
        this.$http.post(this.baseUrl + '/custom/source/user/source/relation', params, {emulateJSON: false}).then(function (res) {
          let response = JSON.parse(res.bodyText);
          this.zc_log('增加检测');
          this.zc_log(response);
          if (response.code == 200) {

            this.$refs.configure_setting.style.display = 'none';

            this.alert('添加完成');

          }
        }, function (err) {
          this.zc_log(err);
          this.zc_log('增加检测失败');
        })


      }

    },

    mounted() {

      this.$refs.search_result.style.top = this.$refs.configure_input.offsetHeight + 30 - 1 + 'px';
      this.$refs.search_result.style.width = this.$refs.configure_input.offsetWidth - 2 + 'px';

      this.menuClick(0);

      this.loadTenantUserData();
    }
  }
</script>

<style scoped>

  /*菜单选项*/
  .IM_menu_content {
    width: 100%;
    height: 70px;
    line-height: 60px;
    text-align: center;
    background-color: #f2f2f2;
  }

  .IM_menu_item {
    float: left;
    cursor: pointer;
    color: #444;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    background-color: #fff;
  }

  .IM_menu_item .item_content {
    position: relative;
  }

  .IM_menu_item_selected {
    position: absolute;
    background-color: #3B87F5;
    bottom: -20px;
    left: -50%;
    width: 200%;
    height: 8px;
    border-radius: 4px;
  }

  .IM_menu_item_unselected {
    display: none;
  }

  /*定制功能*/
  .configure {
    position: relative;
    padding: 30px 85px;
  }

  .configure input {
    width: 400px;
    padding: 10px 20px;
    font-size: 15px;
  }

  .configure .addConfigure {
    font-size: 15px;
    padding: 10px 20px;
    color: #fff;
    margin-left: 20px;
    cursor: pointer;
  }

  .configure .addConfigure_disabled {
    background-color: #f2f2f2;
    cursor: default;
    color: #999;
  }

  .configure .Tips {
    margin-top: 15px;
    margin-bottom: 45px;
  }

  /*已添加平台*/
  .configure_item {
    float: left;
    background-color: #f3f3f3;
    border: 1px solid #f3f3f3;
    padding: 8px 10px 8px 20px;
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .configure_item i {
    margin-left: 10px;
    cursor: pointer;
  }

  /*搜索结果展示*/
  .search_result {
    position: absolute;
    max-height: 300px;
    background-color: #FFF;
    overflow-y: auto;
    border: 1px solid #E2E3E4;
  }

  .search_result_item, .search_result_none {
    padding: 5px 20px;
  }

  .search_result_item:hover {
    background-color: #f2f2f2;
    cursor: pointer;
  }

  /*为平台绑定用户*/
  .configure_setting {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: none;
  }

  .configure_setting_content {
    width: 350px;
    background-color: #fff;
    margin: 100px auto 0 auto;
    padding: 30px 60px;
    position: relative;
    font-size: 15px;
    font-weight: 600;
  }
  .configure_setting .user_choose_btn{
    color:#BCBCBC;
    padding: 5px 10px;
    border: 1px solid #e2e3e4;
    border-radius: 5px;
    font-weight: normal;
    cursor: pointer;
    margin-top: 20px;
  }
  .configure_setting .user_list{
    position: absolute;
    max-height: 300px;
    overflow-y: auto;
    display: none;
    background: #FFFFFF;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
    border-radius: 4px;
  }
  .configure_setting .user_list .user_list_item{
    padding: 0 15px;
    color: #444;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
  }


  /*可见用户列表*/
  .visible_user{
    height: 250px;
    overflow-y: auto;
  }

  .visible_user_item{
    float: left;
    color:#999999;
    background-color: #F3F3F3 ;
    padding: 5px 10px;
    margin-bottom: 10px;
    margin-right: 10px;
  }
  .configure_setting_tools{
    margin:20px 0;
  }
  .setting_tool_item{
    float:left;
    background-color: #3B87F5;
    width:40%;
    line-height:40px;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
  }

</style>
