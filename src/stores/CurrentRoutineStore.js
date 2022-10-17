import { defineStore } from "pinia";
import { RoutineApi} from "@/api/routines";

export const useCurrentRoutineStore = defineStore('currentRoutineStore', {
    state: () => ({
        currentRoutine: {},
        currentSection: 0,
        currentSectionRepsLeft: 0,
        currentExercise: 0,
    }),

    getters: {
        getRoutineName() {
            return this.currentRoutine.name;
        },
        getCurrentExerciseId: (state) => {
            return state.currentRoutine.sections[state.currentSection].exercises[state.currentExercise].exercise.id;
        },
        getCurrentExerciseName: (state) => state.currentRoutine.sections[state.currentSection].exercises[state.currentExercise].exercise.name,
        getCurrentExerciseDescription: (state) => state.currentRoutine.sections[state.currentSection].exercises[state.currentExercise].exercise.detail,
        getCurrentExerciseAmount: (state) => {
            const exercise = state.currentRoutine.sections[state.currentSection].exercises[state.currentExercise];
            return exercise.duration === 0 ? exercise.repetitions : exercise.duration;
        },
        getCurrentExerciseType: (state) => {
            const exercise = state.currentRoutine.sections[state.currentSection].exercises[state.currentExercise];
            return exercise.duration === 0 ? "reps" : "duration";
        },
        getCurrentExerciseTags: (state) => state.currentRoutine.sections[state.currentSection].exercises[state.currentExercise].exercise.metadata.tags,

        getCurrentSectionName: (state) => state.currentRoutine.sections[state.currentSection].name,
        getCurrentSectionRepetitionsLeft: (state) => state.currentSectionRepsLeft,

        getCurrentExercise: (state) => state.currentExercise + 1,
        getCurrentSection: (state) => state.currentSection + 1,

        willFinishRoutine: (state) => {
            return state.currentSection + 1 >= state.currentRoutine.sections.length && state.currentExercise + 1 >= state.currentRoutine.sections[state.currentSection].exercises.length;
        },
        willFinishSection: (state) => {
            return state.currentSectionRepsLeft + 1 <= 0;
        },
        willFinishRepetition: (state) => {
            return state.currentExercise + 1 >= state.currentRoutine.sections[state.currentSection].exercises.length;
        }
    },
    actions: {
        async init(routineId, sectionOrder, exerciseOrder) {
            this.currentRoutine = await RoutineApi.getRoutine(routineId);

            let sections = await RoutineApi.getSections(this.currentRoutine.id);
            this.currentRoutine.sections = sections.content;

            // load exercises to the sections
            for (let j = 0; j < sections.content.length; j++) {
                let section = sections.content[j];
                let exercises = await RoutineApi.getExercisesFromSection(this.currentRoutine.id, section.id);
                this.currentRoutine.sections[j].exercises = exercises.content;
            }

            // current section
            this.currentSection = sectionOrder - 1;
            this.currentSectionRepsLeft = this.currentRoutine.sections[this.currentSection].repetitions;
            this.currentExercise = exerciseOrder - 1;

            console.log(this.currentRoutine);
        },
        async nextExercise() {
            this.currentExercise++;

            // If there are no more exercises in the section and there are repetitions left, repeat the section
            // If there are no more exercises in the section and there are no repetitions left, go to the next section
            // If there are no more sections, finish the routine
            if (this.currentExercise >= this.currentRoutine.sections[this.currentSection].exercises.length) {
                console.log("Finished repetition");
                if (this.currentSectionRepsLeft > 1) {
                    this.currentSectionRepsLeft--;
                    this.currentExercise = 0;
                } else {
                    this.currentSection++;
                    if (this.currentSection >= this.currentRoutine.sections.length) {
                        return;
                    }
                    this.currentSectionRepsLeft = this.currentRoutine.sections[this.currentSection].repetitions;
                    this.currentExercise = 0;
                }
            }
        },
        async previousExercise() {
            this.currentExercise--;
            if (this.currentExercise <= 0) {
                this.currentSection--;
                this.currentSectionRepsLeft = this.currentRoutine.sections[this.currentSection].repetitions;
                this.currentExercise = this.currentRoutine.sections[this.currentSection].exercises.length;
            }
        }
    }
});