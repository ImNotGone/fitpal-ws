<template>
  <div class="my-routines fill-height">
    <ToolBar title="My Routines"/>

    <!-- My Routines, Create new routine button -->
    <v-container class="mx-auto">
      <v-row>
        <h3 class="display-1 pa-5">My Routines</h3>
        <v-spacer/>

        <v-select dark
            color="primary"
            v-model="difficultySelected"
            :items="difficulty"
            item-text="state"
            item-value="value"
            label="Difficulty"
            class="ma-3"
            @change="update"
            />
        <v-select dark
            color="primary"
            v-model="directionSelected"
            :items="directions"
            item-text="state"
            item-value="value"
            label="Direction"
            class="ma-3"
            @change="update"
            />
        <v-select dark
              color="primary"
              v-model="orderSelected"
              :items="orders"
              item-text="state"
              item-value="value"
              label="Order by"
              class="ma-3"
              @change="update"
          />

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
import { GetRoutines } from "@/api/routines";

export default {
  components: {
    ToolBar,
    RoutineCard
  },
  data() {
    return {
        difficultySelected: null,
        difficulty: [
        {state:"--",            value:null},
        {state:"rookie",        value:"rookie"},
        {state:"beginner",      value:"beginner"},
        {state:"intermediate",  value:"intermediate"},
        {state:"advanced",      value:"advanced"},
        {state:"expert",        value:"expert"}],
        directionSelected: null,
        directions:
        [
        {state:"--",            value:null},
        {state:"ascending",     value:"asc"},
        {state:"descending",    value:"desc"}
        ],
        orderSelected: null,
        orders: [
        {state:"--",        value:null},
        {state:"name",      value:"name"},
        {state:"detail",    value:"detail"},
        {state:"date",      value:"date"},
        {state:"score",     value:"score"},
        {state:"difficulty",value:"difficulty"},
        {state:"user",      value:"user"},
        ],
    }
  },
  methods: {
    async update() {
        const getRoutines = new GetRoutines(this.orderSelected, this.directionSelected, this.difficultySelected);
        await this.routinesStore.retrieveMyRoutines(getRoutines);
    }
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
