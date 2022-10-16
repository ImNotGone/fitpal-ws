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
                exercises:[],
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
        activeSection: "Warmup Section",
    }),
    getters:{
        getRoutineName: (state) => state.routineName,
        getDesc: (state) => state.desc,
        getImage: (state) => state.image,
        getSections: (state) => state.sections,
        getNumSect: (state) => state.numSect,
        getActiveSection: (state) => state.activeSection,
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

            // If we delete the active section, we set the active section to the last section
            if(this.activeSection === 'Section ' + (this.numSect + 1)){
                this.activeSection = (this.numSect === 1)? 'Cooldown Section': 'Section ' + this.numSect;
            }
        },
        addExercise(exName){
            // Find active Section
            let section = this.sections.find(section => section.title === this.activeSection);

            // Create a unique id for the exercise
            let uid = 0;

            while (this.sections.find(s => s.title === section.title).exercises.some(exercise => exercise.id === uid)) {
                uid++;
            }

            this.sections.find((s) => s.title === section.title).exercises.push({name:exName, reps:'', time:'', id:uid});
        },
        deleteExercise(section, id){
            this.sections.find((s) => s.title === section.title).exercises = this.sections.find((s) => s.title === section.title).exercises.filter((ex) => ex.id !== id);
            console.log(this.sections.find((s) => s.title === section.title).exercises);
        },
        setActiveSection(section){
            this.activeSection = section.title;
            console.log(this.activeSection);
        }
    }
    })
