<template>
  <div class="customConfigure" v-title="'定制监测'">
    <!--顶部工具-->
    <Topbar></Topbar>

    <div id="IM_content" class="IM_content" style="top: 60px;left: 0;">
      <CustomConfigureContent></CustomConfigureContent>
    </div>
  </div>
</template>

<script>
  import Topbar from '../common/ZCTopbar'
  import CustomConfigureContent from './CustomConfigureContent';

  export default {
    name: "custom-configure",
    components: {Topbar, CustomConfigureContent},
  }
</script>

<style scoped>

</style>
