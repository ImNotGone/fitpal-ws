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
export default {
  name: "FPDetailedExercise",
  components: {DetailedExercise, ToolBar},
  data: () => ({
    video: {
      type: String,
      default: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
    },
        exerciseName: 'Exercise Name',
        exerciseDescription: 'Exercise Description',
        amountRoutines: 50,
        tags: ['Biceps', 'Abs', 'Triceps'],
        muscles: ['Biceps', 'Abs', 'Triceps'],

  })
}
</script>

<style scoped>

</style>