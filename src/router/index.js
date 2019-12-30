import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use( VueRouter )

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('../views/login.vue'),
    },
    {
        path: '/systemSet',
        name: 'systemSet',
        component: () => import('../views/systemSet.vue'),
        children:[
            {
                path: '/systemUser',
                component: () => import('../views/system/systemUser')
            },
            {
                path: '/systemRole',
                component: () => import('../views/system/systemRole')
            },
            {
                path: '/systemOrganization',
                component: () => import('../views/system/systemOrganization')
            },
            {
                path: '/systemJurisdiction',
                component: () => import('../views/system/systemJurisdiction')
            },
        ]
    },
    {
        path: '/home',
        name: 'home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/home.vue'),
        children: [

            {
                path: '/checkObject',
                component: () => import('../views/check/checkObject')
            },
            {
                path: '/checkPrepare',
                name:'checkPrepare',
                component: () => import('../views/check/checkPrepare')
            },
            {
                path: '/checkPreliminary',
                name:'checkPreliminary',
                component: () => import('../views/check/checkPreliminary')
            },
            {
                path: '/checkQuery',
                name:'checkQuery',
                component: () => import('../views/check/checkQuery')
            },
            {
                path: '/checkHomePage',
                name:'checkHomePage',
                component: () => import('../views/check/checkHomePage')
            },
            {
                path: '/zongheAssess',
                name:'zongheAssess',
                component: () => import('../views/assess/zongheAssess')
            },
            {
                path: '/assessResult',
                name:'assessResult',
                component: () => import('../views/assess/assessResult')
            }


        ]
    },

];

const router = new VueRouter( {
    routes

} );
router.beforeEach( ( to, from, next ) => {
    // console.log(to)
    // console.log(from)
    // if(to.name==undefined){
    //   return next({path: "/"});
    // }
    next();
} );
export default router
