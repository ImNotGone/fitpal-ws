import {defineStore} from "pinia";
import {ExercisesApi, Image} from "@/api/exercises";

export const useExerciseStore = defineStore('exerciseStore',{
    state:()=>({
        exercises: []
    }),
    getters:{
        getExercises: (state) => state.exercises,
        containsExerciseWithId: (state) => (id) => {
            return state.exercises.some(exercise => exercise.id === id);
        },
        getExercisesId: (state) => {
            // Return an array of the exercises id
            let exercisesId = [];
            state.exercises.forEach(exercise => {
                exercisesId.push(exercise.id);
            });
            return exercisesId;
        },
        getExerciseName: (state) => (id) => state.exercises.find(exercise => exercise.id === id)?.name,
        getExerciseDetail: (state) => (id) => state.exercises.find(exercise => exercise.id === id)?.detail,
        getExerciseType: (state) => (id) => state.exercises.find(exercise => exercise.id === id)?.type,
        getExerciseMetadata: (state) => (id) => state.exercises.find(exercise => exercise.id === id)?.metadata,
        getExerciseImage: (state) => (id) => state.exercises.find(exercise => exercise.id === id)?.image.url,
        getExerciseImageId: (state) => (id) => state.exercises.find(exercise => exercise.id === id)?.image.id,
    },

    actions:{
        async updateExercises(){
            this.exercises = await ExercisesApi.getExercises();

            // For each exercise, create an image field and add the image url
            for (let i = 0; i < this.exercises.length; i++) {
                this.exercises[i].image = await ExercisesApi.getImage(this.exercises[i].id);
            }
        },
        async addExercise(exercise, image){
            const resp = await ExercisesApi.addExercise(exercise);

            // Add the image to the exercise
            resp.image = image ? image : new Image("https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZXhlcmNpc2V8ZW58MHx8MHx8&w=1000&q=80");
            await ExercisesApi.addImage(resp.id, resp.image);

            // Add the exercise to the store
            this.exercises.push(resp);
        },
        async editExercise(id, exercise, image, imageId){
            await ExercisesApi.editExercise(id, exercise);

            // Update the exercise in the store
            const index = this.exercises.findIndex(exercise => exercise.id === id);
            this.exercises[index] = exercise;

            // If there is an image, edit it
            if (image) {
                await ExercisesApi.editImage(id, imageId, image);
                this.exercises[index].image = image;
            }
        },
        async deleteExercise(id){
            await ExercisesApi.deleteExercise(id);

            // Remove the exercise from the store
            const index = this.exercises.findIndex(exercise => exercise.id === id);
            this.exercises.splice(index, 1);
        },

    }

})