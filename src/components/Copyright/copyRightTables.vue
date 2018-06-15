<template>
  <div class="copyRightTables">
    <div class="title-box">
      <span class="title">  {{getTitle()}}</span>
      <span class="title-name"> {{this.tableData.title}}</span>
    </div>
    <div class="list">
      <div class="item" v-for="item in this.tableData.items">
        <div class="title">
          {{item.title}}
        </div>
        <div class="content" >
          <div v-if="item.type=='text'">
            {{item.content}}
          </div>
          <a :href="item.content" v-if="item.type=='url'" style="color: #4643ff">
            {{item.content}}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "copy-right-tables",
    data() {
      return {
        tableData: {
          type: '1',
          title: '名城苏州网',
          items: [
            {title: "标题", type: 'text', content: '严查银行股东代持 '},
            {title: "发布链接", type: 'url', content: 'http://www.baidu.com'},
            {title: "发布时间", type: 'text', content: '2017/07/23 15:84'},
            {title: "发布终端", type: 'text', content: ''},
            {title: "发布版块", type: 'text', content: '经济大势'},
            {title: "正文字数", type: 'text', content: '1416 '},
            {title: "编号", type: 'text', content: '14161190380'},
          ]
        }
      }
    },
    methods: {
      getTitle() {
        return this.tableData.type == '1' ? '原文' : '转载'
      },
      goTo(item) {

      }
    },
    mounted() {
      var thiz = this;
      this.goTo = (item) => {
        if (item.type == 'url') {
          window.location.href = item.url;
        }
      }
    }
  }
</script>

<style scoped>
  @import '../../assets/css/Copyringht/copyRightTables.css';
</style>
