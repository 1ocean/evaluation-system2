<template>
    <div>
        <el-row class="displayFlex" :gutter="30">
            <el-col :span="8">
                <el-card class="box-card" style="width: 100%;height: 55vh">
                    <div slot="header" class="clearfix">
                        <span>5项考评指标图</span>
                    </div>
                    <div id="first" class="text item">

                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="box-card" style="width: 100%;height: 55vh">
                    <div slot="header" class="clearfix">
                        <span>考评指标占比（全部是优秀/(优秀+合格+不合格）、单人是和 单人/全部）</span>
                        <span>
                          <el-select clearable   @change="change" v-model="value" placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                          </el-select>
                    </span>
                    </div>
                    <div id="second" class="text item">
                        <el-row style="width: 100%;height: 100%">
                            <el-col style="width: 33%;height: 100%" :span="8" id="second-1"></el-col>
                            <el-col style="width: 33%;height: 100%" :span="8" id="second-2"></el-col>
                            <el-col style="width: 33%;height: 100%" :span="8" id="second-3"></el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-table
                @row-click="colClick"
                border
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                highlight-current-row
                style="width: 100%;font-size: 12px;margin-top: 2%;"
        >
            <el-table-column
                    prop="personalInfo.policeNo"
                    label="编号"
                    min-width="80">
            </el-table-column>
            <el-table-column
                    label="头像"
                    min-width="65">
                <template slot-scope="scope">
                    <img :src="$baseUrl+'/'+scope.row.personalInfo.imgPath" width="40" height="40" class="head_pic"/>
                </template>
            </el-table-column>
            <el-table-column
                    prop="personalInfo.policeName"
                    label="姓名"
                    min-width="60">
            </el-table-column>
            <el-table-column label="一、汇报推荐">
                <el-table-column
                        prop="reportRecommendNum"
                        label="推荐"
                        min-width="55">
                </el-table-column>
                <el-table-column
                        prop="reportUrecommendNum"
                        label="不推荐"
                        min-width="55">
                </el-table-column>
            </el-table-column>
            <el-table-column label="二、个人述职">
                <el-table-column
                        prop="workYnum"
                        label="优秀"
                        min-width="55">
                </el-table-column>
                <el-table-column
                        prop="workHege"
                        label="合格"
                        min-width="55">
                </el-table-column>
                <el-table-column
                        prop="workBuhege"
                        label="不合格"
                        min-width="55">
                </el-table-column>
            </el-table-column>
            <el-table-column label="三、民主测评">
                <el-table-column
                        prop="democraticYnum"
                        label="优秀"
                        min-width="55">
                </el-table-column>
                <el-table-column
                        prop="democraticHege"
                        label="合格"
                        min-width="55">
                </el-table-column>
                <el-table-column
                        prop="democraticBuhege"
                        label="不合格"
                        min-width="55">
                </el-table-column>
            </el-table-column>
            <el-table-column label="四、个别谈话">
                <el-table-column
                        prop="chatYnum"
                        label="优秀"
                        min-width="55">
                </el-table-column>
                <el-table-column
                        prop="chatHege"
                        label="合格"
                        min-width="55">
                </el-table-column>
                <el-table-column
                        prop="chatBuhege"
                        label="不合格"
                        min-width="55">
                </el-table-column>
            </el-table-column>
            <el-table-column label="五、实绩分析">
                <el-table-column
                        prop="performanceYnum"
                        label="优秀"
                        min-width="55">
                </el-table-column>
                <el-table-column
                        prop="performanceHege"
                        label="合格"
                        min-width="55">
                </el-table-column>
                <el-table-column
                        prop="performanceBuhege"
                        label="不合格"
                        min-width="55">
                </el-table-column>
            </el-table-column>
            <el-table-column label="六、素质考核">
                <el-table-column
                        prop="qualityYnum"
                        label="优秀"
                        min-width="55">
                </el-table-column>
                <el-table-column
                        prop="qualityHege"
                        label="合格"
                        min-width="55">
                </el-table-column>
                <el-table-column
                        prop="qualityBuhege"
                        label="不合格"
                        min-width="55">
                </el-table-column>
            </el-table-column>
            <el-table-column label="七、综合评定">
                <el-table-column
                        prop="zonghe"
                        label=""
                        min-width="105">
                </el-table-column>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "assessResult",
        data() {
            return {
                //饼图总数据
                pieData: {},
                year: '',
                //雷达图总数据
                radarData: [],
                youxiuData: [ 0, 0, 0, 0, 0 ],
                hegeData: [ 0, 0, 0, 0, 0 ],
                buhegeData: [ 0, 0, 0, 0, 0 ],
                //雷达图名字
                myCharts: '',
                //饼图名字
                myChart: '',
                myChart2: '',
                myChart3: '',
                //下拉框值
                value: '1',
                tableData: [],
                //下拉框切换控制
                echartsControl: 1,
                options: [
                    {
                        value: '1',
                        label: '一、汇报推荐',
                    },
                    {
                        value: '2',
                        label: '二、个人述职',
                    },
                    {
                        value: '3',
                        label: '三、个别谈话',
                    },
                    {
                        value: '4',
                        label: '四、实绩分析',
                    },
                    {
                        value: '5',
                        label: '五、素质考核',
                    },
                    {
                        value: '6',
                        label: '六、综合评定',
                    }

                ]
            }
        },
        watch: {
            value( newValue, oldValue ) {
                if ( oldValue === '1' ) {
                    this.echartsControl = 1
                } else {
                    this.echartsControl = 0
                }
            },
        },
        created() {
            this.year = parseInt( this.$moment( new Date() ).format( "YYYY" ) );
            this.getData().then( () => {
                    this.drawLine();
                    this.drawPie( '推荐', '不推荐', this.pieData.reportRecommend, this.pieData.reportUrecommend, '', '', '', '', '', '', '', '' )
                }
            )
        },
        mounted() {

        },
        methods: {
            getData() {
                return new Promise( resolve => {
                    this.$axios( {
                        methods: 'post',
                        url: 'aprPersonalExamineResult/getFiveDataByInfoId',
                    } ).then( ( res ) => {
                        let array = [];
                        for ( let i in res.data.data ) {
                            array.push( res.data.data[ i ].tvalue )
                        }
                        this.radarData = array;
                        this.$axios( {
                            methods: 'post',
                            url: 'aprPersonalExamineResult/getStatDataByInfoId',
                        } ).then( ( res ) => {
                            this.pieData = res.data.data
                            resolve()
                        } );

                    } );
                    this.$axios( {
                        method: 'get',
                        url: 'organization/all/-1',
                    } ).then( ( res ) => {
                        this.organizationOptions = [];
                        for ( let i in res.data ) {
                            this.organizationOptions.push( { label: res.data[ i ].orgName, value: res.data[ i ].id } )
                        }
                        let data = {
                            year: this.year,
                        };
                        this.$axios( {
                            method: 'post',
                            url: 'aprPersonalExamineResult/list2',
                            data: this.$Qs.stringify( data )
                        } ).then( ( res ) => {
                            this.tableData = [];
                            for ( let i in res.data.data.list ) {
                                this.tableData.push( res.data.data.list[ i ] )
                            }
                        } );

                    } );
                } )

            },
            //单行点击
            colClick( row ) {
                this.$axios( {
                    method: 'get',
                    url: 'aprPersonalExamineResult/getFiveDataByInfoId?infoId=' + row.personalInfo.id
                } ).then( ( res ) => {
                    this.youxiuData = [];
                    this.hegeData = [];
                    this.buhegeData = [];
                    for ( let i in res.data.data ) {
                        this.radarData.push( res.data.data[ i ].tvalue );
                        this.youxiuData.push( res.data.data[ i ].yvalue );
                        this.hegeData.push( res.data.data[ i ].hvalue );
                        this.buhegeData.push( res.data.data[ i ].bvalue );
                    }
                    this.myCharts.clear();
                    this.drawLine()
                } );
                this.$axios( {
                    methods: 'post',
                    url: 'aprPersonalExamineResult/getStatDataByInfoId?infoId=' + row.personalInfo.id,
                } ).then( ( res ) => {
                    this.pieData = res.data.data;
                    this.value = '1';
                    setTimeout( () => {
                        if ( this.echartsControl === 1 ) {
                            this.myChart.clear();
                            this.drawPie( '推荐', '不推荐', this.pieData.reportRecommend, this.pieData.reportUrecommend, '', '', '', '', '', '', '', '' );
                        } else {
                            this.myChart.clear();
                            this.myChart2.clear();
                            this.myChart3.clear();
                            this.drawPie( '推荐', '不推荐', this.pieData.reportRecommend, this.pieData.reportUrecommend, '', '', '', '', '', '', '', '' );
                        }
                    }, 200 );

                } );
            },
            //下拉框数据变化
            change( value ) {
                switch ( value ) {
                    case '1':
                        setTimeout( () => {
                            if ( this.echartsControl === 1 ) {
                                this.myChart.clear();
                                this.drawPie( '推荐', '不推荐', this.pieData.reportRecommend, this.pieData.reportUrecommend, '', '', '', '', '', '', '', '' );
                            } else {
                                this.myChart.clear();
                                this.myChart2.clear();
                                this.myChart3.clear();
                                this.drawPie( '推荐', '不推荐', this.pieData.reportRecommend, this.pieData.reportUrecommend, '', '', '', '', '', '', '', '' );
                            }
                        }, 200 );
                        break;
                    case '2':
                        setTimeout( () => {
                            if ( this.echartsControl === 1 ) {
                                this.myChart.clear();
                                this.drawPie( '优秀', '合格+不合格', this.pieData.worky, this.pieData.workyOther, '合格', '优秀+不合格', this.pieData.workHege, this.pieData.workHegeOhter, '不合格', '优秀+合格', this.pieData.workBuhege, this.pieData.workBuhegeOther );
                            } else {
                                this.myChart.clear();
                                this.myChart2.clear();
                                this.myChart3.clear();
                                this.drawPie( '优秀', '合格+不合格', this.pieData.worky, this.pieData.workyOther, '合格', '优秀+不合格', this.pieData.workHege, this.pieData.workHegeOhter, '不合格', '优秀+合格', this.pieData.workBuhege, this.pieData.workBuhegeOther );
                            }
                        }, 200 );
                        break;
                    case '3':
                        setTimeout( () => {
                            if ( this.echartsControl === 1 ) {
                                this.myChart.clear();
                                this.drawPie( '优秀', '合格+不合格', this.pieData.democraticy, this.pieData.chatyOther, '合格', '优秀+不合格', this.pieData.democraticHegeOther, this.pieData.democraticBuhegeOther, '不合格', '优秀+合格', this.pieData.democraticBuhege, this.pieData.performanceBuhegeOther );
                            } else {
                                this.myChart.clear();
                                this.myChart2.clear();
                                this.myChart3.clear();
                                this.drawPie( '优秀', '合格+不合格', this.pieData.democraticy, this.pieData.chatyOther, '合格', '优秀+不合格', this.pieData.democraticHegeOther, this.pieData.democraticBuhegeOther, '不合格', '优秀+合格', this.pieData.democraticBuhege, this.pieData.performanceBuhegeOther );
                            }
                        }, 200 );
                        break;
                    case '4':
                        setTimeout( () => {
                            if ( this.echartsControl === 1 ) {
                                this.myChart.clear();
                                this.drawPie( '优秀', '合格+不合格', this.pieData.chaty, this.pieData.chatyOther, '合格', '优秀+不合格', this.pieData.chatHege, this.pieData.chatHegeOther, '不合格', '优秀+合格', this.pieData.chatBuhege, this.pieData.chatBuhegeOther );
                            } else {
                                this.myChart.clear();
                                this.myChart2.clear();
                                this.myChart3.clear();
                                this.drawPie( '优秀', '合格+不合格', this.pieData.chaty, this.pieData.chatyOther, '合格', '优秀+不合格', this.pieData.chatHege, this.pieData.chatHegeOther, '不合格', '优秀+合格', this.pieData.chatBuhege, this.pieData.chatBuhegeOther );
                            }
                        }, 200 );
                        break;
                    case '5':
                        setTimeout( () => {
                            if ( this.echartsControl === 1 ) {
                                this.myChart.clear();
                                this.drawPie( '优秀', '合格+不合格', this.pieData.performancey, this.pieData.performanceyOther, '合格', '优秀+不合格', this.pieData.performanceHege, this.pieData.performanceHegeOther, '不合格', '优秀+合格', this.pieData.performanceBuhege, this.pieData.performanceBuhegeOther );
                            } else {
                                this.myChart.clear();
                                this.myChart2.clear();
                                this.myChart3.clear();
                                this.drawPie( '优秀', '合格+不合格', this.pieData.performancey, this.pieData.performanceyOther, '合格', '优秀+不合格', this.pieData.performanceHege, this.pieData.performanceHegeOther, '不合格', '优秀+合格', this.pieData.performanceBuhege, this.pieData.performanceBuhegeOther );
                            }
                        }, 200 );
                        break;
                    case '6':
                        setTimeout( () => {
                            if ( this.echartsControl === 1 ) {
                                this.myChart.clear();
                                this.drawPie( '优秀', '合格+不合格', this.pieData.qualityy, this.pieData.qualityyOther, '合格', '优秀+不合格', this.pieData.qualityHege, this.pieData.qualityHegeOther, '不合格', '优秀+合格', this.pieData.qualityBuhege, this.pieData.qualityBuhegeOther );
                            } else {
                                this.myChart.clear();
                                this.myChart2.clear();
                                this.myChart3.clear();
                                this.drawPie( '优秀', '合格+不合格', this.pieData.qualityy, this.pieData.qualityyOther, '合格', '优秀+不合格', this.pieData.qualityHege, this.pieData.qualityHegeOther, '不合格', '优秀+合格', this.pieData.qualityBuhege, this.pieData.qualityBuhegeOther );
                            }
                        }, 200 );
                        break;
                }


            },
            //左边得echarts
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                this.myCharts = this.$eCharts.init( document.getElementById( 'first' ) );
                // 绘制图表
                this.myCharts.setOption( {
                    title: {
                        text: ''
                    },

                    tooltip: {},
                    radar: {
                        // shape: 'circle',
                        name: {
                            textStyle: {
                                color: '#fff',
                                backgroundColor: '#999',
                                borderRadius: 3,
                                padding: [ 3, 5 ]
                            }
                        },
                        indicator: [
                            { name: '德', max: this.radarData[ 0 ] },
                            { name: '廉', max: this.radarData[ 1 ] },
                            { name: '绩', max: this.radarData[ 2 ] },
                            { name: '勤', max: this.radarData[ 3 ] },
                            { name: '能', max: this.radarData[ 4 ] },
                        ]
                    },
                    series: [ {

                        type: 'radar',
                        // areaStyle: {normal: {}},
                        data: [
                            {
                                value: this.youxiuData,
                                name: '优秀'
                            },
                            {
                                value: this.hegeData,
                                name: '合格'
                            },
                            {
                                value: this.buhegeData,
                                name: '不合格'
                            },

                        ]
                    } ]
                } );
            },
            //右边得echarts
            drawPie( firstName, firstOtherName, firstValue, firstOtherValue, secondName, secondOtherName, secondValue, secondOtherValue, thirdName, thirdOtherName, thirdValue, thirdOtherValue ) {
                this.myChart = this.$eCharts.init( document.getElementById( 'second-1' ) );
                this.myChart.setOption( {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: [ firstName, firstOtherName ]
                    },
                    color: [ 'rgb(58,161,254)', 'rgb(240,242,245)' ],
                    series: [
                        {
                            name: '信息',
                            type: 'pie',
                            radius: [ '50%', '70%' ],
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
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [
                                { value: firstValue, name: firstName },
                                { value: firstOtherValue, name: firstOtherName }
                            ]
                        }
                    ]
                } );
                if ( secondName !== '' ) {
                    this.myChart2 = this.$eCharts.init( document.getElementById( 'second-2' ) );
                    this.myChart2.setOption( {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'left',
                            data: [ secondName, secondOtherName ]
                        },
                        color: [ 'rgb(106,210,236)', 'rgb(240,242,245)' ],
                        series: [
                            {
                                name: '信息',
                                type: 'pie',
                                radius: [ '50%', '70%' ],
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
                                            fontWeight: 'bold'
                                        }
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: false
                                    }
                                },
                                data: [
                                    { value: secondValue, name: secondName },
                                    { value: secondOtherValue, name: secondOtherName }

                                ]
                            }
                        ]
                    } );
                }
                if ( thirdName !== '' ) {
                    this.myChart3 = this.$eCharts.init( document.getElementById( 'second-3' ) );
                    this.myChart3.setOption( {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'left',
                            data: [ thirdName, thirdOtherName ]
                        },
                        color: [ 'rgb(252,219,86)', 'rgb(240,242,245)' ],
                        series: [
                            {
                                name: '信息',
                                type: 'pie',
                                radius: [ '50%', '70%' ],
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
                                            fontWeight: 'bold'
                                        }
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: false
                                    }
                                },
                                data: [
                                    { value: thirdValue, name: thirdName },
                                    { value: thirdOtherValue, name: thirdOtherName }

                                ]
                            }
                        ]
                    } );
                }

            },
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

    .box-card >>> .el-card__body {
        height: 85%;
        width: 100%;
        padding: 0;
    }

    .box-card {
        width: 480px;
    }

    .el-col {
        text-align: left;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .clearfix {
        color: rgb(153, 153, 153);
        font-size: 13px;
    }

</style>
