import { defineStore } from "pinia";


export const useRoutinesStore = defineStore('routinesStore', {
    state: () => ({
        /*
        ** @type {{id: number, name: string, img: string, desc: string, duration: number, tags: string[] ,fav: boolean}[]}
        */
        myRoutines: [{
                id: 1,
                name:'Morning Routine',
                img: 'https://health.clevelandclinic.org/wp-content/uploads/sites/3/2022/04/exerciseHowOften-944015592-770x533-1-650x428.jpg',
                desc: 'This is my morning routine',
                duration: 30,
                tags: ['Morning', 'Cardio', 'Routine'],
                fav: false
        },
        {
            id: 2,
            name: "Evening Routine",
            desc: "This is my evening routine",
            duration: 30,
            tags: ["Evening", "Routine", "Cardio"]
        },
        {
            id: 3,
            name: "Morning Routine",
            desc: "This is my morning routine",
            duration: 30,
            tags: ["Morning", "Routine", "Cardio"]
        },],
        publicRoutines: []
    }),

    getters: {
        getMyRoutines() {
            return this.myRoutines;
        },
        getPublicRoutines() {
            return this.publicRoutines;
        }
    },
    actions:{
        init() {
            // GET USER ROUTINES

            // GET PUBLIC ROUTINES
        },
    }
})
