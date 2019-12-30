<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="120px">
            <div style="display: flex;justify-content: space-between;">
                <div style="display: grid;
                grid-gap: 20px;
                grid-template-columns: auto auto auto;
                grid-template-rows: auto auto auto;"
                >
                    <span>{{ year }}年度考核</span>
                    <span>考评对象：{{ $route.params.data.personalInfo.policeName }}</span>
                    <span>组织机构：{{ organization }}</span>
                </div>
                <div>
                    <el-form-item label="登录人">
                        <el-input v-model="formInline.name" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </div>
            </div>
        </el-form>
        <el-table
                border
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%;font-size: 12px;"
                @selection-change="handleSelectionChange">
            <el-table-column label="一、汇报推荐">
                <el-table-column
                        prop="reportTotalNum"
                        label="参评人数"
                        min-width="65">
                </el-table-column>
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
            <el-table-column label="二、个人述职评分">
                <el-table-column
                        prop="workTotalNum"
                        label="参评人数"
                        min-width="65">
                </el-table-column>
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
                        prop="democraticTotalNum"
                        label="参评人数"
                        min-width="65">
                </el-table-column>
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
            <el-table-column label="四、个人谈话">
                <el-table-column
                        prop="chatYnum"
                        label="优秀"
                        min-width="55">
                </el-table-column>
                <!--                <el-table-column-->
                <!--                        prop="policeRank"-->
                <!--                        label="良好"-->
                <!--                        min-width="55">-->
                <!--                </el-table-column>-->
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
                <!--                <el-table-column-->
                <!--                        prop="policeRank"-->
                <!--                        label="良好"-->
                <!--                        min-width="55">-->
                <!--                </el-table-column>-->
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
                <!--                <el-table-column-->
                <!--                        prop="policeRank"-->
                <!--                        label="良好"-->
                <!--                        min-width="55">-->
                <!--                </el-table-column>-->
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
        </el-table>
        <el-table
                border
                ref="multipleTable"
                :data="tableData2"
                tooltip-effect="dark"
                style="width: 100%;font-size: 12px;"
                @selection-change="handleSelectionChange">
            <el-table-column
                    label="序号"
                    min-width="40">
                <template slot-scope="scope">
                    <span v-text="getIndex(scope.$index)"> </span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="loginName"
                    label="登录人"
                    min-width="60">
            </el-table-column>
            <!--            <el-table-column-->
            <!--                    prop="loginTime"-->
            <!--                    label="更新时间"-->
            <!--                    min-width="69">-->
            <!--            </el-table-column>-->
            <el-table-column
                    prop="orgName"
                    label="组织机构"
                    min-width="80">
            </el-table-column>
            <el-table-column
                    prop="joinNum"
                    label="参与考评"
                    min-width="69">
            </el-table-column>
            <el-table-column label="一、汇报推荐">
                <el-table-column
                        prop="reportRecommendNum"
                        label="推荐"
                        min-width="50">
                </el-table-column>
                <el-table-column
                        prop="reportUrecommendNum"
                        label="不推荐"
                        min-width="57">
                </el-table-column>
            </el-table-column>
            <el-table-column label="二、个人述职评分">

                <el-table-column
                        prop="workYnum"
                        label="优秀"
                        min-width="50">
                </el-table-column>
                <el-table-column
                        prop="workHege"
                        label="合格"
                        min-width="50">
                </el-table-column>
                <el-table-column
                        prop="workBuhege"
                        label="不合格"
                        min-width="57">
                </el-table-column>
            </el-table-column>
            <el-table-column label="三、民主测评">
                <el-table-column
                        prop="democraticYnum"
                        label="优秀"
                        min-width="50">
                </el-table-column>
                <el-table-column
                        prop="democraticHege"
                        label="合格"
                        min-width="50">
                </el-table-column>
                <el-table-column
                        prop="democraticBuhege"
                        label="不合格"
                        min-width="57">
                </el-table-column>
            </el-table-column>
            <el-table-column label="四、个人谈话">
                <el-table-column
                        prop="chatYnum"
                        label="优秀"
                        min-width="50">
                </el-table-column>
                <!--                <el-table-column-->
                <!--                        prop="policeRank"-->
                <!--                        label="良好"-->
                <!--                        min-width="55">-->
                <!--                </el-table-column>-->
                <el-table-column
                        prop="chatHege"
                        label="合格"
                        min-width="50">
                </el-table-column>
                <el-table-column
                        prop="chatBuhege"
                        label="不合格"
                        min-width="57">
                </el-table-column>
            </el-table-column>
            <el-table-column label="五、实绩分析">
                <el-table-column
                        prop="performanceYnum"
                        label="优秀"
                        min-width="50">
                </el-table-column>
                <!--                <el-table-column-->
                <!--                        prop="policeRank"-->
                <!--                        label="良好"-->
                <!--                        min-width="55">-->
                <!--                </el-table-column>-->
                <el-table-column
                        prop="performanceHege"
                        label="合格"
                        min-width="50">
                </el-table-column>
                <el-table-column
                        prop="performanceBuhege"
                        label="不合格"
                        min-width="57">
                </el-table-column>
            </el-table-column>
            <el-table-column label="六、素质考核">
                <el-table-column
                        prop="qualityYnum"
                        label="优秀"
                        min-width="50">
                </el-table-column>
                <!--                <el-table-column-->
                <!--                        prop="policeRank"-->
                <!--                        label="良好"-->
                <!--                        min-width="55">-->
                <!--                </el-table-column>-->
                <el-table-column
                        prop="qualityHege"
                        label="合格"
                        min-width="50">
                </el-table-column>
                <el-table-column
                        prop="qualityBuhege"
                        label="不合格"
                        min-width="57">
                </el-table-column>
            </el-table-column>

        </el-table>
    </div>
</template>

<script>
    export default {
        name: "checkQuery",
        data() {
            return {
                organization:'',
                formInline: {
                    name: ''
                },
                year: '',
                tableData: [],
                tableData2: [],
                //序号
                num: '',
            }
        },
        created() {
            this.year = parseInt( this.$moment( new Date() ).format( "YYYY" ) );
            this.tableData.push( this.$route.params.data )
        },
        mounted() {

            this.getData();
        },
        methods: {
            //获取数据
            getData() {
                this.$axios( {
                    method: 'get',
                    url: 'aprPersonalInfo/getPersonalInfoByInfoId?infoId=' + this.$route.params.data.id
                } ).then( (  ) => {
                    // this.organization = res.data.data
                } );
                this.$axios( {
                    method: 'get',
                    url: 'aprPersonalExamineResult/getDetailListByInfoId?infoId=' + this.$route.params.data.id
                } ).then( ( res ) => {
                    this.tableData2 = res.data.data
                } )
            },
            onSubmit() {
                let data = {
                    loginName: this.formInline.name,
                    infoId: this.$route.params.data.id
                };
                this.$axios( {
                    method: 'post',
                    url: 'aprPersonalExamineResult/getDetailListByInfoId',
                    data: this.$Qs.stringify( data )
                } ).then( ( res ) => {
                    this.tableData2 = res.data.data
                } )
            },
            getIndex( $index ) {
                //表格序号
                return ( this.num - 1 ) * this.num + $index + 1
            },
            handleSelectionChange( val ) {
                this.multipleSelection = val;
            },
            //编辑表格行
            handleClick() {

            },
            //删除表格行
            handleDelete() {

            },
        }
    }
</script>

<style scoped>

</style>
