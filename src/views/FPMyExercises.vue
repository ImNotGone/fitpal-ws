<template>
<div class="my-exercises fill-height">
  <ToolBar title="My Exercises"/>

  <v-container>
    <v-row>
      <h3 class="display-1 pa-5">My Exercises</h3>
      <v-spacer/>
      <v-col class="pa-5" cols="12" md="4">
        <v-btn
            color="primary"
            class="white--text rounded-lg"
            block
            to="/create-exercise"
        >
          Create New Exercise
        </v-btn>
      </v-col>
    </v-row>

    <v-container class="mx-auto">
      <v-row>
        <v-col
            v-for="exercise in exercises"
            :key="exercise"
            cols="12"
            md="4"
        >
          <exerciseCard
              :exercisePicture="exerciseStore.getExerciseImage(exercise)"
              :exerciseName="exerciseStore.getExerciseName(exercise)"
              :exerciseDescription="exerciseStore.getExerciseDetail(exercise)"
              :tags="exerciseStore.getExerciseMetadata(exercise)?.tags"
              :route="`/exercise/${exercise}`"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</div>
</template>

<script>
import ToolBar from "@/components/ToolBar";
import ExerciseCard from "@/components/Cards/ExerciseCard";
import {useExerciseStore} from "@/stores/ExerciseStore";

export default {
  components: {
    ToolBar,
    ExerciseCard
  },
  setup () {
    const exerciseStore = useExerciseStore();

    return { exerciseStore };
  },
  data: () => ({
    exercises: []
  }),
  name: "FPMyExercises",
  async beforeMount() {
    await this.exerciseStore.updateExercises();

    this.exercises = this.exerciseStore.getExercisesId;
  }
}
</script>

<style scoped>
div {
  background-color: #939393;
  color: white;
}
</style>