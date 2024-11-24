import {createRouter, createWebHashHistory} from 'vue-router';



const router = createRouter({
    //设置路由的模式
    history:createWebHashHistory(),
    routes: [{
        path: '/',
        redirect: '/login',
    },{
        path: '/login',
        component: () => import('../views/Login.vue'),
        meta: {title: '用户登录', showHeader: false}
    },{
        path: '/register',
        component: () => import('../views/Register.vue'),
        meta: {title: '用户注册', showHeader: false}
    },{
        path: '/main',
        component: () => import('../views/Main.vue'),
        meta: {title: '系统首页', showHeader: true}
    },{
        path:'/paperDetail/:paperId',
        component: () => import('../views/PaperDetail.vue'),
        meta: {title: '论文详情', showHeader: true}
    }]
})




export {router}