import { createRouter,createWebHistory } from "vue-router";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/home',
            component: () => import('@/pages/home/index.vue'),
            meta:{
                title: '首页'
            }
        },
        {
            path: '/hospital',
            component: () => import('@/pages/hospital/index.vue'),
            children: [
                {
                    path: 'bookingRegister',
                    component: () => import("@/pages/hospital/bookingRegister/index.vue"),
                    meta:{
                        title: '预约挂号'
                    }
                },
                {
                    path: 'register_step_1',
                    component: () => import("@/pages/hospital/bookingRegister/register_step_1.vue"),
                    meta:{
                        title: '预约第一步'
                    }
                },
                {
                    path: 'register_step_2',
                    component: () => import("@/pages/hospital/bookingRegister/register_step_2.vue"),
                    meta:{
                        title: '预约第二步'
                    }
                },
                {
                    path: 'hospitalDetails',
                    component: () => import("@/pages/hospital/hospitalDetails/index.vue"),
                    meta:{
                        title: '医院详情'
                    }
                },
                {
                    path: 'bookingInstructions',
                    component: () => import("@/pages/hospital/bookingInstructions/index.vue"),
                    meta:{
                        title: '预约通知'
                    }
                },
                {
                    path: 'suspensionInformation',
                    component: () => import("@/pages/hospital/suspensionInformation/index.vue"),
                    meta:{
                        title: '停诊信息'
                    }
                },
                {
                    path: 'queryOrCancel',
                    component: () => import("@/pages/hospital/queryOrCancel/index.vue"),
                    meta:{
                        title: '查询/取消'
                    }
                },
                {
                    path: '',
                    redirect: '/hospital/bookingRegister'
                }
            ]
        },
        {
            path: '/user',
            component: () => import('@/pages/user/index.vue'),
            children: [
                {
                    path: 'certification',
                    component: () => import("@/pages/user/certification/index.vue"),
                    meta:{
                        title: '实名认证'
                    }
                },
                {
                    path: 'order',
                    component: () => import("@/pages/user/order/index.vue"),
                    meta:{
                        title: '挂号订单'
                    }
                },
                {
                    path: 'patient',
                    component: () => import("@/pages/user/patient/index.vue"),
                    meta:{
                        title: '就诊人管理'
                    }
                },
                {
                    path: 'profile',
                    component: () => import("@/pages/user/profile/index.vue"),
                    meta:{
                        title: '账号信息'
                    }
                },
                {
                    path: 'feedback',
                    component: () => import("@/pages/user/feedback/index.vue"),
                    meta:{
                        title: '信息反馈'
                    }
                }
            ]
        },
        {
            path: '/',
            redirect: '/home'
        }
    ],
    scrollBehavior(){
        return {
            left: 0,
            top: 0
        }
    }
});
