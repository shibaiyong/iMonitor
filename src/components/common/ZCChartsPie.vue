<template>

  <div :id="idName" ref="zccharts_pie" :style="{backgroundColor:'#fff',width:'100%'}"></div>
</template>

<script>
  import echarts from 'echarts'

  let showLabel = true;
  export default {
    name: "z-c-charts-pie",
    props: {
      height: {type: Number, require: true},
      idName: {type: String, require: true},
      chartData: {type: Array, require: true},
      baseName: {type: String, require: false},
      options: {
        type: Object,
        require: false,
        default() {
          return {
            radius: [90, 106]
          }
        }
      }
    },
    data() {
      return {
        eChartsObj: null
      }
    },
    watch: {
      chartData(val, oldVal) {
        this.eChartsObj.setOption(this.setupOptions());
      }
    },
    methods: {

      setupData() {
        var data = [];
        this.chartData.forEach(function (value, index) {
          data.push({name: value.name, value: value.value})
        });
        return data;
      },
      setupSeries() {
        return [{
          itemStyle: {
            borderColor: "#ffffff",
            borderWidth: 5,
          },
          type: 'pie',
          hoverOffset: 5,
          minAngle: 5,
          avoidLabelOverlap: true,
          center: ['50%', '50%'],
          radius: this.options.radius,
          labelLine: {
            show: false
          },
          data: this.setupData(),

          // stillShowZeroSum:false
        }];
      },

      setupOptions() {
        var data = this.setupData();
        var thiz = this;
        return {
          color: ['#4642ff', '#00c6ff', '#46dd31', '#ffd541', '#ff9241', '#fb5959', '#9659fb',
            '#99acf6', '#7be0fd', '#6fff5b', '#ffd541', '#ffa664', '#ff7777', '#b080ff'],
          tooltip: {
            show: true,
            padding: 10,
            backgroundColor: 'rgba(255,255,255,1)',
            textStyle: {color: '#444'},
            extraCssText: 'box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.2);',
            formatter(params) {
              //console.log(params);
              var formatter = ""
              var name = !thiz.baseName?"文章篇数：":thiz.baseName
              formatter = formatter + params.name + "："+params.percent +"%<br>"
              formatter = formatter + params.marker + name +": "+ params.value
              return formatter
            },
          },
          label: {
            show: showLabel,
            align: 'center',
            formatter: function (params) {
              var total = 0;
              var percent = 0;
              data.forEach(function (value) {
                total += value.value;
              });
              percent = ((params.value / total) * 100).toFixed(2);

              return '{title|' + params.name + ':' + '}  {per|' + percent + '%}\n'
            },
            rich: {
              title: {color: '#444', align: 'center', fontSize: 15},
              per: {align: 'center', fontSize: 15, padding: [0, 0, 0, 0]}
            }
          },
          series: this.setupSeries()
        }
      }
    },
    mounted() {

      this.$refs.zccharts_pie.style.height = this.height + 'px';

      //创建饼图控件
      var pieChart = echarts.init(document.getElementById(this.idName));
      //饼图渲染
      pieChart.setOption(this.setupOptions());

      window.addEventListener("resize", function () {
        pieChart.resize();
      });

      this.eChartsObj = pieChart;

      var thiz = this;
      pieChart.on('pieselectchanged ', function (params) {
        //console.log(params);
      });
      pieChart.on('pieselected ', function (params) {
        //console.log(params);
      });
      pieChart.on('pieunselected ', function (params) {
        //console.log(params);
      });

      pieChart.on('click', function (params) {
        // //console.log(params)
        if (params.componentType == 'series' && params.componentSubType == 'pie') {
          if (params.value) {
            thiz.$emit('click-piechart', {
              name: params.name,
              index: params.dataIndex
            });
          }
        }
      })

    }
  }
</script>

