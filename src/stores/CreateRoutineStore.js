import {defineStore} from "pinia";

export const useCreateRoutineStore = defineStore('createRoutineStore',{
    state:() =>({
        routineName: '',
        desc: '',
        image: "",
        warmup:{
            series:'',
            rest:'',
            exercises:[]
        },
        sections: [
            {title:'Section 1',
                series:'',
                rest:'',
                exercises:[]
            }
        ],
        cooldown:{
            series:'',
            exercises:[]
        },
        numSect: 1,
    })
    })