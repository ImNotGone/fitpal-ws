<!-- Dark grey card that holds a routines picture in its first row -->
<!-- The second row holds the routines name, tags and a save button -->
<!-- The third row holds the routines description -->
<!-- The fourth row holds the routines duration -->

<template>
  <!-- Card -->
  <v-card class="mx-auto" min-width="350" max-width="350" :to="route">
    <!-- First row -->
    <v-card-title class="grey darken-3 white--text">
      <!-- Rectangular Image -->
      <v-img
        class="white--text align-end rounded-lg"
        :src="routinePicture"
        aspect-ratio="2.75"
        max-height="200"
      >
      </v-img>
    </v-card-title>

    <!-- Second row -->
    <v-card-text class="grey darken-3 white--text">
      <v-row>
        <!-- Routine name -->
        <v-col cols="8">
          <h4 class="headline mb-0">{{routineName}}</h4>
        </v-col>

        <v-spacer/>

      </v-row>
      <v-chip-group column>
        <v-chip v-for="tag in tags" :key="tag" color="primary" text-color="white" small>
          {{ tag }}
        </v-chip>
      </v-chip-group>

      <!-- Third row -->
      <!-- Description -->
      <h4 class="headline mb-0">Description</h4>
      <p>{{routineDescription}}</p>

     <!-- Fourth row -->
      <v-row class="pa-5">
        <v-rating
            :value="rating"
            color="primary"
            class="ma-auto"
            background-color="grey"
            empty-icon="$ratingFull"
            half-increments
            hover
            large
            readonly
        />
      </v-row>
    </v-card-text>
  </v-card>

</template>

<script>
import {RoutineApi} from "@/api/routines";

export default {
  name: "RoutineCard",
  data() {
    return {
      rating: 0,
    }
  },
  props: {
    routinePicture: {
      type: String,
      default: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZXhlcmNpc2V8ZW58MHx8MHx8&w=1000&q=80"
    },
    routineName: String,
    routineDescription: String,
    tags: Array,
    duration: Number,
    route: String,
    id: Number,
  },
  methods: {
    async calcRating() {
      this.rating = 0;
      try {
        const ratings = await RoutineApi.getRoutineRewiews(this.id)
        ratings.content.forEach(rating => {
          this.rating += rating.score;
        });
        this.rating /= ratings.content.length;
        this.rating /= 2;
      } catch (e) {
        this.rating = 0;
      }
    },
  },
  async beforeMount() {
    await this.calcRating()

  }
}
</script>

<style scoped>

</style>
