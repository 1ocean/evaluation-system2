<template>
    <div>
        <div>
            <el-button type="info" plain @click="goBack">返回首页</el-button>
        </div>
        <div>
            <div>
                <el-divider content-position="left">系统权限</el-divider>
                <el-button style="float: right;margin-bottom: 1%" type="primary" @click="create">新增</el-button>
            </div>
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
                        prop="name"
                        label="权限名称"
                        min-width="120">
                </el-table-column>
                <el-table-column
                        prop="descpt"
                        label="权限描述"
                        min-width="120">
                </el-table-column>
                <el-table-column
                        prop="page"
                        label="权限路径"
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
<!--            <el-pagination-->
<!--                    @current-change="currentChange"-->
<!--                    @prev-click="prevClick"-->
<!--                    @next-click="nextClick"-->
<!--                    style="text-align: right"-->
<!--                    background-->
<!--                    layout="prev, pager, next"-->
<!--                    :page-size="pageSize"-->
<!--                    :total="total">-->
<!--            </el-pagination>-->
        </div>
        <el-dialog
                :title="title"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm">

                <el-form-item
                        label="权限名称"
                        prop="name"
                        :rules="[
                      { required: true, message: '权限名称不能为空'},
                    ]"
                >
                    <el-input type="text" v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                        label="权限描述"
                        prop="describe"
                        :rules="[
                      { required: true, message: '权限描述不能为空'},
                    ]"
                >
                    <el-input type="text" v-model="form.describe" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                        label="系统路径"
                        prop="page"
                        :rules="[
                      { required: true, message: '系统路径不能为空'},
                    ]"
                >
                    <el-input type="text" v-model="form.page" autocomplete="off"></el-input>
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
        name: "systemJurisdiction",
        data() {
            return {
                //当前行id
                id:"",
                form: {
                    name: "",
                    describe: '',
                    page:''
                },
                //modul名字
                title: '',
                //控制显示
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
            this.getData()
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
                            name: this.form.name,
                            descpt: this.form.describe,
                            page: this.form.page,
                        };
                        if (this.title=="编辑系统权限" ){
                            data.id=this.id;
                        }
                        this.$axios( {
                            method: 'post',
                            url: '/auth/addPermission',
                            data: this.$Qs.stringify( data )
                        } ).then( () => {
                            // this.pageCurrent = 1;
                            this.getData();
                            this.dialogVisible = false;
                            this.form.name = '';
                            this.form.describe = '';
                            this.form.page = '';
                        } );
                        this.$refs.form.resetFields();
                    } else {
                        console.log( 'error submit!!' );
                        return false;
                    }
                } );
            },
            resetForm() {
                this.form.name = '';
                this.form.describe = '';
                this.form.page = '';
                this.dialogVisible = false;
                this.$refs.form.resetFields();
            },
            //新增
            create() {
                this.title = '新增系统权限';
                this.dialogVisible = true;
            },
            //表格选择页
            currentChange( val ) {
                this.pageCurrent = `${ val }`;
                this.getData()
            },
            //表格上一页
            prevClick( val ) {
                this.pageCurrent = `${ val }`;
                this.getData();
            },
            //表格下一页
            nextClick( val ) {
                this.pageCurrent = `${ val }`;
                this.getData();
            },
            //获取数据
            getData() {

                this.$axios( {
                    method: 'get',
                    url: '/auth/getAllPerms'

                } ).then( ( res ) => {
                    this.tableData = res.data;
                    // this.total = res.data.totals;
                } )
            },
            getIndex( $index ) {
                //表格序号
                return ( this.num - 1 ) * this.num + $index + 1
            },
            //编辑表格行
            handleClick( row ) {
                this.id=row.id;
                this.form.name = row.name;
                this.form.describe = row.descpt;
                this.form.page = row.page;
                this.title = '编辑系统权限';
                this.dialogVisible = true;

            },
            //删除表格行
            handleDelete( row ) {
                let data = {
                    id: row.id,
                };
                this.$axios( {
                    method: 'post',
                    url: '/auth/del',
                    data: this.$Qs.stringify( data )
                } ).then( () => {

                    this.getData()
                } )
            },
            handleClose( done ) {
                this.$confirm( '确认关闭？' )
                    .then( () => {
                        this.form.name = '';
                        this.form.describe = '';
                        done();
                    } )
                    .catch( () => {
                    } );
            }
        }
    }
</script>

<style scoped>
    .el-divider__text{
        font-size: 20px;
        font-weight: bolder;
    }
</style>
