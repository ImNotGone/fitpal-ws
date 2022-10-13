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
    }),
    getters:{
        getRoutineName: (state) => state.routineName,
        getDesc: (state) => state.desc,
        getImage: (state) => state.image,
        getWarmup: (state) => state.warmup,
        getSections: (state) => state.sections,
        getCooldown: (state) => state.cooldown,
        getNumSect: (state) => state.numSect,
    },
    actions:{

    }
    })
