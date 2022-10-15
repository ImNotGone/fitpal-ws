<template>
  <div class="fill-height accent">
    <ToolBar title="Detailed Exercise"/>
    <v-card class="accent pa-5">
      <detailed-exercise :video="video"
                         :exercise-name="exerciseName"
                         :exercise-description="exerciseDescription"
                         :amount-routines="amountRoutines"
                         :muscles="muscles"
                         :tags="tags"/>
    </v-card>
  </div>


</template>

<script>
import ToolBar from "@/components/ToolBar";
import DetailedExercise from "@/components/Detailed/DetailedExercise";
import {useExerciseStore} from "@/stores/ExerciseStore";


export default {
  name: "FPDetailedExercise",
  components: {DetailedExercise, ToolBar},
  data: () => ({
    video: '',
    exerciseName: '',
    exerciseDescription:  '',
    amountRoutines: 0,
    tags: [],
    muscles: [],

  }),
  async beforeMount() {
    const store = useExerciseStore();

    // Get exercise id from url
    const exerciseId = Number(this.$route.params.id);
    console.log(exerciseId);

    // If invalid id, redirect to my exercises
    if (isNaN(exerciseId))
      await this.$router.push('/my-exercises');

    await store.updateExercises();

    // If exercise doesn't exist, redirect to my exercises
    if (!store.containsExerciseWithId(exerciseId))
      await this.$router.push('/my-exercises');


    this.exerciseName = store.getExerciseName(exerciseId);
    this.exerciseDescription = store.getExerciseDetail(exerciseId);

    this.tags = store.getExerciseMetadata(exerciseId)?.tags;
    // TODO: Get muscles from exercise metadata and amount of routines from exercise metadata
    // this.amountRoutines
    this.muscles = store.getExerciseMetadata(exerciseId)?.tags;
    this.video = store.getExerciseImage(exerciseId);
  }
}
</script>

<style scoped>

</style>