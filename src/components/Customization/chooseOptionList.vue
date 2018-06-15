<template>
  <div class="optionList">
    <div class="itemLine" :style="{display:listItem.name=='网站'||listItem.name=='App'?'inline':'block'}"
         v-for="(listItem,index1) in listData">
      <div class="itemBox" v-for="(item,index2) in listItem.items">
        <span class="name" v-if="index2 == 0">{{listItem.name}}:</span>
        <el-checkbox class="item" v-model="item.choose" v-show="item.name&&item.name!=''" @change="valueChange(index1,index2)">
          {{item.name}}
        </el-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "choose-option-list",
    props: ['listData'],
    data() {
      return {
        radio: false,
        radio1: true
      }
    },
    methods: {
      valueChange(index1, index2) {
        this.$emit("selectListener",index1, index2)
      }
    }
  }
</script>

<style scoped>
  @import '../../assets/css/Customization/chooseOptionList.css';
</style>
