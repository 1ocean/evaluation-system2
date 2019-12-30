import Vue from 'vue'
import Vuex from 'vuex'

Vue.use( Vuex )


var state = sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
    //所有得组织机构数据(考评对象界面)
    organizationOptions: [],
    //时间条件数据(考评对象界面)
    timeConditionsOptions: [],
    //权限
    role: '',
    //用户名
    roleName:'',
    //当前用户ID
    currUserId:'',
    activeIndex:'0',
    //当前用户组织
    orgName:'',
    baseUrl : ''
};

export default new Vuex.Store( {
    state: state,
    mutations: {},
    actions: {},
    modules: {}
} )
