import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Member from './components/member.vue'


let routes =[{
    path:'/',
    component: Member
}]

let router = new Router({
    routes
})

new Vue({
    el:"#app",
    router
})