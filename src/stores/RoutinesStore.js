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
                img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZXhlcmNpc2V8ZW58MHx8MHx8&w=1000&q=80',
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
    ]})
})
