<!-- Page with 3 horizontal scrollable rows of trainers  -->
<!-- The first row holds recent trainers -->
<!-- The second row holds the followed trainers -->
<!-- The third row holds the most popular trainers -->


<template>
  <div class="trainers">
    <ToolBar title="Trainers"/>

    <!-- Recent Trainers -->
    <!-- Title -->
    <h3 class="display-1 pa-5">Recent Trainers</h3>

    <!-- Trainers -->
    <!-- Horizontal scrollable row -->
    <v-slide-group class="slider" dark>
      <v-slide-item class="item" v-for="trainer in recentTrainers" :key="trainer.id">
        <TrainerCard :profilePicture="trainer.profilePicture" :trainerName="trainer.name"
                     :trainerDescription="trainer.description" :routineAmount="trainer.routineAmount"
                     :rating="trainer.rating" :reviewAmount="trainer.reviewAmount" :showDescription="false"/>
      </v-slide-item>
    </v-slide-group>

    <!-- Followed Trainers -->
    <!-- Title -->
    <h3 class="display-1 pa-5">Followed Trainers</h3>


    <!-- Trainers -->
    <!-- Horizontal scrollable row -->
    <v-slide-group class="slider" dark>
      <v-slide-item class="item" v-for="trainer in recentTrainers" :key="trainer.id">
        <TrainerCard :profilePicture="trainer.profilePicture" :trainerName="trainer.name"
                     :trainerDescription="trainer.description" :routineAmount="trainer.routineAmount"
                     :rating="trainer.rating" :reviewAmount="trainer.reviewAmount" :showDescription="false"/>
      </v-slide-item>
    </v-slide-group>

    <!-- Popular Trainers -->
    <!-- Title -->
    <h3 class="display-1 pa-5">Popular Trainers</h3>

    <!-- Trainers -->
    <!-- Horizontal scrollable row -->
    <v-slide-group class="slider" dark>
      <v-slide-item class="item pb-5" v-for="trainer in recentTrainers" :key="trainer.id">
        <TrainerCard :profilePicture="trainer.profilePicture" :trainerName="trainer.name"
                     :trainerDescription="trainer.description" :routineAmount="trainer.routineAmount"
                     :rating="trainer.rating" :reviewAmount="trainer.reviewAmount" :showDescription="true"/>
      </v-slide-item>
    </v-slide-group>
  </div>
</template>


<script>
import ToolBar from "@/components/ToolBar";
import TrainerCard from "@/components/Cards/TrainerCard";

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
.item {
  width: 500px;
  background-color: #939393;
  outline: 1px solid #939393;
  color: white;
  padding-left: 7px;
  padding-right: 7px;
}
</style>
