<template>
  <div class="iM_sidebar" v-loading.fullscreen.lock="fullscreenLoading">

    <!-- 二级目录 -->
    <div class="iM_sidebar_group"
         @click="sidebarItemClick([])">
      <div :class="topSelected?'iM_sidebar_group_title_selected':'iM_sidebar_group_title'">苏州广播电视总台</div>
    </div>

    <!--<div class="iM_sidebar_group"-->
    <!--v-for="(items,indexs) in sidebarDatas">-->
    <!--&lt;!&ndash; 一级目录 &ndash;&gt;-->
    <!--<div :class="(groupSelectedIndex==indexs && titleSelectedIndex==-1)?'iM_sidebar_group_title_selected':(items.items.length==1?'iM_sidebar_group_title_one':'iM_sidebar_group_title')"-->
    <!--v-text="items.title"-->
    <!--@click="sidebarItemClick([indexs])"-->
    <!--@mouseenter="mouseenter(indexs,$event)"-->
    <!--@mouseleave="mouseleave(indexs)">-->
    <!--</div>-->
    <!--&lt;!&ndash; 二级目录 &ndash;&gt;-->
    <!--<div v-for="(item,index) in items.hasHistory?items.history:items.items"-->
    <!--:class="(titleSelectedIndex==index && groupSelectedIndex==indexs)?'iM_sidebar_item_selected':'iM_sidebar_item'"-->
    <!--@click="sidebarItemClick([indexs,index])">-->
    <!--<div :class="(titleSelectedIndex==index && groupSelectedIndex==indexs)?'iM_sidebar_item_title_selected':'iM_sidebar_item_title'"-->
    <!--v-text="item.title"-->
    <!--:title="item.title">-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->


    <!--<div class="customization"-->
    <!--v-if="false"-->
    <!--@click="goToCustomization">-->
    <!--<i class="el-icon-plus">定制监测项</i>-->
    <!--</div>-->

    <!--扩展页面-->
    <!--<div class="dialog"-->
    <!--ref="dialog"-->
    <!--v-show="showDialog"-->
    <!--v-if="sidebarDatas.length"-->
    <!--@mouseenter="mouseenter(currentIndex)"-->
    <!--@mouseleave="mouseleave(currentIndex)">-->
    <!--<div class="dialog_title"-->
    <!--v-for="(item,index) in sidebarDatas[currentIndex].items"-->
    <!--v-text="item.title"-->
    <!--:title="item.title"-->
    <!--@click="sidebarItemClick([currentIndex,index])">-->
    <!--</div>-->
    <!--</div>-->


    <div class="iM_sidebar_group"
         v-for="(items,indexs) in sidebarTestData.nomal">
      <!-- 一级目录 -->
      <div
        :class="(groupSelectedIndex==indexs && titleSelectedIndex==-1)?'iM_sidebar_group_title_selected':(items.list.length==1?'iM_sidebar_group_title_one':'iM_sidebar_group_title')"
        v-text="items.name"
        @click="sidebarItemClick([indexs])"
        @mouseenter="mouseenter(indexs,$event)"
        @mouseleave="mouseleave(indexs)">
      </div>
      <!-- 二级目录 -->
      <!--<div v-for="(item,index) in items.hasHistory?items.history:items.items"-->
      <div v-for="(item,index) in items.history?items.history:items.list"
           :class="(titleSelectedIndex==index && groupSelectedIndex==indexs)?'iM_sidebar_item_selected':'iM_sidebar_item'"
           @click="sidebarItemClick([indexs,index])">
        <div
          :class="(titleSelectedIndex==index && groupSelectedIndex==indexs)?'iM_sidebar_item_title_selected':'iM_sidebar_item_title'"
          v-text="item.name"
          :title="item.name">
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    name: "i-m-sidebar",
    data() {
      return {
        fullscreenLoading: false,
        sidebarDatas: [],
        showDialog: false,
        currentIndex: 0,
        topSelected: true,
        groupSelectedIndex: -1,
        titleSelectedIndex: -1,
        //////////////////////////////////////新接口部分
        sidebarTestData:
          {
            "special": [{
              "id": "4bc46f9211c04a5997484b0b3890d835",
              "userId": "root",
              "groupName": "哈哈",
              "platformIdList": "038020ec4a664f85aefd1f8a389accc5,0594a889f90b4a199de793abbf7beb14,",
              "platformList": [{
                "id": "038020ec4a664f85aefd1f8a389accc5",
                "name": "社会传真",
                "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                "platformTypeName": "微信"
              }, {
                "id": "0594a889f90b4a199de793abbf7beb14",
                "name": "乐惠苏州",
                "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                "platformTypeName": "微信"
              }]
            }],
            "nomal": [
              {
                "platfromTypeId": "41f66ee069584baa8ff8a010cc500484",
                "name": "网站",
                "list": [
                  {
                  "id": "2e0bb13b0ecb44668ac105076a220e08",
                  "name": "名城苏州网",
                  "platformTypeId": "41f66ee069584baa8ff8a010cc500484",
                  "platformTypeName": "网站"
                }]
              },
              {
                "platfromTypeId": "c30b035c8702443294deae81a67b197b",
                "name": "APP",
                "list": [
                  {
                    "id": "88d1a426a80d47de9ee07a4914148034",
                    "name": "无线苏州",
                    "platformTypeId": "c30b035c8702443294deae81a67b197b",
                    "platformTypeName": "APP"
                  },
                  {
                    "id": "cad21f601f5348d29183965b82c19a0a",
                    "name": "看苏州",
                    "platformTypeId": "c30b035c8702443294deae81a67b197b",
                    "platformTypeName": "APP"
                  }]
              },
              {
                "platfromTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                "name": "微信",
                "history": [
                  {
                    "platformId": "2e69b6a5feaf41b09793f2c69ed292b3",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformName": "吴门问医",
                    "platformTypeName": "微信"
                  },
                  {
                    "platformId": "038020ec4a664f85aefd1f8a389accc5",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformName": "社会传真",
                    "platformTypeName": "微信"
                  },
                  {
                    "platformId": "0b7c04ec722a4f68825e4a0864eaf518",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformName": "新闻夜班车",
                    "platformTypeName": "微信"
                  },
                  {
                    "platformId": "ceedc890e49448caa097769c2aa40bc7",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformName": "苏州广播",
                    "platformTypeName": "微信"
                  },
                  {
                    "platformId": "b9fdf3978a1f489c8e71e5c26c9f7e29",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformName": "听腔调",
                    "platformTypeName": "微信"
                  }],
                "list": [
                  {
                    "id": "038020ec4a664f85aefd1f8a389accc5",
                    "name": "社会传真",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformTypeName": "微信"
                  },
                  {
                    "id": "0b7c04ec722a4f68825e4a0864eaf518",
                    "name": "新闻夜班车",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformTypeName": "微信"
                  },
                  {
                    "id": "1995b4614c9a4d8097a9754faf98c07e",
                    "name": "苏州新闻",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformTypeName": "微信"
                  },
                  {
                    "id": "ca6abe1a206440c589a924d8b73be6b2",
                    "name": "苏州交通广播",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformTypeName": "微信"
                  },
                  {
                    "id": "fab2c0939660468cb71e2c144672eb1f",
                    "name": "施斌聊斋",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformTypeName": "微信"
                  },
                  {
                    "id": "ff521439d0164e85803be39b6b671f54",
                    "name": "嗨苏州",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformTypeName": "微信"
                  },
                  {
                    "id": "0594a889f90b4a199de793abbf7beb14",
                    "name": "乐惠苏州",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformTypeName": "微信"
                  },
                  {
                    "id": "152813e751f042f6a31431661292a60d",
                    "name": "苏州生活广播",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformTypeName": "微信"
                  },
                  {
                    "id": "17e4f6dd235e452e9877510d8bd56bd6",
                    "name": "吴中报道",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformTypeName": "微信"
                  },
                  {
                    "id": "1e99c9dfb0a5431b88dd24cf798644d7",
                    "name": "亲子957",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformTypeName": "微信"
                  },
                  {
                    "id": "23386391e82b43e2a3cc4b825880fd5e",
                    "name": "看壹周",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformTypeName": "微信"
                  },
                  {
                    "id": "25d5ff9ac2e946258c2dec5ede76cf03",
                    "name": "苏州SBS综艺",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformTypeName": "微信"
                  },
                  {
                    "id": "2e69b6a5feaf41b09793f2c69ed292b3",
                    "name": "吴门问医",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformTypeName": "微信"
                  }, {
                    "id": "2f9c3cd64e1047c78a42d0f6dfac2e1f",
                    "name": "苏州李刚评话",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformTypeName": "微信"
                  },
                  {
                    "id": "3a56e92a496b4329933d6774bdaffeed",
                    "name": "苏州市广播电视总台技术服务",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformTypeName": "微信"
                  },
                  {
                    "id": "54bb89d658f24e69b08516d68a041a52",
                    "name": "健康黄丝带",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformTypeName": "微信"
                  },
                  {
                    "id": "5b4c0887e34b4a9089f77b609da82d30",
                    "name": "新闻一锅鲜",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformTypeName": "微信"
                  },
                  {
                    "id": "786ef81d5a764c2dbe4e178f4a094b03",
                    "name": "我在苏州看电视",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformTypeName": "微信"
                  },
                  {
                    "id": "84387fb56bf2446ca6c6b6139e6df256",
                    "name": "苏州谈天说地",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformTypeName": "微信"
                  },
                  {
                    "id": "8a2e3a70506e4a99b1b1a899f1cfe74d",
                    "name": "苏州新闻广播",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformTypeName": "微信"
                  },
                  {
                    "id": "93b3d2e1575947a88257e1d6d71d85ba",
                    "name": "SBS全媒体编辑中心（服务号）",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformTypeName": "微信"
                  },
                  {
                    "id": "9648519bce5a4e81afe4e8b852afd089",
                    "name": "苏州音乐广播",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformTypeName": "微信"
                  },
                  {
                    "id": "b9fdf3978a1f489c8e71e5c26c9f7e29",
                    "name": "听腔调",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformTypeName": "微信"
                  },
                  {
                    "id": "bb8f5b4b62b7458fb359c115387947f4",
                    "name": "苏州市广播电视总台",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformTypeName": "微信"
                  },
                  {
                    "id": "bd3b0faf689c4133bd59387dfc42efe0",
                    "name": "乐活6点档",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformTypeName": "微信"
                  },
                  {
                    "id": "ceedc890e49448caa097769c2aa40bc7",
                    "name": "苏州广播",
                    "platformTypeId": "9b113bcb1f804d6b83a7a25f5b761460",
                    "platformTypeName": "微信"
                  }]
              },
              {"platfromTypeId": "c67d072e229747328336da765fc5d300", "name": "微博", "history": [], "list": []}]
          }
        ,
        commonPlantform: [],
        customPlantform: [],
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
      refreshLocalHistoryData() {

        this.sidebarDatas.forEach(function (value, index) {
          if (value.hasHistory && value.title === '微信') {
            var history = value.history;
            history.forEach(function (historyItem, index) {

            })
          }
        })

      },

      //侧边栏数据-加载
      loadData() {
        this.fullscreenLoading = true;
        this.$http.get(this.baseUrl + '/platform/find?pageNo=1&pageSize=100', {}).then(function (res) {
          var response = JSON.parse(res.bodyText);
          var dataArr = response.data;
          // console.log('侧边栏数据')
          // console.log(response)
          this.fullscreenLoading = false;
          if (response.code == 200) {
            this.handleData(dataArr.content);
          }
        }, function (res) {
          //console.log('erro')
          //console.log(res);
          this.fullscreenLoading = false;
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
              history: [],
            };
            if (dataItem.platformTypeName === '微信') {
              groupItem.hasHistory = true;
            } else {
              groupItem.hasHistory = false;
            }
            dataGroup.push(groupItem);
            map[dataItem.platformTypeId] = dataItem;
          }
          //为每组增加项目
          dataGroup.forEach(function (groupItem) {
            if (groupItem.typeID == dataItem.platformTypeId) {
              groupItem.items.push({
                title: dataItem.name,
                typeID: dataItem.id,
                groupTitle: dataItem.platformTypeName,
                groupID: dataItem.platformTypeId
              })
            }
          })
        });
        //console.log(dataGroup);
        this.sidebarDatas = dataGroup

        this.loadHistoryData(dataGroup)
      },


      //微信的点击历史记录-获取
      loadHistoryData() {

        var params = {platformTypeId: '9b113bcb1f804d6b83a7a25f5b761460'};
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
      handleHistoryData(data) {

        this.sidebarDatas.forEach(function (value, index) {
          if (value.title === '微信') {
            value.history = [];
            data.forEach(function (dataItem) {
              value.history.push({
                title: dataItem.platformName,
                typeID: dataItem.platformId,
                groupTitle: dataItem.platformTypeName,
                groupID: dataItem.platformTypeId
              })
            })
          }
        })

        var record = window.localStorage.getItem('sidebarClickRecord');
        //console.log('读取记录')
        //console.log(record)

        var type = [];
        this.sidebarDatas.forEach(function (value, index) {
          if (value.typeID == record) {
            type.push(index);
          }
          if (value.hasHistory) {
            value.history.forEach(function (item, indexpath) {
              if (item.typeID == record) {
                type.push(index)
                type.push(indexpath);
              }
            })
          } else {
            value.items.forEach(function (item, indexpath) {
              if (item.typeID == record) {
                type.push(index)
                type.push(indexpath);
              }
            })
          }
        });

        this.sidebarItemClick(type)
      },

      //增加微信历史记录
      addHistoryData(data) {
        var params = {
          platformId: data.typeID,
          platformName: data.title,
          platformTypeId: data.groupID,
          platformTypeName: data.groupTitle
        };
        //console.log('==========增加微信历史记录');
        //console.log(params);
        //console.log('==========增加微信历史记录');

        this.$http.get(this.baseUrl + '/platform/history/add', {params: params}).then(function (res) {
          var response = JSON.parse(res.bodyText);
          //console.log('增加微信历史记录');
          //console.log(response);
          if (response.code == 200 && response.data) {
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

        var type;
        if (Object.prototype.toString.call(types) == '[object Array]') {
          type = types;
        } else {
          type = types.split(',')
        }
        var isGroup = null;
        var typeID = null;
        if (type.length == 1) {
          if (this.sidebarDatas[type[0]].items.length == 1) {
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
          if (hasHistory && !this.showDialog) {
            typeID = this.sidebarDatas[type[0]].history[type[1]].typeID
          } else {
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
        window.localStorage.setItem('sidebarClickRecord', typeID);
        // 增加历史记录
        if (this.showDialog && !isGroup) {
          this.refreshHistoryData(type);
        }

        this.$emit('sidebar-item-click', {
          isGroup: isGroup,
          id: typeID
        });

      },


//////////////////////////////////////////////新接口部分////////////////////////////////////////////////

      //加载侧边栏数据
      loadSidebarData() {
        this.fullscreenLoading = true;
        let params = {pageNo: 1, pageSize: 10};
        //test
        params.username = 'root';
        this.$http.get(this.baseUrl + '/platform/findAll', {params: params}).then(function (res) {
          let response = JSON.parse(res.bodyText);
          console.log('加载侧边栏数据');
          console.log(response);
          this.fullscreenLoading = false;
          if (response.code == 200) {
            // this.handleSidebarData(response.data)
            this.nomalData = response.data.nomal;
            this.specialData = response.data.special;
          }
        }, function (res) {
          console.log('加载侧边栏error');
          console.log(res);
          this.fullscreenLoading = false;
        });
      },

      handleSidebarData(data) {

        let common = [];
        data.nomal.forEach(function (value, index) {

          let list = [];
          value.list.forEach(function (listItem) {
            
          })
          
          
        });

        this.commonPlantform = common;

        let custom = [];
        data.special.forEach(function (value, index) {

        });

        this.customPlantform = custom;

      }


    },
    mounted() {
      // this.loadData();
      // this.loadSidebarData();
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

  .iM_sidebar_group_title_selected {
    height: 35px;
    line-height: 35px;
    margin-left: 10px;
    font-weight: 600;
    font-size: 20px;
    color: #4642ff;
  }

  .iM_sidebar_group_title:hover {
    color: #4642ff;
  }

  .iM_sidebar_group_title_one {
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

  .iM_sidebar_item_selected {
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .iM_sidebar_item_title_selected {
    height: 50px;
    font-weight: 100;
    line-height: 50px;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 10px;

  }

  .dialog .dialog_title:hover {
    color: #4642ff;
    font-weight: 900;
  }
</style>
