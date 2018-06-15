<template>

  <div id="iM_topbar" class="clearfix">
    <div class="topbar_logo" @click="logoClicked">iMonitor新闻传播监测系统</div>
    <!--<div class="topbar_logout" @click="logoutClicked">-->
      <!--<span><i class="fa fa-power-off"></i>注销</span>-->
    <!--</div>-->
    <!--<div class="topbar_user" @click="userClicked">-->
      <!--<span><i class="fa fa-user-circle-o"></i>admin</span>-->
    <!--</div>-->
    <!--<div class="floating-ball" @click="goToSpreadAnalyze()" v-if="showFloatingBall">传播力分析</div>-->

  </div>

</template>

<script>
  export default {
    name: "top-bar",
    data() {
      return {
        showFloatingBall: false,
      }
    },
    mounted() {
      this.showFloatingBall = this.$route.path.indexOf('spreadAnalyze') === -1
    },
    methods: {
      //跳转传播力分析页面
      goToSpreadAnalyze() {
        // this.$router.push({path: '/spreadAnalyze'});
        window.open("/spreadAnalyze")
      },
      logoClicked() {
        this.$router.push('/');
      },
      logoutClicked() {
        alert('登出成功');
      },
      userClicked() {
        alert('用户管理');
      }
    },


  }
</script>

<style scoped>

  #iM_topbar {
    color: #fff;
    height: 43px;
    padding: 0 50px;
    line-height: 43px;
    background-color: #4642ff;
    border: #4642ff 1px solid;
    overflow: hidden;
  }

  .topbar_logo {
    float: left;
    font-size: 18px;
    font-weight: 600;
  }

  .topbar_user, .topbar_logout {
    float: right;
    margin-left: 50px;
  }

  .topbar_logo, .topbar_user, .topbar_logout {
    cursor: pointer;
  }

  .floating-ball {
    color: #565656;
    position: fixed;
    bottom: 60px;
    right: 60px;
    height: 40px;
    width: 120px;
    z-index: 100;
    background: rgba(255, 255, 255, 0.6);
    line-height: 40px;
    text-align: center;
    border-radius: 5px;
    box-shadow: 0px 0px 2px 2px #eeeeee;
    font-size: 14px;
    cursor: pointer;
    border: rgba(70, 76, 255, 0.6) 1px solid;
  }

  .floating-ball:hover {
    background: rgba(255, 255, 255, 1);
    border: rgba(70, 76, 255, 1) 1px solid;
  }

  i {
    margin-right: 10px;
  }
</style>
