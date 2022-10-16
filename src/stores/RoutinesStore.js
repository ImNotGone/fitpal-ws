import { RoutineApi } from "@/api/routines";
import { UserApi } from "@/api/user";
import { defineStore } from "pinia";


export const useRoutinesStore = defineStore('routinesStore', {
    state: () => ({
        myRoutines: {},
        publicRoutines: {}
    }),

    getters: {
        getMyRoutines() {
            return this.myRoutines;
        },
        getPublicRoutines() {
            return this.publicRoutines;
        }
    },
    actions: {
        init() {
            // GET USER ROUTINES

            // GET PUBLIC ROUTINES
        },
        async retrieveMyRoutines() {
            this.myRoutines = await UserApi.getUserRoutines();
        },
        async retrievePublicRoutines() {
            this.publicRoutines = await RoutineApi.getRoutines();
        },
        async addRoutine(routineData) {
            return await RoutineApi.addRoutine(routineData);
        },
    }
})
