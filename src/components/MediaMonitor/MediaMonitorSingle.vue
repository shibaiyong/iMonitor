<template>
  <div class="mediamonitor_single" v-title="'单个页面'">
    <!--顶部-->
    <iM_Topbar></iM_Topbar>
    <!--头部-->
    <iM_Header :breadcrumbData="headerData"></iM_Header>

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
            <MediaMonitorSingleContent></MediaMonitorSingleContent>
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
  import MediaMonitorSingleContent from './MediaMonitorSingleContent';

  export default {
    name: "media-monitor-single",
    components: {iM_Topbar, iM_Header, iM_Sidebar, iM_Menu, MediaMonitorSingleContent},
    data() {
      return {
        showSiderbar: false,
        showMenu: false,
        contentWidth: 0,
        contentMarginLeft: 0,
        sliderWidth: 0,
        headerData: [
          {path: '/', name: '首页'},
          {path: '/mediamonitor', name: '重点媒体监测'},
          {path: '/', name: '重点媒体监测列表-凤凰网'},
        ]
      }
    }, mounted() {
      this.contentMarginLeft = window.screen.width * 0.15
      this.sliderWidth = window.screen.width * 0.15 - 1
      if (!this.showSiderbar) {
        this.contentMarginLeft = 0
        this.sliderWidth = 0
      }
      this.contentWidth = window.screen.width - this.contentMarginLeft
    }
  }
</script>
