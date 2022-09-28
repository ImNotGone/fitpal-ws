import Vue from 'vue'
import Router from 'vue-router'
import FPHome from './views/FPHome.vue'
import MyRoutines from './views/MyRoutines.vue'
import ExpRoutines from './views/ExpRoutines.vue'
import FPTrainers from './views/FPTrainers.vue'
import FPSettings from './views/FPSettings.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: FPHome
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
            component: FPTrainers
        },
        {
            path: '/settings',
            name: 'settings',
            component: FPSettings
        }
    ]
})
