import {defineStore} from "pinia";

export const useExerciseStore = defineStore('exerciseStore',{
    state:()=>({
        exercises:[
            {title: 'Exercise Title 1', route:'/detailed-exercise'},
            {title: 'Exercise Title 2', route:'/detailed-exercise'},
            {title: 'Exercise Title 3', route:'/detailed-exercise'}
        ]
    }),
    getters:{
        getExercises: (state) => state.exercises,
    },

    actions:{

    }

})