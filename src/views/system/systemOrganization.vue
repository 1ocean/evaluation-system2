<template>
    <div>
        <div>
                <el-button type="info" plain @click="goBack">返回首页</el-button>
        </div>
        <div>
            <div>
                <el-divider content-position="left">系统机构</el-divider>
                <div>
                    <el-row>
                        <el-col :span="10">
                            <el-input v-model="input" placeholder="请输入组织机构"></el-input>
                        </el-col>
                        <el-col :span="2">
                            <el-button style="float: right;margin-bottom: 1%" type="primary" @click="search">搜索
                            </el-button>
                        </el-col>
                    </el-row>
                </div>

            </div>
            <el-button style="float: right;margin-bottom: 1%" type="primary" @click="create">新增</el-button>
            <el-table
                    border
                    :data="tableData"
                    stripe
                    style="width: 100%">
                <el-table-column
                        prop=""
                        label="序号"
                        width="80">
                    <template slot-scope="scope">
                        <span v-text="getIndex(scope.$index)"> </span>
                    </template>
                </el-table-column>
                <!--                <el-table-column-->
                <!--                        prop="roleNames"-->
                <!--                        label="用户姓名"-->
                <!--                        min-width="120" >-->
                <!--                </el-table-column>-->
                <el-table-column
                        prop="orgCode"
                        label="编号"
                        min-width="120">
                </el-table-column>
                <el-table-column
                        prop="pname"
                        label="上级机构"
                        min-width="120">
                </el-table-column>
                <el-table-column
                        prop="orgName"
                        label="组织机构"
                        min-width="120">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="150">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>

                        <el-popconfirm
                                @onConfirm="handleDelete(scope.row)"
                                confirmButtonText='确定'
                                cancelButtonText='不用了'
                                icon="el-icon-info"
                                iconColor="red"
                                title="这是一段内容确定删除吗？"
                        >
                            <el-button type="text" size="small" slot="reference">删除</el-button>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="currentChange"
                    @prev-click="prevClick"
                    @next-click="nextClick"
                    style="text-align: right"
                    background
                    layout="prev, pager, next"
                    :page-size="pageSize"
                    :total="total">
            </el-pagination>
        </div>
        <el-dialog
                :title="title"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm">
                <el-form-item
                        label="编号"
                        prop="num"
                        :rules="[
                      { required: true, message: '编号不能为空'},
                    ]"
                >
                    <el-input type="text" v-model="form.num" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                        label="上级机构"
                        prop="superior"

                >
                    <el-select clearable  v-model="form.superior" placeholder="请选择">
                        <el-option

                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>

                </el-form-item>
                <el-form-item
                        label="组织机构"
                        prop="organization"
                        :rules="[
                      { required: true, message: '组织机构不能为空'},
                    ]"
                >
                    <el-input type="text" v-model="form.organization" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
             </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "systemOrganization",
        data() {
            return {
                //下拉框数据
                options: [],

                //搜索框
                input: '',
                //当前行id
                id: "",
                form: {
                    num: '',
                    superior: '',
                    organization: ''
                },
                //modul名字
                title: '',
                //控制现实
                dialogVisible: false,
                //总数
                total: 0,
                //表格第几页
                pageCurrent: 1,
                //表格宽度
                pageSize: 10,
                //序号
                num: 1,
                //表格数据
                tableData: []
            }
        },
        created() {
            this.getData();
            this.getSelectData()
        },
        methods: {
            //回到首页
            goBack(){
                this.$router.push('checkHomePage')
            },
            //提交新增表单
            submitForm( formName ) {
                this.$refs[ formName ].validate( ( valid ) => {
                    if ( valid ) {
                        let data = {
                            orgName: this.form.organization,
                            orgCode: this.form.num,
                            pid: this.form.superior
                            // pcode:'',
                            // pname:''
                        };
                        if ( this.title == "编辑系统机构" ) {
                            data.id = this.id;
                        }
                        this.$axios( {
                            method: 'post',
                            url: '/organization/add',
                            data: this.$Qs.stringify( data )
                        } ).then( (res) => {
                            if (res.data.data=="机构编码重复" ){
                                this.form.num = '';
                                return this.$message.error(res.data.data);
                            }else {
                                this.pageCurrent = 1;
                                this.form.organization = '';
                                this.form.num = '';
                                this.form.superior = '';
                                this.search();
                                this.getSelectData();
                                this.dialogVisible = false
                            }

                        } );
                        this.$refs.form.resetFields();
                    } else {
                        console.log( 'error submit!!' );
                        return false;
                    }
                } );
            },
            resetForm() {

                this.form.organization = '';
                this.form.num = '';
                this.form.superior = '';
                this.dialogVisible = false;
                this.$refs.form.resetFields();
            },
            //搜索
            search() {
                let data = {
                    orgName:this.input,
                    page: this.pageCurrent,
                    limit: this.pageSize,
                };
                this.$axios( {
                    method: 'post',
                    url: '/organization/getOrgPageList',
                    data: this.$Qs.stringify( data )
                } ).then( ( res ) => {
                    this.tableData = res.data.list;
                    this.total = res.data.totals;
                } )
            },
            //新增
            create() {
                this.title = '新增系统机构';
                this.dialogVisible = true;
            },
            //表格选择页
            currentChange( val ) {
                this.pageCurrent = `${ val }`;
                this.search()
            },
            //表格上一页
            prevClick( val ) {
                this.pageCurrent = `${ val }`;
                this.search();
            },
            //表格下一页
            nextClick( val ) {
                this.pageCurrent = `${ val }`;
                this.search();
            },
            //获取数据
            getData() {
                let data = {
                    page: this.pageCurrent,
                    limit: this.pageSize,
                };
                this.$axios( {
                    method: 'post',
                    url: '/organization/getOrgPageList',
                    data: this.$Qs.stringify( data )
                } ).then( ( res ) => {

                    this.tableData = res.data.list;
                    this.total = res.data.totals;
                } );
            },
            getSelectData(){
                this.$axios( {
                    method: 'get',
                    url: '/organization/all/-1',
                } ).then( ( res ) => {
                    this.options = [];
                    for ( let i in res.data ) {
                        this.options.push( { value: res.data[ i ].id, label: res.data[ i ].orgName+' - '+res.data[i].orgCode } )
                    }

                } )
            },
            getIndex( $index ) {
                //表格序号
                return ( this.num - 1 ) * this.num + $index + 1
            },
            //编辑表格行
            handleClick( row ) {
                this.$axios( {
                    method: 'get',
                    url: '/organization/all/' + row.id,
                } ).then( ( res ) => {
                    this.options = [];
                    for ( let i in res.data ) {
                        this.options.push( { value: res.data[ i ].id, label: res.data[ i ].orgName+' - '+res.data[i].orgCode } )
                    }
                } );

                this.id = row.id;
                this.form.organization = row.orgName;
                this.form.num = row.orgCode;
                this.form.superior = row.pid;
                if ( row.pid == 1 ) {
                    this.form.superior = '';
                }
                this.title = '编辑系统机构';
                this.dialogVisible = true;

            },
            //删除表格行
            handleDelete( row ) {
                this.$axios( {
                    method: 'post',
                    url: '/organization/delete/' + row.id,
                } ).then( () => {
                    // this.pageCurrent = 1;
                    this.search()
                } )
            },
            handleClose( done ) {
                this.$confirm( '确认关闭？' )
                    .then( () => {
                        this.form.organization = '';
                        this.form.num = '';
                        this.form.superior = '';
                        this.$refs.form.resetFields();
                        done();
                    } )
                    .catch( () => {
                    } );
            }
        }
    }
</script>

<style scoped>
    .el-divider__text {
        font-size: 20px;
        font-weight: bolder;
    }
</style>
