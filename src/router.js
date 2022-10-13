import Vue from 'vue'
import Router from 'vue-router'
import MyRoutines from './views/MyRoutines.vue'
import ExpRoutines from './views/ExpRoutines.vue'
import FPProfile from './views/FPProfile.vue'
import FPLandingPage from '@/views/FPLandingPage.vue';
import FPSignUp from '@/views/FPSignUp.vue';
import FPLogin from '@/views/FPLogin.vue';
import FP404 from '@/views/FP404.vue';
import FPDetailedExercise from "@/views/FPDetailedExercise";
import FPDetailedRoutine from "@/views/FPDetailedRoutine";
import FPExerciseInRoutine from "@/views/FPExerciseInRoutine";
import FPCreateExercise from "@/views/FPCreateExercise";
import FPCreateRoutine from "@/views/FPCreateRoutine";
import FPVerify from "@/views/FPVerify";
import FPEditRoutine from "@/views/FPEditRoutine";
import FPEditExercise from "@/views/FPEditExercise";
import FPMyExercises from "@/views/FPMyExercises";

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/landing-page',
            name: 'landing-page',
            component: FPLandingPage,
            meta: {
                hideNavbar: true,
            }
        },
        {
            path: '/signup',
            name: 'signup',
            component: FPSignUp,
            meta: {
                hideNavbar: true,
            }
        },
        {
            path: '/verify',
            name: 'verify',
            component: FPVerify,
            meta: {
                hideNavbar: true,
            }
        },
        {
            path: '/login',
            name: 'login',
            component: FPLogin,
            meta: {
                hideNavbar: true,
            }
        },
        {
            path: '/my-routines',
            name: 'my-routines',
            component: MyRoutines
        },
        {
            path: '/my-exercises',
            name: 'my-exercises',
            component: FPMyExercises
        },
        {
            path: '/exp-routines',
            name: 'exp-routines',
            component: ExpRoutines
        },
        {
            path: '/profile',
            name: 'Profile',
            component: FPProfile
        },
        {
            path: '/detailed-exercise',
            name: 'detailed-exercise',
            component: FPDetailedExercise
        },
        {
            path: '/routine',
            name: 'detailed-routine',
            component: FPDetailedRoutine
        },
        {
            path: '/routine/exercise',
            name: 'exercise-in-routine',
            component: FPExerciseInRoutine
        },
        {
            path: '/edit-routine',
            name: 'edit-routine',
            component: FPEditRoutine
        },
        {
            path: '/edit-exercise',
            name: 'edit-exercise',
            component: FPEditExercise
        },
        {
            path: '/create-exercise',
            name: 'create-exercise',
            component: FPCreateExercise
        },
        {
            path: '/create-routine',
            name: 'create-routine',
            component: FPCreateRoutine
        },
        {
            path: '/*',
            name: '404',
            component: FP404,
            meta: {
                hideNavbar: true,
            }
        },

    ]
})
