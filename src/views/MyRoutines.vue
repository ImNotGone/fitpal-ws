<template>
  <div class="my-routines fill-height">
    <ToolBar title="My Routines"/>

    <!-- My Routines, Create new routine button -->
    <v-container class="mx-auto">
      <v-row>
        <h3 class="display-1 pa-5">My Routines</h3>
        <v-spacer/>
        <v-col class="pa-5" cols="12" md="4">
          <v-btn
              color="primary"
              class="white--text rounded-lg"
              block
              to="/create-routine"
          >
            Create New Routine
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- Routines 3 column grid, routines are stored in myRoutines array -->
    <v-container class="mx-auto">
      <v-row>
        <v-col
            v-for="routine in this.routinesStore.getMyRoutines.content"
            :key="routine.id"
            cols="12"
            md="4"
        >
          <RoutineCard
              :routinePicture="routine.metadata.imageUrl"
              :routineName="routine.name"
              :routineDescription="routine.detail"
              :duration="routine.duration"
              :tags="routine.metadata.tags"
              :showSaveButton="false"
              :route="`/routine/${routine.id}`"
              :id = "routine.id"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import ToolBar from "@/components/ToolBar";
import RoutineCard from "@/components/Cards/RoutineCard";
import { useRoutinesStore } from "@/stores/RoutinesStore";

export default {
  components: {
    ToolBar,
    RoutineCard
  },
  setup () {
    const routinesStore = useRoutinesStore();
    return { routinesStore };
  },
  async beforeMount() {
    await this.routinesStore.init();
  },
}
</script>

<style scoped>
div {
  background-color: #939393;
  color: white;
}
</style>
