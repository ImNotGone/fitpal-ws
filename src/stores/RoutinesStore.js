import { defineStore } from "pinia";


export const useRoutinesStore = defineStore('routinesStore', {
    state: () => ({
        /*
    ** @type {{id: number, name: string, img: string, desc: string, duration: number, tags: string[] ,fav: boolean}[]}
        */
        routines: [
            {
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
      },
      {
        id: 4,
        name: "Evening Routine",
        desc: "This is my evening routine",
        duration: 30,
        tags: ["Evening", "Routine", "Cardio"]
      },
      {
        id: 5,
        name: "Morning Routine",
        desc: "This is my morning routine",
        duration: 30,
        tags: ["Morning", "Routine", "Cardio"]
      },
      {
        id: 6,
        name: "Evening Routine",
        desc: "This is my evening routine",
        duration: 30,
        tags: ["Evening", "Routine", "Cardio"]
      },
      {
        id: 7,
        name: "Morning Routine",
        desc: "This is my morning routine",
        duration: 30,
        tags: ["Morning", "Routine", "Cardio"]
      },
      {
        id: 8,
        name: "Evening Routine",
        desc: "This is my evening routine",
        duration: 30,
        tags: ["Evening", "Routine", "Cardio"]
      },
    ]}),

    getters: {

    },
    actions:{

    }
})
