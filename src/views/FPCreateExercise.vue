<template>
  <div class="fill-height accent">
    <ToolBar title="Create Exercise"/>
    <ExerciseModif :edit="false" :init-desc="''" :init-exercise-name="''" :init-tags="[]" :init-video="''" path-back="/my-exercises"/>
  </div>

</template>

<script>
import ToolBar from "@/components/ToolBar";
import ExerciseModif from "@/components/Exercise-Routine/ExerciseModif";
export default {
  name: "FPCreateExercise",
  components: {ToolBar, ExerciseModif},
}
</script>