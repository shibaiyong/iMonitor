<template>
  <div class="home">
    <!--顶部工具-->
    <Topbar></Topbar>

    <!--侧边栏工具-->
    <Sidebar :options="iM_options" @sidebar-item-click="sidebarItemClick"></Sidebar>

    <!--菜单选择工具-->
    <Menu :options="iM_options"></Menu>

    <!--时间范围选择工具-->
    <TimeFrame :options="iM_options" @click-datepicker="clickDatePicker" @click-reports="clickReports"></TimeFrame>

    <div id="IM_content" class="IM_content" :class="IM_content_className()">
      <HomeContent :sidebarType="sidebarType"
                   :plantformId="plantformId"
                   :datePickerParams="datePickerParams">
      </HomeContent>
    </div>

    <ZCScreenShot :data="screenShotData" :options="screenShotParam"></ZCScreenShot>

  </div>
</template>

<script>
  import Topbar from '../common/ZCTopbar'
  import Menu from '../common/ZCMenu'
  import Sidebar from '../common/ZCSidebar'
  import TimeFrame from '../common/ZCTimeFrame'
  import HomeContent from './HomeContent'
  import ZCScreenShot from '../common/ZCScreenShot'

  export default {
    name: "home_page",
    components: {Topbar, Menu, Sidebar,TimeFrame, HomeContent,ZCScreenShot},
    data() {
      return {
        iM_options: {
          showMenu: true,
          showSidebar: true,
        },
        /*侧边栏点击属性*/
        sidebarType:null,
        plantformId:'',
        /*时间选择器属性*/
        datePickerParams:{},

        /*截图*/
        screenShotData:[],
        screenShotParam:null
      }
    },
    methods:{
      /*侧边栏监听点击*/
      sidebarItemClick({type,id}){
        this.sidebarType = type;
        this.plantformId = id;
      },

      /*时间选择器更新方法*/
      clickDatePicker({type,time}){
        // this.zc_log('时间类型:'+type+'\n'+'开始时间:'+time);
        this.datePickerParams = {startTime:time,accountType:type.toString()};
      },


      /*生成报告功能*/
      clickReports(){

        this.screenShotData =  document.getElementsByClassName('screenShot');

        this.screenShotParam = {
          sidebarType:this.sidebarType,
          platformId:this.plantformId,
          accountType:this.datePickerParams.accountType,
          startTime:this.datePickerParams.startTime
        };

        setTimeout(function () {
          this.screenShotParam = null;
          console.log('jhahahahah')
        },10000);


      },

      /*content类名方法*/
      IM_content_className(){
        let result = '';
        if(this.iM_options.showSidebar){
          result += ' IM_content_showSidebar'
        }else{
          result += ' IM_content_hiddenSidebar'
        }
        if(this.iM_options.showMenu){
          result += ' IM_content_showMenu'
        }else{
          result += ' IM_content_hiddenMenu'
        }
        return result;
      },



    },
  }
</script>

<style scoped>

  .IM_content_showSidebar{
    top: calc(60px + 60px + 70px);/*topbar:60 memu:70(60高度+10marginTop) timeframe:60px*/
    left: 200px;
  }
  .IM_content_hiddenSidebar{
    top: calc(60px + 60px + 70px);
    left: 0;
  }
  .IM_content_showMenu{
    top: calc(60px + 60px + 70px);
  }
  .IM_content_hiddenMenu{
    top:60px
  }
</style>
