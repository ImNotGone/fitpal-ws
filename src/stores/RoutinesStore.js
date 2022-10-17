import { GetRoutines, RoutineApi } from "@/api/routines";
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
        },
        containsRoutineWithId: (state) => (id) => {
            return state.myRoutines.content.some(r => r.id === id);
        },
        getRoutinesId: (state) => {
            if(!state.myRoutines.content) {
                return;
            }
            // Return an array of the routines id
            let routinesId = [];
            state.myRoutines.content.forEach(r => {
                routinesId.push(r.id);
            });
            return routinesId;
        },
        getRoutine: (state) => (id) => state.myRoutines.content.find(r => r.id.toString() === id.toString()),
    },
    actions: {
        async init() {
            await this.retrieveMyRoutines();
            await this.retrievePublicRoutines();
        },
        async retrieveMyRoutines(getRoutines = new GetRoutines()) {
            this.myRoutines = await UserApi.getUserRoutines(getRoutines);
        },
        async retrievePublicRoutines(getRoutines = new GetRoutines()) {
            this.publicRoutines = await RoutineApi.getRoutines(getRoutines);
        },
        async addRoutine(routineData) {
            return await RoutineApi.addRoutine(routineData);
        },
        async editRoutine(routineId, routineData) {
            return await RoutineApi.modifyRoutine(routineId, routineData);
        },
    }
})
