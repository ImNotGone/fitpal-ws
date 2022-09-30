<!-- Page with 3 horizontal scrollable rows of trainers  -->
<!-- The first row holds recent trainers -->
<!-- The second row holds the followed trainers -->
<!-- The third row holds the most popular trainers -->


<template>
  <div class="trainers">
    <ToolBar title="Trainers"/>

    <!-- Recent Trainers -->
    <!-- Title -->
    <v-row class="mx-5 pa-5">
      <v-col>
        <h3 class="display-1">Recent Trainers</h3>
      </v-col>

      <v-spacer></v-spacer>

      <!-- Scroll button -->
      <!-- Centered -->
      <v-col cols="auto">
        <v-btn icon class="mx-5" color="white">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn icon class="mx-5" color="white">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Trainers -->
    <!-- Horizontal scrollable row -->
    <!-- Spacing between cards -->
    <v-row class="mx-5">
      <v-col cols="12">
        <v-row class="mx-5 flex-nowrap" align="center" justify="center">
          <v-col v-for="trainer in recentTrainers" :key="trainer.id" cols="auto">
            <TrainerCard :profilePicture="trainer.profilePicture" :trainerName="trainer.name"
                         :trainerDescription="trainer.description" :routineAmount="trainer.routineAmount"
                         :rating="trainer.rating" :reviewAmount="trainer.reviewAmount" :showDescription="false"/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Followed Trainers -->
    <!-- Title -->
    <v-row class="mx-5 pa-5">
      <v-col>
        <h3 class="display-1">Followed Trainers</h3>
      </v-col>

      <v-spacer></v-spacer>

      <!-- Scroll button -->
      <!-- Centered -->
      <v-col cols="auto">
        <v-btn icon class="mx-5" color="white">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn icon class="mx-5" color="white">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Trainers -->
    <!-- Horizontal scrollable row -->
    <!-- Spacing between cards -->
    <v-row class="mx-5">
      <v-col cols="12">
        <v-row class="mx-5 flex-nowrap" align="center" justify="center">
          <v-col v-for="trainer in recentTrainers" :key="trainer.id" cols="auto">
            <TrainerCard :profilePicture="trainer.profilePicture" :trainerName="trainer.name"
                         :trainerDescription="trainer.description" :routineAmount="trainer.routineAmount"
                         :rating="trainer.rating" :reviewAmount="trainer.reviewAmount" :showDescription="false"/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Popular Trainers -->
    <!-- Title -->
    <v-row class="mx-5 pa-5">
      <v-col>
        <h3 class="display-1">Popular Trainers</h3>
      </v-col>

      <v-spacer></v-spacer>

      <!-- Scroll button -->
      <!-- Centered -->
      <v-col cols="auto">
        <v-btn icon class="mx-5" color="white">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn icon class="mx-5" color="white">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Trainers -->
    <!-- Horizontal scrollable row -->
    <!-- Spacing between cards -->
    <v-row class="mx-5">
      <v-col cols="12">
        <v-row class="mx-5 flex-nowrap" align="center" justify="center">
          <v-col v-for="trainer in recentTrainers" :key="trainer.id" cols="auto">
            <TrainerCard :profilePicture="trainer.profilePicture" :trainerName="trainer.name"
                         :trainerDescription="trainer.description" :routineAmount="trainer.routineAmount"
                         :rating="trainer.rating" :reviewAmount="trainer.reviewAmount" :showDescription="true"/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>


<script>
import ToolBar from "@/components/ToolBar";
import TrainerCard from "@/components/TrainerCard";

export default {
  components: {
    ToolBar,
    TrainerCard
  },

  data: () => ({
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
</style>
