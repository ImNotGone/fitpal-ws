<!-- Dark grey card that holds a trainers profile picture, its name and a follow button in its first row -->
<!-- The second row holds the trainers amount of routines and its rating -->
<!-- The third row holds the trainers description -->

<template>
  <v-card class="mx-auto">
    <!-- First row -->
    <v-card-title class="grey darken-3 white--text">
      <v-avatar size="100" class="mr-3">
        <img :src="profilePicture" alt="trainer picture">
      </v-avatar>
      <h3 class="headline mb-0 pa-5">{{trainerName}}</h3>
      <!-- Follow text Button -->
      <v-btn text color="orange" class="white--text">
        <v-icon right>mdi-account-plus</v-icon>
        <span class="pa-2">Follow</span>
      </v-btn>
    </v-card-title>

    <!-- Show description if showDescription is true -->
    <v-card-text v-if="trainerDescription === null" class="grey darken-3 white--text">
      <p>{{trainerDescription}}</p>
    </v-card-text>

    <!-- Second row -->
    <v-card-text class="grey darken-3 white--text">
      <v-row class="pa-5">
        <!-- Routines Icon, amount, Routines-->
        <v-icon class="mr-2" color="white">mdi-book-open-variant</v-icon>
        <span>{{ routineAmount }} Routines</span>

        <v-spacer/>

        <!-- Rating Icon, amount, Rating-->
        <v-icon class="mr-2" color="yellow">mdi-star</v-icon>
        <span>{{ rating }} Rating ({{ reviewAmount }} Reviews)</span>
      </v-row>
    </v-card-text>
  </v-card>

</template>

<script>
export default {
  name: 'TrainerCard',
  props: {
    profilePicture: {
      type: String,
      default: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
    },
    trainerName: String,
    trainerDescription: String,
    routineAmount: Number,
    rating: Number,
    reviewAmount: Number,
    showDescription: Boolean,
  },
};
</script>

<style scoped>
.v-card {
  margin-top: 20px;
}
</style>