<template>
    <div>
        <div>
                <el-button type="info" plain @click="goBack">返回首页</el-button>
        </div>
        <div>
            <div>
                <el-divider content-position="left">系统用户</el-divider>
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
                <el-table-column
                        prop="realName"
                        label="用户姓名"
                        min-width="120">
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="登录账户"
                        min-width="120">
                </el-table-column>
                <!--                <el-table-column-->
                <!--                        prop="password"-->
                <!--                        label="登录密码"-->
                <!--                        min-width="120">-->
                <!--                </el-table-column>-->
                <el-table-column
                        prop="roleNames"
                        label="用户角色"
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
                        label="登录账户"
                        prop="account"
                        :rules="[
                      { required: true, message: '登录账户不能为空'},
                    ]"
                >
                    <el-input type="text" v-model="form.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                        label="登录密码"
                        prop="password"
                        :rules="[
                      { required: true, message: '登录密码不能为空'},
                    ]"
                >
                    <el-input type="text" v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                        label="用户名"
                        prop="realName"
                        :rules="[
                      { required: true, message: '请填写用户名'},
                    ]"
                >
                    <el-input type="text" v-model="form.realName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                        label="档案用户名"
                        prop="name"
                        :rules="[
                      { required: true, message: '请选择档案用户名'},
                    ]"
                >
                    <el-select clearable  v-model="form.name" placeholder="请选择">
                        <el-option
                                v-for="item in nameOptions"
                                :key="item.index"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                        label="用户角色"
                        prop="role"
                        :rules="[
                      { required: true, message: '请选择角色'},
                    ]"
                >
                    <el-select clearable  v-model="form.role" placeholder="请选择">
                        <el-option
                                v-for="item in roleOptions"
                                :key="item.index"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                        label="组织机构"
                        prop="organization"
                        :rules="[
                      { required: true, message: '请选择组织机构'},
                    ]"
                >
                    <el-select clearable  v-model="form.organization" placeholder="请选择">
                        <el-option
                                v-for="item in organizationOptions"
                                :key="item.index"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
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
        name: "systemUser",
        data() {
            return {
                restaurants:[],
                roleOptions: [],
                //用户名数据
                nameOptions:[],
                organizationOptions: [],
                //当前行id
                id: "",
                form: {
                    account: '',
                    name: "",
                    password: '',
                    organization:'',
                    role: '',
                    infoId:'',
                    realName:''
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
        mounted() {
            this.restaurants = this.loadAll();
        },
        methods: {
            //名字输入后
            handleSelect(item) {
                this.form.infoId=item.id
            },
            //名字下拉框数据查询
            loadAll(){
                let data={
                  page: 1,
                  size:99999999
                };
                let restaurants=[];
                this.$axios({
                    method:'get',
                    url:'aprPersonalInfo/list',
                    data:this.$Qs.stringify(data)
                }).then((res)=>{
                    for (let i in res.data.data.list){
                        restaurants.push({"value":res.data.data.list[i].policeName,id:res.data.data.list[i].id})
                    }
                });
                return restaurants;
            },
            //名字模糊筛选
            querySearch(queryString, cb) {
                let restaurants = this.restaurants;
                let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            //提交新增表单
            submitForm( formName ) {
                this.$refs[ formName ].validate( ( valid ) => {
                    if ( valid ) {
                        let data = {
                            roleIds: this.form.role,
                            password: this.form.password,
                            username: this.form.account,
                            infoId:this.form.name,
                            orgId:this.form.organization,
                            realName:this.form.realName
                        };
                        if ( this.title == "编辑系统用户" ) {
                            data.id = this.id;
                        }
                        this.$axios( {
                            method: 'post',
                            url: '/user/setUser',
                            data: this.$Qs.stringify( data )
                        } ).then( () => {
                            this.pageCurrent = 1;
                            this.form.role = '';
                            this.form.account = '';
                            this.form.password = '';
                            this.getData();
                            this.dialogVisible = false;
                            this.$refs.form.resetFields();
                        } )
                    } else {
                        console.log( 'error submit!!' );
                        return false;
                    }
                } );
            },
            resetForm() {
                this.form.role = '';
                this.form.name = '';
                this.form.organization = '';
                this.form.realName = '';
                this.form.infoId = '';
                this.form.account = '';
                this.form.password = '';
                this.dialogVisible = false;
                this.$refs.form.resetFields();

            },
            //回到首页
            goBack(){
                this.$router.push('checkHomePage')
            },
            //新增
            create() {
                this.title = '新增系统用户';
                this.$axios({
                    method:'get',
                    url:'aprPersonalInfo/list?bind=false',
                }).then((res)=>{
                    this.nameOptions=[];
                    for (let i in res.data.data.list){
                        this.nameOptions.push({label:res.data.data.list[i].policeName,value:res.data.data.list[i].id})
                    }
                });
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
                let data = {
                    page: this.pageCurrent,
                    limit: this.pageSize,
                };
                this.$axios( {
                    method: 'post',
                    url: '/user/getUsers',
                    data: this.$Qs.stringify( data )
                } ).then( ( res ) => {
                    this.tableData = res.data.list;
                    this.total = res.data.totals;
                } );
                this.$axios( {
                    method: 'get',
                    url: '/organization/all/-1',
                } ).then( ( res ) => {
                    this.organizationOptions=[];
                    for ( let i in res.data ) {
                        this.organizationOptions.push( { value: res.data[ i ].id, label: res.data[ i ].orgName+' - '+res.data[i].orgCode } )
                    }
                } );
                this.$axios( {
                    method: 'get',
                    url: '/auth/getRoleList',
                } ).then( ( res ) => {
                    this.roleOptions=[];

                    for ( let i in res.data ) {
                        this.roleOptions.push(
                            {
                                value: res.data[ i ].id,
                                label: res.data[ i ].roleName
                            }
                        )
                    }

                } );
            },
            getIndex( $index ) {
                //表格序号
                return ( this.num - 1 ) * this.num + $index + 1
            },
            //编辑表格行
            handleClick( row ) {
                this.$axios({
                    method:'get',
                    url:'aprPersonalInfo/list?bind='+'false'
                }).then((res)=>{
                    this.nameOptions=[];
                    for (let i in res.data.data.list){
                        this.nameOptions.push({label:res.data.data.list[i].policeName,value:res.data.data.list[i].id})
                    }
                    this.nameOptions.push({
                        label:row.infoName,value:row.infoId
                    });
                    this.form.realName=row.realName;
                    this.id = row.id;
                    this.form.name=row.infoId;
                    this.form.role = row.roleIds;
                    this.form.organization=row.orgId;
                    this.form.account = row.username;
                    this.form.password = row.password;
                    this.title = '编辑系统用户';
                    this.dialogVisible = true;
                })



            },
            //删除表格行
            handleDelete( row ) {
                let data = {
                    id: row.id,
                    version: 0,
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
            handleClose( done ) {
                this.$confirm( '确认关闭？' )
                    .then( () => {
                        this.form.role = '';
                        this.form.name = '';
                        this.form.organization = '';
                        this.form.realName = '';
                        this.form.infoId = '';
                        this.form.account = '';
                        this.form.password = '';
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
