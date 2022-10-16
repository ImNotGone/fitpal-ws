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
                        :id="this.$route.params.id"
      />
    </v-card>
  </div>
</template>

<script>
import ToolBar from "@/components/ToolBar";
import DetailedRoutine from "@/components/Detailed/DetailedRoutine";
import {useRoutinesStore} from "@/stores/RoutinesStore";

export default {
  name: "FPDetailedRoutine",
  components: {DetailedRoutine, ToolBar},
  data: () => ({
    routineName: '',
    routineDescription: '',
    amountUsers: 0,
    duration: 0,
    tags: [],
    muscles: [],
    progress: 0,
    series: 0,
    timeBetweenSeries: 0,
    //Name, duration
    exercises: [],
    routineInformation: ''
  }),

  async beforeMount() {
    const store = useRoutinesStore();

    // Get exercise id from url
    const routineId = Number(this.$route.params.id);

    // If invalid id, redirect to my routines
    if (isNaN(routineId))
      await this.$router.push('/my-routines');

    // await store.updateRoutines();

    // If routine doesn't exist, redirect to my routines
    if (!store.containsRoutineWithId(routineId))
      await this.$router.push('/my-routines');


    this.routineName = store.getRoutineName(routineId);
    this.routineDescription = store.getRoutineDetail(routineId);

    // this.tags = store.getRoutineMetadata(routineId)?.tags;

    this.muscles = store.getRoutineMetadata(routineId)?.tags;
    this.image = store.getRoutineImage(routineId);
    this.imageId = store.getRoutineImageId(routineId);
  }
}
</script>

<style scoped>

</style>