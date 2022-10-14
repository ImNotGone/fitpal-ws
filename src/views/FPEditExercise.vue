<template>
  <div class="fill-height accent">
    <ToolBar title="Edit Exercise"/>
    <ExerciseModif title="Edit" :path-back="returnPath"/>
  </div>

</template>

<script>
import ToolBar from "@/components/ToolBar";
import ExerciseModif from "@/components/Exercise-Routine/ExerciseModif";
export default {
  name: "FPCreateExercise",
  components: {ToolBar, ExerciseModif},

  props: {
    returnPath: String
  },
}
</script>