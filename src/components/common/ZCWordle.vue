<template>
  <div class="wordle" id="wordle" ref="wordle"></div>
</template>

<script>

  import echarts from 'echarts'

  export default {
    name: "z-c-wordle",
    props:{
      data:{type:Array,require:false}
    },
    data() {
      return {

        eChartsObj: null,
        graphCategoryData: [],
        graphData: null,
      }
    },

    methods: {


      setupSeries() {
        return [{
          type:'graph',
          legendHoverLink:false,
          hoverAnimation:false,
          layout:'force',
          force:{
            gravity: 0.2,
            layoutAnimation: false,
            repulsion: [80,150]
          },
          symbol:'circle',
          symbolSize:20,
          cursor:'none',
          itemStyle:{
            color:'#B6C6DB'
          },
          lineStyle:{
            width:0
          },
          label:{
            show:true,
            color:'#fff',
            fontSize:14,
            align:'center',
            verticalAlign:'middle',
            formatter(params){
              let data = params.data;
              if(data.show){
                return data.name+'\n'+data.value+'%';
              }else {
                return ''
              }
            }

          },
          emphasis:{
            label:{show:false}
          },
          top:0,
          bottom:0,
          left:0,
          right:0,
          width:document.getElementById('wordle').offsetWidth,
          height:document.getElementById('wordle').offsetHeight,
          // categories:this.graphCategoryData,
          data:this.graphData,
        }]
      },
      setupOptions() {
        return {
          series: this.setupSeries()
        }
      },
    },

    created() {


      // let data = [
      //   {name:'测试1',value:0.6},
      //   {name:'测试2',value:0.3},
      //   {name:'测试5',value:0.2},
      //   {name:'测试7',value:0.5},
      //   {name:'测试6',value:0.4},
      //   {name:'测试3',value:0.1},
      //   {name:'测试4',value:0.7},
      //
      // ];

      if(!this.data && !this.data.length){
        return
      }
      let data = this.data;
      let test = [
        // {name:'冒充1',value:0},
        // {name:'冒充2',value:0},
        // {name:'冒充3',value:0},
        // {name:'冒充4',value:0},
        // {name:'冒充5',value:-1},
        // {name:'冒充6',value:-1},
        // {name:'冒充7',value:-1},
        // {name:'冒充8',value:-1},
        // {name:'冒充9',value:-1},
      ];

      let result = data.concat(test);

      result.forEach(function (item) {
      let num = (parseFloat(item.value)*100).toFixed(2);

        if(num >= 50){
          item.category = '大于50%';
          item.symbolSize = 60;
          item.itemStyle = {color:'#1D52A0'};
          item.label = {fontSize:15};
          item.show = true;
          item.value = num;
        }else if(num >= 30 && num < 50){
          item.category = '大于30%';
          item.symbolSize = 50;
          item.itemStyle = {color:'#3B87F5'};
          item.show = true;
          item.value = num;
          item.label = {fontSize:12};

        }else if(num > 0 && num <30){
          item.category = '其他';
          item.symbolSize = 40;
          item.itemStyle = {color:'#80B4FF'};
          item.show = true;
          item.value = num;
          item.label = {fontSize:10};

        }else if(num === 0){
          item.category = '默认1';
          item.symbolSize = 30;
          item.show = false;
          item.value = num;

        }else{
          item.category = '默认2';
          item.symbolSize = 20;
          item.show = false;
          item.value = num;
        }
      });

      this.graphData = result;

    },
    mounted() {

      let wordle = document.getElementById('wordle');

      let graphChart = echarts.init(wordle);

      graphChart.setOption(this.setupOptions());

      this.eChartsObj = graphChart;

      window.addEventListener("resize", function () {
        graphChart.resize();
      });

    }
  }
</script>

<style scoped>

  .wordle {
    width: 100%;
    height: 100%;
    /*background-color: #f78989;*/
    /*border: 1px solid #e2e3e4;*/
  }
</style>
