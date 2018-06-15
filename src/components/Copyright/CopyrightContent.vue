<template>
  <div class="viewItem">
    <div class="compare-copyright">
      <div class="button-box">
        <div :class="{ buttonSelect: compareImage,buttonNormal:!compareImage }" @click="selectCompareModel()">
          <i class="fa fa-picture-o"/>
          <span>截图对比</span>
        </div>
        <div :class="{ buttonSelect: compareText,buttonNormal:!compareText }" @click="selectCompareModel()">
          <i class="fa fa-file-text-o"/>
          <span>正文对比</span>
        </div>
        <span>相似度99%</span>
      </div>
      <el-row :gutter="60">
        <el-col :span="12">
          <copyRightTables/>
          <copyRightArticle style="margin-top: 30px"/>
        </el-col>
        <el-col :span="12">
          <copyRightTables/>
          <copyRightArticle style="margin-top: 30px"/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import copyRightTables from './copyRightTables.vue'
  import copyRightArticle from './copyRightArticle.vue'

  export default {
    name: "compar-copyright-content",
    components: {
      'copyRightTables': copyRightTables,
      'copyRightArticle': copyRightArticle
    },
    data() {
      return {
        compareText: true,
        compareImage: false
      }
    },
    methods: {
      selectCompareModel() {
        this.compareText = !this.compareText
        this.compareImage = !this.compareImage
      }
    }
  }
</script>

<style scoped>
  @import '../../assets/css/home/common.css';
  @import '../../assets/css/Copyringht/CopyringhtContent.css';
</style>
