<template>
    <div id="app" v-cloak>
        <div class="top">
            <img src="../assets/top.png" height="100%" width="100%"/></div>
        <div class="bottom">

        </div>
        <div class="center">
            <div>
                <img src="../assets/logo.png" height="25%" width="65%"/>
                <el-card class="box-card" body-style="width:100%">
                    <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="0px" class="demo-ruleForm">
                        <el-form-item
                                label=""
                                prop="name"
                                :rules="[
              { required: true, message: '用户名不能为空'},
            ]"
                        >
                            <el-input type="text" placeholder="请输入用户名" v-model.number="numberValidateForm.name" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item
                                label=""
                                prop="password"
                                :rules="[
              { required: true, message: '密码不能为空'},
            ]"
                        >
                            <el-input type="password" placeholder="请输入密码" v-model.number="numberValidateForm.password" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item class="remind">
                            <el-checkbox v-model="numberValidateForm.checked">记住密码</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="submit" type="warning" @click="submitForm('numberValidateForm')">登录系统</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </div>

        </div>

    </div>
</template>

<script>

    export default {
        name: 'login',
        data() {
            return{
                numberValidateForm: {
                    name: '',
                    password: '',
                    checked: true
                }
            }

        },
        components: {
        },
        created(){

        },
        mounted() {
            this.getCookie();
        },
        methods: {
            getCookie() {

                if ( document.cookie.length > 0 ) {
                    let arr = document.cookie.split( '; ' ); // 这里显示的格式需要切割一下自己可输出看下
                    console.log(arr)
                    for ( let i = 0; i < arr.length; i++ ) {
                        let arr2 = arr[ i ].split( '=' ); // 再次切割
                        // 判断查找相对应的值
                        if ( arr2[ 0 ] == 'userName' ) {
                            let a=arr2[1].substr(3);
                            let b=a.substring(0,a.length-3);
                            this.numberValidateForm.name = b; // 保存到保存数据的地方
                        } else if ( arr2[ 0 ] == 'userPassword' ) {
                            if(arr2[ 1 ].substr(0,3) == "%22"){
                                let c=arr2[ 1 ].substr(3);
                                let d=c.substring(0,c.length-3);
                                this.numberValidateForm.password =d;
                            }else {
                                this.numberValidateForm.password =arr2[ 1 ];
                            }
                        }
                    }
                } else {
                    this.numberValidateForm.checked=false
                }

            },
            submitForm( formName ) {
                this.$refs[ formName ].validate( ( valid ) => {
                    if ( valid ) {
                        let data = {
                            username: this.numberValidateForm.name,
                            password: this.numberValidateForm.password,
                        };

                        let isChecked = this.numberValidateForm.checked;

                        if ( isChecked ) {
                            data.rememberMe = 'on';
                        }

                        this.$axios( {
                            method: 'post',
                            url:'/user/login',
                            data: this.$Qs.stringify( data )
                        } ).then( ( res ) => {

                            // eslint-disable-next-line no-debugger
                            if ( res.data.code === "1001" ) {
                                return this.$message.error( res.data.message )
                            }else if(res.data.code==="1000"){
                                if ( isChecked ) { // 记住密码
                                    this.$Cookies.set( 'userName', this.numberValidateForm.name, { expires: 30 } );
                                    this.$Cookies.set( 'userPassword', this.numberValidateForm.password, { expires: 30 } );
                                    this.$router.push({
                                        path:'/checkHomePage'
                                    })

                                } else {
                                    this.clearCookie(); // 清空 Cookie
                                    this.$router.push({
                                        path:'/checkHomePage'
                                    })
                                }
                            }
                        } )
                    } else {
                        console.log( 'error submit!!' );
                        return false;
                    }
                } );
            },
            // 清除Cookie
            clearCookie() {
                this.$Cookies.remove('userName');
                this.$Cookies.remove('userPassword')
            },

        }
    }
</script>
<style scoped>
    [v-cloak] {
        display: none;
    }

    #app {
        width: 100%;
        height: 100%;
    }

    html, body {

        width: 100%;
        height: 100%;
        margin: 0;
    }

    i {
        cursor: pointer;
    }

    .main {
        /* top: 50%;*/
        /* left: 50%;*/
        width: 900px;
        height: 50%;
        background-color: white;
        border-radius: 5px;
        display: flex;
        align-items: center;
        padding: 1.5%;
        box-sizing: border-box;
    }

    .left {
        box-sizing: border-box;
        width: 65%;
        height: 100%;
        padding-right: 2%;
        /*display: inline-block;*/
    }

    .right {
        /*display: inline-block;*/
    }

    .right > p {
        text-align: left;
        font-size: 1.6em;
        font-weight: bolder;
    }

    .top {
        height: 50%;
        width: 100%;
    }

    .bottom {
        height: 50%;
        width: 100%;
        background: rgba(240, 242, 245, 1);
    }

    .center {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        box-sizing: border-box;
    }

    .center > div {
        width: 40%;
        height: 80%;
        text-align: center;
        box-sizing: border-box;
    }

    .center > div > img {
        margin-bottom: 5%;
    }

    .box-card {
        box-sizing: border-box;
        height: 60%;
        padding: 2% 5%;
        display: flex;
        align-items: center;
    }
    .el-form-item {
        height: 5vh;
    }

    .remind {
        text-align: left;
        color: #1F4526;
        font-size: 20px;
    }

    .el-input__inner {
        height: 5vh;
        line-height: 5vh;
        border-radius: 10px;
    }

    .submit {
        width: 80%;
        border-radius: 50px;
        height: 7vh;
        font-size: 24px;
    }
</style>
