<template>
    <div class="home">
      <ToolBar title="Home"/>
      <h3 class="display-1 pa-5 ml-10">Top Trainers</h3>
      <v-slide-group class="slider" dark>
        <v-slide-item class="item pb-3" v-for="trainer in recentTrainers" :key="trainer.id">
          <TrainerCard :profilePicture="trainer.profilePicture" :trainerName="trainer.name"
                       :trainerDescription="trainer.description" :routineAmount="trainer.routineAmount"
                       :rating="trainer.rating" :reviewAmount="trainer.reviewAmount" :showDescription="true"/>
        </v-slide-item>
      </v-slide-group>
      <h3 class="display-1 pa-5 ml-10">My Routines</h3>
      <v-container class="mx-auto">
        <v-row>
          <v-col
              v-for="routine in exploreRoutines"
              :key="routine.id"
              cols="12"
              md="6"
          >
            <RoutineCard maxHeight="200" maxWidth="200"
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
import RoutineCard from "@/components/Cards/RoutineCard";
import TrainerCard from "@/components/Cards/TrainerCard";
import ToolBar from "@/components/ToolBar";

export default {
  components: {
    ToolBar,
    RoutineCard,
    TrainerCard
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
    ],
    recentTrainers: [
      {
        id: 1,
        name: "John Doe",
        profilePicture: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        routineAmount: 5,
        rating: 4.5,
        reviewAmount: 10
      },
      {
        id: 2,
        name: "Jane Doe",
        profilePicture: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        routineAmount: 5,
        rating: 4.5,
        reviewAmount: 10
      },
      {
        id: 3,
        name: "John Doe",
        profilePicture: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        routineAmount: 5,
        rating: 4.5,
        reviewAmount: 10
      },
      {
        id: 4,
        name: "Jane Doe",
        profilePicture: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        routineAmount: 5,
        rating: 4.5,
        reviewAmount: 10
      },
      {
        id: 5,
        name: "John Doe",
        profilePicture: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam co laboris nisi ut aliquip ex ea commodo consequat.",
        routineAmount: 5,
        rating: 4.5,
        reviewAmount: 10
      },
    ],
  }),

}
</script>

<style scoped>
div {
  background-color: #939393;
  color: white;
}
.item {
  width: 500px;
  background-color: #939393;
  outline: 1px solid #939393;
  color: white;
  padding-left: 7px;
  padding-right: 7px;
}
</style>
