import {defineStore} from "pinia";

export const useCreateRoutineStore = defineStore('createRoutineStore',{
    state:() =>({
        routineName: '',
        desc: '',
        image: "",
        sections: [
            {
                title:'Warmup Section',
                series:'',
                rest:'',
                exercises:[]
            },
            {title:'Section 1',
                series:'',
                rest:'',
                exercises:[]
            },
            {title:'Cooldown Section',
                series:'',
                rest:'',
                exercises:[]
            }
        ],
        numSect: 1,
    }),
    getters:{
        getRoutineName: (state) => state.routineName,
        getDesc: (state) => state.desc,
        getImage: (state) => state.image,
        getSections: (state) => state.sections,
        getNumSect: (state) => state.numSect,
    },
    actions:{
        addSection(){
            this.numSect=this.numSect +1;
            this.sections.splice(this.numSect, 0, {title:'Section ' + this.numSect, rest: '', series: '', exercises: []});
        },
        deleteSection(){
            if(this.numSect>1){
                this.sections = this.sections.filter((section) => section.title !== 'Section ' + this.numSect);
                this.numSect = this.numSect - 1;
            }
        },
        addExercise(section, exName){
            this.sections.find((s) => s.title === section.title).exercises.push({name:exName, reps:'', time:''});
        },
        deleteExercise(section){
            this.sections.find((s) => s.title === section.title).exercises.pop();
        }
    }
    })
