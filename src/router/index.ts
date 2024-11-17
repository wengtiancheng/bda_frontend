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

// router.beforeEach((to, _, next) => {
//     const token: string | null = sessionStorage.getItem('token')
//
//
//     if(!token) {
//         if(to.path === '/login' || to.path === '/register') {
//             next()
//         } else {
//             next('/login')
//         }
//         return
//
//     }
//     next()
// })


export {router}