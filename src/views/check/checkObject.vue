<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="120px">
            <div>
                <el-form-item label="选择年度">
                    <el-select clearable  v-model="formInline.year" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="组织机构">
                    <el-select clearable  v-model="formInline.organization" placeholder="请选择">
                        <el-option
                                v-for="item in organizationOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!--                <el-form-item label="类别">-->
                <!--                    <el-select v-model="formInline.type" placeholder="请选择">-->
                <!--                        <el-option label="主管" value="主管"></el-option>-->
                <!--                        <el-option label="警员" value="警员"></el-option>-->
                <!--                    </el-select>-->
                <!--                </el-form-item>-->
            </div>
            <div>
                <el-form-item label="选择时间条件">
                    <el-select clearable  v-model="formInline.timeConditions" placeholder="请选择" @change="timeChange">
                        <el-option
                                v-for="item in timeConditionsOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-date-picker
                            :disabled="timeControl"
                            v-model="formInline.time"
                            type="daterange"
                            value-format="yyyy-MM-dd hh:mm:ss"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="formInline.name" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </div>
<!--            <div style="display: flex;justify-content: space-between;margin-bottom: 1%">-->
<!--                <div>-->
<!--                    <el-button type="primary">选择全部</el-button>-->
<!--                    <el-button type="primary">删除所选</el-button>-->
<!--                </div>-->
<!--                <div>-->
<!--&lt;!&ndash;                    <el-button type="primary">年度考评发起</el-button>&ndash;&gt;-->
<!--                </div>-->
<!--            </div>-->
        </el-form>
        <el-table
                border
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="45">
            </el-table-column>
            <el-table-column
                    prop="year"
                    label="年度"
                    min-width="40">
            </el-table-column>
            <el-table-column
                    prop="policeName"
                    label="姓名"
                    min-width="60">
            </el-table-column>
            <el-table-column
                    label="头像"
                    min-width="50">
                <template slot-scope="scope">
                    <img :src="scope.row.imgPath" width="40" height="40" class="head_pic"/>
                </template>
            </el-table-column>
            <el-table-column
                    prop="birthDay"
                    label="出生时间"
                    min-width="90">
            </el-table-column>
            <el-table-column
                    prop="militaryTime"
                    label="入伍时间"
                    min-width="90">
            </el-table-column>
            <el-table-column
                    prop="policeRank"
                    label="现警衔"
                    min-width="60">
            </el-table-column>
            <el-table-column
                    prop="policeRankTime"
                    label="现警衔任职时间"
                    min-width="90">
            </el-table-column>
            <el-table-column
                    prop="deptPosition"
                    label="现部职别"
                    min-width="60">
            </el-table-column>
            <el-table-column
                    prop="deptPositionTime"
                    label="现部职别时间"
                    min-width="90">
            </el-table-column>
            <el-table-column
                    prop="orgName"
                    label="组织机构"
                    min-width="90">
            </el-table-column>
            <el-table-column
                    prop="姓名"
                    label="状态"
                    min-width="60">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    min-width="80" >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "checkObject",
        data() {
            return {

                imgPath:'',
                //控制时间选择
                timeControl: true,
                //年度数据
                options: [],
                //组织机构数据
                organizationOptions: [],
                //时间条件
                timeConditionsOptions: [
                    {
                        label: '入伍时间',
                        value: '1'
                    },
                    {
                        label: '现任职务时间',
                        value: '2'
                    },
                    {
                        label: '现部级别时间',
                        value: '3'
                    },
                    {
                        label: '警衔时间',
                        value: '4'
                    },
                ],
                formInline: {
                    year: '',
                    organization: '',
                    type: '',
                    timeConditions: '',
                    time: '',
                    name: ''
                },
                tableData: [],
                multipleSelection: []
            }
        },
        created() {
            let years = parseInt( this.$moment( new Date() ).format( "YYYY" ) );
            let array = [ years, years - 1, years - 2, years - 3, years - 4 ];
            for ( let i in array ) {
                this.options.push(
                    {
                        value: array[ i ],
                        label: array[ i ]
                    }
                )
            }
        },
        mounted() {
            this.formInline.year = this.options[ 0 ].value;
            this.getData()
        },
        methods: {
            //时间控制
            timeChange() {
                this.timeControl = false;
            },
            //获取数据
            getData() {
                let data = {
                    year: this.formInline.year,
                    orgId: this.formInline.organization,
                    nowPosition: this.formInline.type,
                    policeName: this.formInline.name,
                };
                this.$axios( {
                    method: 'post',
                    url: 'aprPersonalInfoYear/list2',
                    data: this.$Qs.stringify( data )
                } ).then( ( res ) => {
                    let data = res.data.data.list;
                    let array = [];
                    for ( let i in data ) {
                        array.push( data[ i ].personalInfo );
                        array[ i ].imgPath = this.$baseUrl + '/'+ data[ i ].personalInfo.imgPath;
                        array[ i ].year = data[ i ].year;
                        array[ i ].infoId = data[ i ].infoId
                    }
                    this.tableData = array;
                    array = [];
                } );
                this.$axios( {
                    method: 'get',
                    url: 'organization/all/-1'
                } ).then( ( res ) => {
                    for ( let i in res.data ){
                        this.organizationOptions.push( { label: res.data[ i ].orgName, value: res.data[ i ].id } )
                    }

                } )

            },
            onSubmit() {
                let data = {
                    year: this.formInline.year,
                    orgId: this.formInline.organization,
                    policeName: this.formInline.name
                };
                switch ( this.formInline.timeConditions ) {
                    case '1':
                        data.militaryTimeStart = this.formInline.time[ 0 ];
                        data.militaryTimeEnd = this.formInline.time[ 1 ];
                        break;
                    case '2':
                        data.militaryTimeStart = this.formInline.time[ 0 ];
                        data.militaryTimeEnd = this.formInline.time[ 1 ];
                        break;
                    case '3':
                        data.militaryTimeStart = this.formInline.time[ 0 ];
                        data.militaryTimeEnd = this.formInline.time[ 1 ];
                        break;
                    case '4':
                        data.militaryTimeStart = this.formInline.time[ 0 ];
                        data.militaryTimeEnd = this.formInline.time[ 1 ];
                        break;
                    default:
                        console.log( 'nothing' );
                }
                this.$axios( {
                    method: 'post',
                    url: 'aprPersonalInfoYear/list2',
                    data: this.$Qs.stringify(data)
                } ).then( ( res ) => {
                    let data = res.data.data.list;
                    let array = [];
                    for ( let i in data ) {
                        array.push( data[ i ].personalInfo );
                        array[ i ].imgPath = this.$baseUrl + data[ i ].personalInfo.imgPath;
                        array[ i ].year = data[ i ].year;
                        array[ i ].infoId = data[ i ].infoId
                    }
                    this.tableData = array;
                    array = [];
                } );

            },
            handleSelectionChange( val ) {
                this.multipleSelection = val;
            },
            //编辑表格行
            handleClick( row ) {
                let infoId=row.infoId;
                this.$router.push({ name: 'checkPrepare', params: { infoId:infoId }});
            },
            //删除表格行
            handleDelete( row ) {
                let data = {
                    id: row.id,
                    version: 0
                };
                this.$axios( {
                    method: 'post',
                    url: '/user/delUser',
                    data: this.$Qs.stringify( data )
                } ).then( () => {
                    this.pageCurrent = 1;
                    this.getData()
                } )
            },
        }
    }
</script>

<style scoped>

</style>
