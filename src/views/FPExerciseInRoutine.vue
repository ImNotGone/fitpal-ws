<template>
  <div>
    <ToolBar title="Exercise"/>
    <ExerciseInRoutine :exercise-name="exerciseName"
                       :exercise-description="exerciseDescription"
                       :tags="tags"
                       :see-details="seeDetails"
                       :pause-exercise="pauseExercise"/>
  </div>

</template>

<script>
import ToolBar from "@/components/ToolBar";
import ExerciseInRoutine from "@/components/Detailed/ExerciseInRoutine";
export default {
  name: "FPExerciseInRoutine",
  components: {ExerciseInRoutine, ToolBar},
  data: () => ({
    exerciseName: "Push-ups",
    exerciseDescription: "A push-up is a common calisthenics exercise beginning from the prone position. By raising and lowering the body using the arms, push-ups exercise pectoral muscles, triceps, and anterior deltoids, with ancillary benefits to the rest of the deltoids, serratus anterior, coracobrachialis, and the midsection.",
    muscles: ["Pectoral muscles", "Triceps", "Anterior deltoids"],
    tags: ["Push-ups", "Cardio", "Strength"],
    video: "https://www.youtube.com/embed/IODxDxX7oi4",
  }),
}
</script>

<style scoped>

</style>