import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [

    //传播情况总览
    {
      path: '/',
      name: 'Home',
      component: resolve => require(['@/components/Home/Home'], resolve)
    },

    //热门作品
    {
      path: '/hotwork',
      name: 'HotWork',
      component: resolve => require(['@/components/HotWork/HotWork'], resolve)
    },

    //传播趋势分析
    {
      path: '/trend',
      name: 'Trend',
      component: resolve => require(['@/components/Trend/Trend'], resolve)
    },

    //传播地域分析
    {
      path: '/region',
      name: 'Region',
      component: resolve => require(['@/components/Region/Region'], resolve)
    },

    //媒体转载分析
    {
      path: '/reprint',
      name: 'Reprint',
      component: resolve => require(['@/components/Reprint/Reprint'], resolve)
    },
    //传播力分析
    {
      path: '/spreadAnalyze',
      name: 'SpreadAnalyze',
      component: resolve => require(['@/components/SpreadAnalyze/SpreadAnalyze'], resolve)
    },
    // //重点媒体监测
    // {
    //   path: '/mediamonitor',
    //   name: 'MediaMonitor',
    //   component: resolve => require(['@/components/MediaMonitor/MediaMonitor'], resolve)
    // },
    //
    // //平台对比分析
    // {
    //   path: '/platform',
    //   name: 'Platform',
    //   component: resolve => require(['@/components/Platform/Platform'], resolve)
    // },
    //
    // //作品对比分析
    // {
    //   path: '/works',
    //   name: 'Works',
    //   // component: Works
    //   component: resolve => require(['@/components/Works/Works'], resolve)
    // },
    //
    // //版权对比分析
    // {
    //   path: '/copyright',
    //   name: 'Copyright',
    //   component: resolve => require(['@/components/Copyright/Copyright'], resolve)
    // },
    //
    // //定制监测
    // {
    //   path: '/customization',
    //   name: 'Customization',
    //   component: resolve => require(['@/components/Customization/Customization'], resolve)
    // },
    //
    // //单个页面
    // {
    //   path: '/single/:type',
    //   name: 'MediaMonitorSingle',
    //   component: resolve => require(['@/components/MediaMonitor/MediaMonitorSingle'], resolve)
    // },

    //单篇新闻详情页
    {
      path: '/detail/:newsid',
      name: 'DetailPages',
      component: resolve => require(['@/components/DetailPages/DetailPages'], resolve)
    },
  ]
})
