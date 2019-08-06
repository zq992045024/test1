import Vue from "vue";

import VueRouter from "vue-router"

import Home from "../pages/home/home.vue"
import Order from "../pages/order/order.vue"
import List from "../pages/list/list.vue"
import Mine from "../pages/mine/mine.vue"
import Detail from "../pages/detail/detail.vue"
import homeOne from "../pages/home/homeOne.vue"
import homeTwo from "../pages/home/homeTwo.vue"
import Login from "../pages/login/login.vue"
import OrderDetail from "../pages/orderDetail/od.vue"
import { resolve } from "_uri-js@4.2.2@uri-js";
Vue.use(VueRouter)
const router =  new VueRouter({
    routes: [
        {
            path:'/',
            redirect:"/home"
        },
        {
            path: "/home",
            name: 'home',
            component: resolve => require(["../pages/home/home.vue"],resolve),
            children: [
                {
                    path: "homeOne",
                    component: homeOne
                },
                {
                    path: "homeTwo",
                    component: homeTwo
                },
            ],
            meta: {
                title: "首页",
                flag: true,
                auth: false
            }
        },
        {
            path: "/list",
            component: resolve => require(["../pages/list/list.vue"],resolve),
            meta: {
                title: "列表",
                flag: true,
                auth: false
            }
        },
        {
            path: "/order",
            component: Order,
            meta: {
                title: "订单",
                flag: true,
                auth: false
            },
            children:[
                {
                    path:"od/:id/:name",
                    name:'orderD',
                    component:OrderDetail
                }
            ]
        },
        {
            path: "/mine",
            component: ()=>import("../pages/mine/mine.vue"),
            meta: {
                title: "我的",
                flag: true,
                auth: true
            }
        }
        ,
        {
            path: "/detail",
            name: 'detail',
            component: Detail,
            props: true,
            meta: {
                title: "详情",
                flag: false,
                auth: true
            }
        },
        {
            path:"/login",
            name:'login',
            component:Login,
            meta:{
                title:'登录',
                flag:false
            }
        }
    ]
})

router.beforeEach((to,from,next)=>{
    if(to.path !="login" && to.meta.auth ){
        if(sessionStorage.getItem("token")){
            next();
        }else{
            next('/login')
        }
    }else{
        next()
    }
})



export default router;