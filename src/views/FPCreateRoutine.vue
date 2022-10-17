<template>
  <div class="fill-height accent">
    <ToolBar title="Create Routine"/>
    <RoutineModif :edit="false"/>
  </div>
</template>

<script>
import ToolBar from "@/components/ToolBar";
import RoutineModif from "@/components/Exercise-Routine/RoutineModif";

export default {
  name: "FPCreateRoutine",
  components: {ToolBar, RoutineModif},
}
</script>