<template>
  <div class="fill-height accent">
    <ToolBar title="Detailed Routine"/>
    <v-card class="accent pa-5">
      <detailed-routine :routineName="routineName"
                        :routineDescription="routineDescription"
                        :duration="duration"
                        :tags="tags"
                        :muscles="muscles"
                        :progress="progress"
                        :exercises="exercises"
                        :sections="sections"
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
    duration: 0,
    tags: [],
    muscles: [],
    progress: 0,
    sections: 0,
    //Name, duration
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

    let routine;

    try{
      routine = await RoutineApi.getRoutine(routineId);
    }catch (e){
      await this.$router.push('/my-routines');
    }

    this.routineName = routine.name;
    this.routineDescription = routine.detail;

    this.tags = routine.metadata.tags;

    this.image = routine.metadata.imageUrl;

    let sections = await RoutineApi.getSections(routineId);
    this.sections = sections.content.length;
  }
}
</script>

<style scoped>

</style>