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
        getRoutineName: (state) => (id) => state.myRoutines.content.find(r => r.id === id)?.name,
        getRoutineDetail: (state) => (id) => state.myRoutines.content.find(r => r.id === id)?.detail,
        getRoutineMetadata: (state) => (id) => state.myRoutines.content.find(r => r.id === id)?.metadata,
        getRoutineImage: (state) => (id) => state.myRoutines.content.find(r => r.id === id)?.image.url,
        getRoutineImageId: (state) => (id) => state.myRoutines.content.find(r => r.id === id)?.image.id,
    },
    actions: {
        async init() {
            await this.retrieveMyRoutines();
            await this.retrievePublicRoutines();
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
        async editRoutine(routineId, routineData) {
            return await RoutineApi.modifyRoutine(routineId, routineData);
        },
        async deleteRoutine(routineId) {
            await RoutineApi.deleteAllSections(routineId);
            return await RoutineApi.deleteRoutine(routineId);
        }
    }
})
