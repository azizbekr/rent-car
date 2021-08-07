import Vue from 'vue'
import VueRouter from "vue-router";
import Cookie from 'js-cookie'
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: "/",
            name: "Main",
            meta: {auth: true},
            component: ()=> import('../src/components/Main'),
        },
        {
            path: "/sale",
            name: "SaleCar",
            meta: {auth: true},
            component: ()=> import('../src/components/SaleCar'),
        },
        {
            path: "/buy",
            name: "BuyCar",
            meta: {auth: true},
            component: ()=> import('../src/components/BuyCar'),
        },
        {
            path: "/stats",
            name: "Statistics",
            meta: {auth: true},
            component: ()=> import('../src/components/Statistics'),
        },
        {
            path: "/login",
            name: "Login",
            component: ()=> import('../src/components/Login'),
        },
    ]
})

router.beforeEach((to, from, next) => {
    const bra = Cookie.get('bra')
    const requireAuth = to.matched.some(record=>record.meta.auth)

    if(requireAuth && !bra){
        next('/login')
    }else{
        next()
    }
})

export default router