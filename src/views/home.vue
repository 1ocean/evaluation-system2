<template>
    <div id="app" v-cloak>
        <el-container>
            <!--    <el-aside width="200px">-->
            <el-menu :default-openeds="openeds"
                     class="el-menu-vertical-demo"
                     @open="handleOpen" @close="handleClose"
                     @select="handleSelect"
                     :collapse="isCollapse"
                     router
                     :default-active="$route.path"
                     :collapse-transition="true"
                     background-color="rgb(0,21,42)"
                     text-color="#fff"
                     active-text-color="#9ACD32"
            >
                <h5>
                    <img src="../assets/conf.png" height="50" width="40"/>
                    <span style="font-size: 20px;font-weight: bolder" v-if="this.isCollapse==false">{{name}}</span>
                </h5>

                <el-menu-item v-for="(item,index) in menuList" :key="index" :index="item.page">
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{ item.name }}</span>
                </el-menu-item>


            </el-menu>
            <!--    </el-aside>-->
            <el-container>
                <el-header>
                    <div style="display: flex;justify-content: space-between">
                        <div>
                            <i v-if="this.isCollapse==true" class="el-icon-s-unfold" @click="change"></i>
                            <i v-else="" class="el-icon-s-fold" @click="change"></i>
                            欢迎，{{ $store.state.roleName }}使用系统！
                        </div>
                        <div style="font-size: 30px;width: 200px;display: flex;align-items: center">
                            <el-tooltip style="flex: 1" class="item" effect="dark" content="修改密码" placement="top-start">
                                <i @click="changePassword" class="el-icon-unlock"></i>
                            </el-tooltip>
                            <el-tooltip style="flex: 1" class="item" effect="dark" content="设置" placement="top-start">
                                <i @click="set" class="el-icon-setting"></i>
                            </el-tooltip>
                            <el-tooltip style="flex: 1" class="item" effect="dark" content="登出" placement="top-start">
                                <el-popconfirm
                                        @onConfirm="out"
                                        confirmButtonText='确定'
                                        cancelButtonText='不用了'
                                        icon="el-icon-info"
                                        iconColor="red"
                                        title="确定要登出吗？"
                                >
                                    <i slot="reference" class="el-icon-switch-button"></i>
                                </el-popconfirm>
                            </el-tooltip>

                        </div>
                    </div>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>

        <el-dialog
                :title="title"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <el-form :model="form" ref="form" label-width="120px" class="demo-ruleForm">
                <el-form-item
                        label="修改登录密码"
                        prop="password"
                        :rules="[
                      { required: true, message: '登录密码不能为空'},
                    ]"
                >
                    <el-input type="text" v-model="form.password" autocomplete="off"></el-input>
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
        name: 'home',
        data() {
            return {
                roleName: '',
                menuList: [],
                form: {
                    password: ''
                },
                title: '修改密码',
                dialogVisible: false,
                openeds: [ "1" ],
                name: '武警二支队干部考评系统',
                noImgName: '',
                isCollapse: false,
            }
        },
        mounted() {
        },
        created() {
            this.getUserData()

        },
        methods: {
            //获取用户权限
            getUserData() {
                this.$axios( {
                    method: 'get',
                    url: 'user/getCurrUser',
                } ).then( ( res ) => {
                    let array=res.data.obj.permList;
                    let a=[];
                    let b=[];
                    let c=[];
                    let d=[];
                    let e=[];
                    let f=[];
                    for (let i in array){
                        if (array[i].name==='考评首页'){
                             a=array.splice(i,1);
                            this.menuList.push(a[0]);
                        }
                    }
                    for (let s in array){
                        if (array[s].name==='考评对象'){
                            b=array.splice(s,1);
                            this.menuList.push(b[0]);
                        }
                    }

                    for (let g in array){
                        if (array[g].name==='考评准备'){
                            c=array.splice(g,1);
                            this.menuList.push(c[0]);
                        }
                    }

                    for (let q in array){
                        if (array[q].name==='考评预审'){
                            d=array.splice(q,1);
                            this.menuList.push(d[0]);
                        }
                    }

                    for (let z in array){
                        if (array[z].name==='综合考评'){
                            e=array.splice(z,1);
                            this.menuList.push(e[0]);
                        }
                    }

                    for (let x in array){
                        if (array[x].name==='评定结果'){
                            f=array.splice(x,1)
                            this.menuList.push(f[0]);

                        }
                    }
                    this.$store.state.role = res.data.obj.roleList[ 0 ].roleName;
                    this.$store.state.currUserId = res.data.obj.currUser.id;
                    this.$store.state.roleName = res.data.obj.currUser.realName;
                    this.$store.state.orgName = res.data.obj.organization.orgName;
                } )
            },
            //去设置页面
            set() {
                if (this.$store.state.role==='超级管理员' ){
                    this.$router.push( '/systemUser' )

                }else {
                    this.$message.error('很抱歉，您没有足够得权限')
                }
            },
            //登出
            out() {
                // this.$Cookies.set( 'userPassword', '' );
                // this.$Cookies.set( 'userName', '' );
                this.$router.push( "/" )
            },
            //修改密码
            changePassword() {
                this.dialogVisible = true;
            },
            resetForm() {
                this.form.password = '';
                this.dialogVisible = false;
            },
            //提交新增表单
            submitForm( formName ) {
                this.$refs[ formName ].validate( ( valid ) => {
                    if ( valid ) {
                        let data = {
                            password: this.form.password,
                        };
                        this.$axios( {
                            method: 'post',
                            url: '/user/updatePwd',
                            data: this.$Qs.stringify( data )
                        } ).then( () => {
                            this.dialogVisible = false
                        } )
                    } else {
                        console.log( 'error submit!!' );
                        return false;
                    }
                } );
            },
            change() {
                if ( this.isCollapse === true ) {

                    this.name = '武警二支队干部考评系统';

                    this.isCollapse = !this.isCollapse;


                } else if ( this.isCollapse === false ) {

                    this.name = '';

                    this.isCollapse = !this.isCollapse;


                }
                // console.log( this.isCollapse )
            },
            handleOpen() {
                // console.log( );
            },
            handleClose() {
                this.dialogVisible=false
            },
            handleSelect() {
                // console.log(key, keyPath);
            }
        },
        components: {}
    }
</script>

<style>
    [v-cloak] {
        display: none;
    }

    #app {
        width: 100%;
        height: 100%;
    }

    html, body {
        background-color: rgb(242, 242, 242);
        width: 100%;
        height: 100%;
        margin: 0;
    }

    i {
        cursor: pointer;
    }

    .el-header, .el-footer {
        background-color: rgb(242, 242, 242);
        color: #333;
        text-align: left;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
        text-align: center;

    }

    .el-main {
        background-color: white;
    }

    .el-container {
        height: 100%;
    }

    h5 {
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: white;
        font-size: 1em;
        line-height: 100px;
        margin-top: 0;
        margin-bottom: 0;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        min-width: 280px;
        min-height: 400px;
    }

    .el-menu-item.is-active {
        background-color: #009966;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .width {
        width: 220px;
    }

    .displayFlex{
        display: flex;
        justify-content: space-around;

    }
</style>
