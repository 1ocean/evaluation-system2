<template>
    <div style="padding: 0;margin: 0">
        <el-row class="displayFlex" :gutter="30">
            <el-col :span="10">
                <el-card class="box-card" style="width: 100%;height: 35vh">
                    <div slot="header" class="clearfix">
                        <span>本年考评情况</span>
                    </div>
                    <div id="first" class="text item">
                        1
                    </div>
                </el-card>
            </el-col>
            <el-col :span="10">
                <el-card class="box-card" style="width: 100%;height: 35vh">
                    <div slot="header" class="clearfix">
                        <span>历年考评情况</span>
                    </div>
                    <div id="second" class="text item">
                        2
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <div class="carousels">
            <el-carousel :interval="5000"  arrow="always">
                <el-carousel-item v-for="item in img" :key="item.id">
                    <img :src="item.idView" height="100%" width="100%">
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="right">
            <p>考评时间从11月19日开始，请各大队准备</p>
            <p class="p">组织培训 11月14日</p>
            <p class="p">考前预告 11月14日</p>
            <p class="p">动员准备 11月15日-11月18日</p>
<!--            <p class="p">实施阶段 11月19日-11月27日</p>-->
<!--            <el-button style="width: 80%;margin-top: 11%;background-color: rgb(46, 46, 46)" type="info" round>-->
<!--                信息按钮-->
<!--            </el-button>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "checkHomePage",
        data(){
            return{
                img:[
                    {id:1,idView:require("../../assets/11.jpg")},
                    {id:2,idView:require("../../assets/12.jpg")},
                    {id:3,idView:require("../../assets/13.jpg")},
                    {id:4,idView:require("../../assets/14.jpg")}
                ]


            }
        },
        mounted() {
            this.drawLine()
        },
        methods: {
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$eCharts.init( document.getElementById( 'second' ) );
                let myChart2 = this.$eCharts.init( document.getElementById( 'first' ) );
                // 绘制图表
                myChart.setOption( {
                    legend: {},
                    tooltip: {},
                    dataset: {
                        source: [
                            [ 'product', '登录人数', '民主测评人数', '优秀人数' ],
                            [ '2018', 43.3, 85.8, 121 ],
                            [ '2017', 83.1, 73.4, 43 ],
                            [ '2016', 86.4, 65.2, 33 ],
                            [ '2015', 72.4, 53.9, 53 ],

                        ]
                    },
                    grid: {
                        top:'13%',
                        left: '8%',
                        right: '4%',
                        bottom: '20%',
                        containLabel: true
                    },
                    color: [ "rgb(56,160,255)", "rgb(76,202,115)", 'rgb(249,211,55)' ],
                    xAxis: { type: 'category' },
                    yAxis: {
                        splitLine: {
                            lineStyle: {
                                type: 'dashed'
                            }
                        }
                    },
                    // Declare several bar series, each will be mapped
                    // to a column of dataset.source by default.
                    series: [
                        { type: 'bar' },
                        { type: 'bar' },
                        { type: 'bar' }
                    ]
                } );
                myChart2.setOption( {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    color: [ "rgb(76,202,115)", "rgb(56,160,255)" ],
                    legend: {
                        data: [ '登录人数', '民主测评人数' ]
                    },
                    grid: {
                        top:'13%',
                        left: '8%',
                        right: '4%',
                        bottom: '20%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: [ '2019-11-14', '2019-11-16', '2019-11-18', '2019-11-20', '2019-11-22', '2019-11-24' ]

                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            lineStyle: {
                                type: 'dashed'
                            }
                        }
                    },
                    series: [
                        {
                            name: '登录人数',
                            type: 'bar',
                            stack: '总量',
                            barWidth: 30,
                            data: [ 320, 302, 301, 334, 123, 545 ]
                        },
                        {
                            name: '民主测评人数',
                            type: 'bar',
                            stack: '总量',
                            barWidth: 30,
                            data: [ 120, 132, 101, 134, 454, 534 ]
                        },

                    ]
                } );
            }
        }
    }
</script>

<style scoped>
    #first {
        height: 100%;
        width: 95%;
    }

    #second {
        height: 100%;
        width: 95%;
    }

    .right:hover {
        height: 36vh;
        width: 18%;
        display: inline-block;
        position: absolute;
        right: 6.2%;
        z-index: 1000;
        background-color: rgb(46, 46, 46);
        text-align: center;
        animation: myfirst 5s;
        -moz-animation: myfirst 5s; /* Firefox */
        -webkit-animation: myfirst 5s; /* Safari and Chrome */
        -o-animation: myfirst 5s; /* Opera */
    }

    .right {
        height: 36vh;
        width: 18%;
        background-color: rgb(46, 46, 46);
        text-align: center;
        display: inline-block;
        position: absolute;
        right: 6.2%;
        top: 52%;
        z-index: 1000;
    }

    .carousels {
        /*margin: 0 auto;*/
        position: absolute;
        top: 52%;
        width: 49%;
        right: 24%;
    }
    .carousels>>>.el-carousel__container{
        height: 36vh;
    }
    p:first-child {
        font-size: 20px;
        font-weight: bolder;
        color: white;
        padding: 5px;
    }

    .p {
        color: white;
        padding: 0 2px
    }

    .box-card >>> .el-card__body {
        height: 85%;
        width: 100%;
        padding: 5px;
    }


    .marginTop >>> .el-carousel__container {
        height: 40vh;
    }

    .clearfix {
        color: rgb(153, 153, 153);
        font-size: 13px;
    }

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }

    .el-col {
        text-align: left;
    }



    @keyframes myfirst {
        from {
            transform: rotateY(0deg)
        }
        to {
            transform: rotateY(360deg)
        }
    }

    @-moz-keyframes myfirst /* Firefox */
    {
        from {
            transform: rotateY(0deg)
        }
        to {
            transform: rotateY(360deg)
        }
    }

    @-webkit-keyframes myfirst /* Safari and Chrome */
    {
        from {
            transform: rotateY(0deg)
        }
        to {
            transform: rotateY(360deg)
        }
    }

    @-o-keyframes myfirst /* Opera */
    {
        from {
            transform: rotateY(0deg)
        }
        to {
            transform: rotateY(360deg)
        }
    }
</style>
