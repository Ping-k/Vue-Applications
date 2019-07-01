<template>
  <div>

    <a href="https://echarts.baidu.com/examples/" target="_blank">官网实例</a>
    <a href="https://echarts.baidu.com/api.html#echarts" target="_blank">官网API文档</a>
    <a href="https://www.npmjs.com/package/echarts" target="_blank">npmjs</a>

    <hr>
    <h3>折线图</h3>
    <!--为echarts准备一个具备大小的容器dom-->
    <div id="chartLine" class="echarts-test"></div>

    <hr>
    <h3>中国省级区域图</h3>
    <!--为echarts准备一个具备大小的容器dom-->
    <div id="mapChina" class="echarts-test"></div>

    <hr>
    <h3>饼图</h3>
    <!--为echarts准备一个具备大小的容器dom-->
    <div id="chartPie" class="echarts-test"></div>

    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="400px" center>
      <span>需要注意的是内容是默认不居中的</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<!--
1、安装插件：cnpm install echarts --save
-->

<script>
  import echarts from 'echarts'
  import china from 'echarts/map/json/china.json'
  // 加载地图
  echarts.registerMap('china', china)
  export default {
    name: "ECharts",
    data() {
      return {
        centerDialogVisible: false,
        charts: ''
      }
    },
    methods: {
      // 折线图
      chartLine() {
        let that = this;

        let option = {
          title: {
            text: '折线图堆叠'
          },
          // tooltip: {
          //   trigger: 'axis'
          // },
          /**
           * tooltip配置项示例
           */
          tooltip: {
            show: true,
            alwaysShowContent: true,
            triggerOn: 'click',
            trigger: 'axis', // 'item':数据项图形触发 'axis':坐标轴触发
            formatter: function (params, ticket, callback) {
              // console.log( ticket, callback)
              var htmlStr = `<p id="detail" onclick="alert('ssssssssss');">
                            <a href="http://www.baidu.com">点击数据可查看详情</a>
                            <button onclick="alert('ssssssssss');">测试</button>
                          </p>`;
              for (var i = 0; i < params.length; i++) {
                var param = params[i];
                var xName = param.name;//x轴的名称
                var seriesName = param.seriesName;//图例名称
                var value = param.value;//y轴值
                var color = param.color;//图例颜色

                if (i === 0) {
                  htmlStr += xName + '<br/>';//x轴的名称
                }
                htmlStr += '<div>';
                //为了保证和原来的效果一样，这里自己实现了一个点的效果
                htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' + color + ';"></span>';

                //圆点后面显示的文本
                htmlStr += seriesName + '：' + value + '笔';
                htmlStr += '</div>';
              }

              setTimeout(function () {
                // callback(ticket, htmlStr);

                let detail = document.getElementById('detail');
                console.log(detail)
                detail.onclick = function (event) {
                  console.log(event)
                }

                let link = document.createElement("a")
                link.innerText = '测试链接'
                link.href = 'www.baidu.com'
                detail.appendChild(link);
                document.body.appendChild(link);

              }, 50)

              // return 'Loading';

              return htmlStr;
              // return `<a href="https://www.baidu.com">百度</a>`
            }
          },
          legend: {
            data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
          },
          dataZoom: [
            {
              type: 'slider',
              xAxisIndex: 0,
              start: 10,
              end: 60
            },
            {
              type: 'inside',
              xAxisIndex: 0,
              start: 10,
              end: 60
            },
            // {
            //   type: 'slider',
            //   yAxisIndex: 0,
            //   start: 30,
            //   end: 80
            // },
            // {
            //   type: 'inside',
            //   yAxisIndex: 0,
            //   start: 30,
            //   end: 80
            // }
          ],
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '邮件营销',
              type: 'line',
              stack: '总量',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'line',
              stack: '总量',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '视频广告',
              type: 'line',
              stack: '总量',
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '直接访问',
              type: 'line',
              stack: '总量',
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '搜索引擎',
              type: 'line',
              stack: '总量',
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        };
        let charts = echarts.init(document.getElementById('chartLine'))
        charts.setOption(option)

        //设置点击事件
        charts.on('click', function (params) {
          console.log(params)

          // that.$message({
          //   message: '恭喜你，这是一条成功消息',
          //   type: 'success'
          // });

          // that.centerDialogVisible = true;
        });
      },
      // 中国省级区域图
      mapChina() {
        let that = this;

        // 基于准备好的dom，初始化echarts实例
        let myChartContainer = document.getElementById('mapChina');
        let resizeMyChartContainer = function () {
          myChartContainer.style.width = (document.body.offsetWidth / 2) + 'px'//页面一半的大小
        }
        resizeMyChartContainer();
        let myChartChina = echarts.init(myChartContainer);

        //设置点击事件
        myChartChina.on('click', function (params) {
          that.$message({
            message: '恭喜你，这是一条成功消息',
            type: 'success'
          });
        });

        function randomData() {
          return Math.round(Math.random() * 500);
        }

        // 绘制图表
        let optionMap = {
          tooltip: {},
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['']
          },
          visualMap: {
            min: 0,
            max: 1500,
            left: '0%',
            top: 'bottom',
            text: ['高', '低'],
            calculable: true,
            // color: ['#0b50b9', '#c3e2f4']
            color: ['#229342', '#D0D4DA']
          },
          selectedMode: 'single',
          series: [
            {
              name: '',
              type: 'map',
              mapType: 'china',
              itemStyle: {
                normal: {
                  borderColor: 'rgba(0, 0, 0, 0.2)'
                },
                emphasis: {
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  shadowBlur: 20,
                  borderWidth: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              showLegendSymbol: true,
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              data: [
                {name: '北京', value: randomData()},
                {name: '天津', value: randomData()},
                {name: '上海', value: randomData()},
                {name: '重庆', value: randomData()},
                {name: '河北', value: randomData()},
                {name: '河南', value: randomData()},
                {name: '云南', value: randomData()},
                {name: '辽宁', value: randomData()},
                {name: '黑龙江', value: randomData()},
                {name: '湖南', value: randomData()},
                {name: '安徽', value: randomData()},
                {name: '山东', value: randomData()},
                {name: '新疆', value: randomData()},
                {name: '江苏', value: randomData()},
                {name: '浙江', value: randomData()},
                {name: '江西', value: randomData()},
                {name: '湖北', value: randomData()},
                {name: '广西', value: randomData()},
                {name: '甘肃', value: randomData()},
                {name: '山西', value: randomData()},
                {name: '内蒙古', value: randomData()},
                {name: '陕西', value: randomData()},
                {name: '吉林', value: randomData()},
                {name: '福建', value: randomData()},
                {name: '贵州', value: randomData()},
                {name: '广东', value: randomData()},
                {name: '青海', value: randomData()},
                {name: '西藏', value: randomData()},
                {name: '四川', value: randomData()},
                {name: '宁夏', value: randomData()},
                {name: '海南', value: randomData()},
                {name: '台湾', value: randomData()},
                {name: '香港', value: randomData()},
                {name: '澳门', value: randomData()}
              ]
            }
          ]
        }

        myChartChina.setOption(optionMap);
        window.onresize = function () {
          resizeMyChartContainer();
          myChartChina.resize();
        }
      },
      // 饼图
      chartPie() {
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a}<br/>{b}:{c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'blod'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
              ]
            }
          ]
        };
        this.charts = echarts.init(document.getElementById('chartPie'))
        this.charts.setOption(option)
      },
    },
    //调用
    mounted() {
      this.$nextTick(function () {
        // 折线图
        this.chartLine();
        // 中国省级区域图
        this.mapChina();
        // 饼图
        this.chartPie();
      })
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  h3 {
    text-align: center;
  }

  hr {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .echarts-test {
    width: 900px;
    height: 500px;
    margin: 20px auto;
  }
</style>
