import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MyRoutines from './views/MyRoutines.vue'
import ExpRoutines from './views/ExpRoutines.vue'
import Trainers from './views/Trainers.vue'
import Settings from './views/Settings.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/my-routines',
            name: 'my-routines',
            component: MyRoutines
        },
        {
            path: '/exp-routines',
            name: 'exp-routines',
            component: ExpRoutines
        },
        {
            path: '/trainers',
            name: 'trainers',
            component: Trainers
        },
        {
            path: '/settings',
            name: 'settings',
            component: Settings
        }
    ]
})
