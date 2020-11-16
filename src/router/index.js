import VueRouter from "vue-router";
import Vue from 'vue'

import QueryRoutes from './query'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [QueryRoutes]
})