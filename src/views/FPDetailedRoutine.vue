<template>
  <div class="fill-height accent">
    <ToolBar title="Detailed Routine"/>
    <v-card class="accent pa-5">
      <detailed-routine :routine-name="routineName"
                        :routine-description="routineDescription"
                        :amount-users="amountUsers"
                        :time="time"
                        :tags="tags"
                        :muscles="muscles"/>
    </v-card>
  </div>
</template>

<script>
import ToolBar from "@/components/ToolBar";
import DetailedRoutine from "@/components/Detailed/DetailedRoutine";
export default {
  name: "FPDetailedRoutine",
  components: {DetailedRoutine, ToolBar},
  data: () => ({
    routineName: 'Routine Name',
    routineDescription: 'Routine Description',
    amountUsers: 50,
    time: '1 Hour',
    tags: ['Biceps', 'Abs', 'Triceps'],
    muscles: ['Biceps', 'Abs', 'Triceps'],

  })
}
</script>

<style scoped>

</style>