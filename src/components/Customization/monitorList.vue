<template>
  <div class="monitorList">
    <div class="monitorList-header">
      <div class="index">&nbsp;</div>
      <div class="name">监测项名称</div>
      <div class="items">包含平台</div>
      <div class="time">创建时间</div>
      <div class="del">&nbsp;</div>
    </div>
    <div class="list-box-none" v-if="listData.length==0">
      暂无数据
    </div>
    <div class="monitorList-item" v-for="(item,index) in listData">
      <div class="index">{{index+1}}</div>
      <div class="name">{{item.name}}</div>
      <div class="items">{{getItems(item.items)}}</div>
      <div class="time">{{item.time}}</div>
      <div class="del">
        <span class="delete"> 删除</span>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "monitor-list",
    props: ['listData'],
    methods: {
      getItems: function (list) {
        console.log(list);
        var str = "";
        for (var i = 0; i < list.length; i++) {
          str = str + list[i] + ",";
        }
        return str;
      }
    }
  }
</script>

<style scoped>
  @import '../../assets/css/Customization/monitorList.css';
</style>
