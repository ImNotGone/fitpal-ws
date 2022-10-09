<template>
  <div class="exploreroutines">
    <ToolBar title="Explore Routines"/>

    <!-- Explore Routines, Create new routine button -->
    <v-container class="mx-auto">
      <v-row>

        <h3 class="display-1 pa-5">Explore Routines</h3>
        <v-spacer/>
        <v-col class="pa-5" cols="12" md="4">
          <v-btn
              color="primary"
              class="white--text rounded-lg"
              block
          >
            Create New Routine
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <!-- Routines 3 column grid, routines are stored in exploreRoutines array -->
    <v-container class="mx-auto">
      <v-row>
        <v-col
            v-for="routine in exploreRoutines"
            :key="routine.id"
            cols="12"
            md="4"
        >
          <RoutineCard
              :routineName="routine.name"
              :routineDescription="routine.description"
              :duration="routine.duration"
              :tags="routine.tags"
              :showSaveButton="true"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import ToolBar from "@/components/ToolBar";
import RoutineCard from "@/components/Cards/RoutineCard";

export default {
  components: {
    ToolBar,
    RoutineCard
  },

  data: () => ({
    exploreRoutines: [
      {
        id: 1,
        name: "Morning Routine",
        description: "This is my morning routine",
        duration: 30,
        tags: ["Morning", "Routine", "Cardio"]
      },
      {
        id: 2,
        name: "Evening Routine",
        description: "This is my evening routine",
        duration: 30,
        tags: ["Evening", "Routine", "Cardio"]
      },
      {
        id: 3,
        name: "Morning Routine",
        description: "This is my morning routine",
        duration: 30,
        tags: ["Morning", "Routine", "Cardio"]
      },
      {
        id: 4,
        name: "Evening Routine",
        description: "This is my evening routine",
        duration: 30,
        tags: ["Evening", "Routine", "Cardio"]
      },
      {
        id: 5,
        name: "Morning Routine",
        description: "This is my morning routine",
        duration: 30,
        tags: ["Morning", "Routine", "Cardio"]
      },
      {
        id: 6,
        name: "Evening Routine",
        description: "This is my evening routine",
        duration: 30,
        tags: ["Evening", "Routine", "Cardio"]
      },
      {
        id: 7,
        name: "Morning Routine",
        description: "This is my morning routine",
        duration: 30,
        tags: ["Morning", "Routine", "Cardio"]
      },
      {
        id: 8,
        name: "Evening Routine",
        description: "This is my evening routine",
        duration: 30,
        tags: ["Evening", "Routine", "Cardio"]
      },
    ]
  })
}
</script>

<style scoped>
div {
  background-color: #939393;
  color: white;
}
</style>
