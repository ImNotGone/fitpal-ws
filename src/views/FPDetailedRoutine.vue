<template>
  <div class="fill-height accent">
    <ToolBar title="Detailed Routine"/>
    <v-card class="accent pa-5">
      <detailed-routine :routineName="routineName"
                        :routineDescription="routineDescription"
                        :amountUsers="amountUsers"
                        :duration="duration"
                        :tags="tags"
                        :muscles="muscles"
                        :progress="progress"
                        :exercises="exercises"
                        :series="series"
                        :timeBetweenSeries="timeBetweenSeries"
                        :routineInformation="routineInformation"
                        :id="this.$route.params.id"
                        :image="image"
      />
    </v-card>
  </div>
</template>

<script>
import ToolBar from "@/components/ToolBar";
import DetailedRoutine from "@/components/Detailed/DetailedRoutine";
import {useRoutinesStore} from "@/stores/RoutinesStore";
import {RoutineApi} from "@/api/routines";

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
    sections: [],
    routineInformation: '',
    image: ''
  }),

  async beforeMount() {
    const store = useRoutinesStore();
    await store.init();

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

    let sections = await RoutineApi.getSections(routineId);
    this.sections= [];
    for (let i = 0; i < sections.content.length; i++){
      let section = sections.content[i];
      this.sections.push({title: section.name, series: section.repetitions, rest: section.metadata.rest, exercises: []});
      let ex = await RoutineApi.getExercisesFromSection(routineId, section.id);

      for (let j = 0; j < ex.content.length; j++){
        const exercise = ex.content[j].exercise;
        const type = (ex.content[j].duration === 0) ? 'Reps' : 'Time (seconds)';
        const amount = (type === 'Reps') ? ex.content[j].repetitions : ex.content[j].duration;
        this.sections[i].exercises.push({name: exercise.name, id: exercise.id, type: type, amount: amount});
      }
    }
  }
}
</script>

<style scoped>

</style>