import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/Dashboard'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            name: 'dash',
            path: '/',
            component: Dashboard
        }
    ]
})
