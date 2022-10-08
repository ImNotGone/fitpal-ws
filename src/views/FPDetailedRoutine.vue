<template>
  <div class="fill-height accent">
    <ToolBar title="Detailed Routine"/>
    <v-card class="accent pa-5">
      <detailed-routine :routine-name="routineName"
                        :routine-description="routineDescription"
                        :amount-users="amountUsers"
                        :duration="duration"
                        :tags="tags"
                        :muscles="muscles"
                        :progress="progress"
                        :exercises="exercises"
                        :series="series"
                        :time-between-series="timeBetweenSeries"
                        :routine-information="routineInformation"
      ></detailed-routine>
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
    duration: 30,
    tags: ['Biceps', 'Abs', 'Triceps'],
    muscles: ['Biceps', 'Abs', 'Triceps'],
    progress: 48,
    series: 3,
    timeBetweenSeries: 30,
    exercises: [
        {
          name: 'blank poses',
          duration: "30 s"
        },
      {
        name: 'pilates',
        duration: "30 s"
      },
      {
        name: 'Barbell Curl',
        duration: "10 reps"
      }
    ],
    routineInformation: "Last modified 25/08"

  })
}
</script>

<style scoped>

</style>