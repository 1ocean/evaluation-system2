<template>
    <div>
        <div>
                <el-button type="info" plain @click="goBack">返回首页</el-button>
        </div>
        <div>
            <div>
                <el-divider content-position="left">系统角色</el-divider>
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
                        prop="roleName"
                        label="角色名称"
                        min-width="120">
                </el-table-column>
                <el-table-column
                        prop="descpt"
                        label="角色描述"
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
        </div>
        <el-dialog
                custom-class="dialog"
                :title="title"
                :visible.sync="dialogVisible"
                width="70%"
                class="el-dialog dialog"
                :before-close="handleClose">
            <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm">
                <el-form-item
                        label="角色名称"
                        prop="name"
                        :rules="[
                      { required: true, message: '角色名称不能为空'},
                    ]"
                >
                    <el-input type="text" v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                        label="角色描述"
                        prop="describe"
                        :rules="[
                      { required: true, message: '角色描述不能为空'},
                    ]"
                >
                    <el-input type="text" v-model="form.describe" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                        label="职务"
                        prop="duty"
                        :rules="[
                      { required: true, message: '请选择职务'},
                    ]"
                >
                    <el-select clearable  v-model="form.duty" placeholder="请选择">
                        <el-option
                                v-for="item in dutyOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>

                </el-form-item>
                <el-form-item
                        label="系统权限"
                        prop="jurisdiction"
                        :rules="[
                      { required: true, message: '请添加权限'},
                    ]"
                >
                    <el-transfer
                            style="text-align: left; display: inline-block"
                            v-model="form.jurisdiction"
                            filterable
                            :left-default-checked="[1]"
                            :right-default-checked="[1]"
                            :titles="['未拥有权限', '已拥有权限']"
                            :button-texts="['到左边', '到右边']"
                            :format="{
                                noChecked: '${total}',
                                hasChecked: '${checked}/${total}'
                              }"
                            @change="handleChange"
                            :data="data">
                    </el-transfer>
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
        name: "systemRole",
        data() {
            return {
                dutyOptions: [ {
                    value: '1',
                    label: '党委组织'
                }, {
                    value: '2',
                    label: '警员'
                } ],
                //穿梭框数据
                data:
                    [],
                //穿梭狂数据ID
                dataId:
                    [],
                //当前行id
                id:
                    "",
                form:
                    {
                        name: '',
                        describe:
                            "",
                        jurisdiction:
                            [],
                        duty:
                            ''
                    }
                ,
                //modul名字
                title: '',
                //控制显示
                dialogVisible:
                    false,
                //序号
                num:
                    1,
                //表格数据
                tableData:
                    []
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
            handleChange( value, direction, movedKeys ) {
                console.log( value, direction, movedKeys );
            },
            //提交新增表单
            submitForm( formName ) {
                this.$refs[ formName ].validate( ( valid ) => {
                    if ( valid ) {
                        let jurisdiction = this.form.jurisdiction.join( "," );
                        let data = {
                            permIds: jurisdiction,
                            roleName: this.form.name,
                            code: "1",
                            duty: this.form.duty,
                            descpt: this.form.describe,

                        };
                        if ( this.title == "新增系统角色" ) {
                            this.$axios( {
                                method: 'post',
                                url: '/auth/addRole',
                                data: this.$Qs.stringify( data )
                            } ).then( () => {
                                this.form.name = '';
                                this.form.describe = '';
                                this.form.jurisdiction = [];
                                this.form.duty = '';
                                this.data = [];
                                this.getData();
                                this.dialogVisible = false
                            } )
                        }
                        if ( this.title == "编辑系统角色" ) {
                            data.id = this.id;
                            this.$axios( {
                                method: 'post',
                                url: '/auth/setRole',
                                data: this.$Qs.stringify( data )
                            } ).then( () => {
                                this.form.name = '';
                                this.form.describe = '';
                                this.form.jurisdiction = [];
                                this.form.duty = '';
                                this.data = [];
                                this.getData();
                                this.dialogVisible = false
                            } )
                        }
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
                this.form.jurisdiction = [];
                this.form.duty = '';
                this.dialogVisible = false;
                this.$refs.form.resetFields();
            },
            //新增
            create() {
                this.title = '新增系统角色';
                this.dialogVisible = true;
            },

            //获取数据
            getData() {
                this.$axios( {
                    method: 'get',
                    url: '/auth/getRoleList',

                } ).then( ( res ) => {
                    this.tableData = res.data;
                } );
                this.$axios( {
                    method: 'get',
                    url: '/auth/findPerms',

                } ).then( ( res ) => {
                    for ( let i in res.data ) {
                        this.data.push( {
                            key: res.data[ i ].id,
                            label: res.data[ i ].name,
                        } );
                    }
                } )
            },
            getIndex( $index ) {
                //表格序号
                return ( this.num - 1 ) * this.num + $index + 1
            },
            //编辑表格行
            handleClick( row ) {
                console.log( row )
                this.id = row.id;
                this.$axios( {
                    method: 'get',
                    url: '/auth/getAuthByRole/' + this.id,

                } ).then( ( res ) => {
                    // for ( let i in res.data.data.allAuth ) {
                    //         this.data.push( {
                    //             key: res.data.data.allAuth[ i ].id,
                    //             label: res.data.data.allAuth[ i ].name,
                    //         } );
                    // }
                    for ( let s in res.data.data.hasAuth ) {

                        this.form.jurisdiction.push( res.data.data.hasAuth[ s ].id );
                    }

                    console.log( this.form.jurisdiction )
                } );
                this.form.name = row.roleName;
                this.form.describe = row.descpt;
                // this.form.jurisdiction = row.;
                this.form.duty = row.duty;
                this.title = '编辑系统角色';
                this.dialogVisible = true;

            },
            //删除表格行
            handleDelete( row ) {
                let data = {
                    id: row.id
                };
                this.$axios( {
                    method: 'post',
                    url: '/auth/delRole',
                    data: this.$Qs.stringify( data )
                } ).then( () => {
                    this.data = [];
                    this.getData()
                } )
            },
            handleClose( done ) {
                this.$confirm( '确认关闭？' )
                    .then( () => {
                        this.form.name = '';
                        this.form.describe = '';
                        this.form.jurisdiction = [];
                        this.form.duty = '';
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

    .el-dialog.dialog {
        height: 100%;
        width: 100%;
        overflow: inherit;
    }

    .el-dialog__wrapper {
        background-color: rgba(0, 0, 0, 0);
    }

</style>
