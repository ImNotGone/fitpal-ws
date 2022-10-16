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
            return state.myRoutines.some(r => r.id === id);
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
        getRoutine: (state) => (id) => state.myRoutines.find(r => r.id === id),
        getRoutineName: (state) => (id) => state.myRoutines.find(r => r.id === id)?.name,
        getRoutineDetail: (state) => (id) => state.myRoutines.find(r => r.id === id)?.detail,
        getRoutineMetadata: (state) => (id) => state.myRoutines.find(r => r.id === id)?.metadata,
        getRoutineImage: (state) => (id) => state.myRoutines.find(r => r.id === id)?.image.url,
        getRoutineImageId: (state) => (id) => state.myRoutines.find(r => r.id === id)?.image.id,
    },
    actions: {
        init() {
            this.retrieveMyRoutines().then(r => console.log(r));
            this.retrievePublicRoutines().then(r => console.log(r));
        },
        async retrieveMyRoutines() {
            this.myRoutines = await UserApi.getUserRoutines();
        },
        async retrievePublicRoutines() {
            this.publicRoutines = await RoutineApi.getRoutines();
            console.log(this.publicRoutines)
        },
        async addRoutine(routineData) {
            let resp = await RoutineApi.addRoutine(routineData);
            this.myRoutines.push(routineData);
            if(routineData.isPublic) {
                this.publicRoutines.push(routineData);
            }
            return resp;
        },
    }
})
