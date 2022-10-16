import {defineStore} from "pinia";
import {useRoutinesStore} from "@/stores/RoutinesStore";
import {CycleExercise, RoutineApi, RoutineData, SectionData} from "@/api/routines";

export const useCreateRoutineStore = defineStore('createRoutineStore',{
    state:() =>({
        routineName: '',
        desc: '',
        image: "",
        isPublic: false,
        difficulty: '',
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
        getPublic: (state) => state.isPublic,
        getDifficulty: (state) => state.difficulty,
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
        addExercise(exercise){
            console.log(exercise);

            // Find active Section
            let section = this.sections.find(section => section.title === this.activeSection);

            console.log(section.exercises);

            // if exercise is in section, return
            if(section.exercises.find(ex => ex.id === exercise.id)){
                return;
            }

            this.sections.find((s) => s.title === section.title).exercises.push({name:exercise.title, id:exercise.id});
        },
        deleteExercise(section, id){
            this.sections.find((s) => s.title === section.title).exercises = this.sections.find((s) => s.title === section.title).exercises.filter((ex) => ex.id !== id);
            console.log(this.sections.find((s) => s.title === section.title).exercises);
        },
        setActiveSection(section){
            this.activeSection = section.title;
            console.log(this.activeSection);
            console.log(this.sections);
        },
        async submitRoutine(){
            // Add the routine to the database
            let routineData = new RoutineData(
                this.routineName,
                this.desc,
                this.isPublic,
                this.difficulty.toLowerCase(),
                this.image,
            []
            )

            const store = useRoutinesStore();
            let resp = await store.addRoutine(routineData);

            // Add the sections to the database
            for(let i = 0; i < this.sections.length; i++){
                const section = this.sections[i];

                const sectionType = (i === 0)? 'warmup': (i === this.sections.length - 1)? 'cooldown': 'exercise';

                let sectionData = new SectionData(
                    section.title,
                    i + 1,
                    sectionType,
                    +section.series,
                    +section.rest,
                )

                let respSection = await RoutineApi.addSection(resp.id, sectionData);

                // Add the exercises to the database
                for(let j = 0; j < section.exercises.length; j++){
                    const exercise = section.exercises[j];

                    let sectionExerciseData = new CycleExercise(
                        j + 1,
                        exercise.type,
                        +exercise.amount,
                    )

                    await RoutineApi.addExerciseToSection(respSection.id, exercise.id, sectionExerciseData);
                }
            }
        },

        async fetchRoutine(routineId){
            const store = useRoutinesStore();
            await store.init();
            let routine = store.getRoutine(routineId);
            this.routineName = routine.name;
            this.desc = routine.detail;
            this.isPublic = routine.isPublic;
            this.difficulty = routine.difficulty.charAt(0).toUpperCase() + routine.difficulty.slice(1);
            this.image = routine.image;
            let sections = await RoutineApi.getSections(routineId);
            this.sections = [];

            for (let i = 0; i < sections.content.length; i++){
                let section = sections.content[i];
                this.sections.push({title: section.name, series: section.repetitions, rest: section.metadata.rest, exercises: []});


                let ex = await RoutineApi.getExercisesFromSection(routineId, section.id);
                console.log(ex);
                for (let j = 0; j < ex.content.length; j++){
                    const exercise = ex.content[j].exercise;
                    const type = (ex.content[j].duration === 0) ? 'Reps' : 'Time (seconds)';
                    const amount = (type === 'Reps') ? ex.content[j].repetitions : ex.content[j].duration;
                    this.sections[i].exercises.push({name: exercise.name, id: exercise.id, type: type, amount: amount});
                }

            }
            this.numSect = this.sections.length;
            this.activeSection = "Warmup Section";
        },

        clearRoutine(){
            this.routineName = '';
            this.desc = '';
            this.image = "";
            this.isPublic = false;
            this.difficulty = '';
            this.sections = [
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
            ];
            this.numSect = 1;
            this.activeSection = "Warmup Section";
        }
    }
    })
