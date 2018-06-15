<template>
  <div class="mediamonitor">
    <!--顶部-->
    <iM_Topbar></iM_Topbar>
    <!--头部-->
    <iM_Header></iM_Header>

    <div id="main">
      <!--侧边栏-->
      <div id="siderbar" v-if="showSiderbar" :style="'width:'+sliderWidth+'px'">
        <iM_Sidebar></iM_Sidebar>
      </div>
      <!--主体部分-->
      <div id="content" :class="showSiderbar?'showSiderbar':'hiddenSiderbar'"
           :style="'margin-left:'+contentMarginLeft+'px'">
        <!--工具栏-->
        <div :style="'width:'+contentWidth+'px;height:calc(100% - 5px);'">
          <div id="menu" v-if="showMenu">
            <iM_Menu></iM_Menu>
          </div>
          <!--详情部分-->
          <div id="content_page" :class="showMenu?'showMenu':'hiddenMenu'">
            <!--此处放置页面-->
            <MediaMonitorContent></MediaMonitorContent>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import iM_Topbar from '@/components/common/iMTopbar.vue'
  import iM_Header from '@/components/common/iMHeader.vue'
  import iM_Sidebar from '@/components/common/iMSidebar.vue'
  import iM_Menu from '@/components/common/iMMenu.vue'
  import MediaMonitorContent from './MediaMonitorContent';

  export default {
    name: "media-monitor",
    components: {iM_Topbar, iM_Header, iM_Sidebar, iM_Menu, MediaMonitorContent},
    data() {
      return {
        showSiderbar: true,
        showMenu: true,
        contentWidth: 0,
        contentMarginLeft: 0,
        sliderWidth: 0
      }
    },
    created(){
      this.initPageSize()
    },
  }
</script>


