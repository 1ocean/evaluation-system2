<template>
    <div id="app" v-cloak>
        <router-view></router-view>
    </div>
</template>

<script>

    export default {
      name: 'app',
      data() {
        return {}
      },
      mounted() {
        window.addEventListener( 'unload', this.saveState );
        // window.addEventListener( 'hashchange', () => {
        //   var currentPath = window.location.hash.slice( 1 ); // 获取输入的路由
        //   if ( this.$router.path !== currentPath ) {
        //     this.$router.push( "/" ); // 动态跳转
        //   }
        // }, false );
        //

      },
      components: {},
      methods: {
        saveState() {
          sessionStorage.setItem( 'state', JSON.stringify( this.$store.state ) )

        }
      }
    }
</script>
<style>
    i {
        cursor: pointer;
    }

    .firstText {
        width: 100%;
        font-size: 30px;
        font-weight: bolder;
        margin-bottom: 3%;
        display: flex;
        justify-content: space-between;
    }

    .el-collapse-item__header {
        font-size: 20px;
        font-weight: bolder;
    }

    .el-col {
        text-align: center;
    }

    .el-icon-circle-plus-outline {
        font-size: 30px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .width {
        width: 220px;
    }
</style>
