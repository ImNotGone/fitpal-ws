<template>
  <v-card class="mx-auto" min-width="350" max-width="350" :to="route">
    <!-- First row -->
    <v-card-title class="grey darken-3 white--text">
      <!-- Rectangular Image -->
      <iframe
          width="100%"
          frameborder="0"
          :src="exercisePicture"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
      ></iframe>
    </v-card-title>

    <!-- Second row -->
    <v-card-text class="grey darken-3 white--text">
      <v-row>
        <!-- exercise name -->
        <v-col cols="12">
          <h4 class="headline mb-0">{{exerciseName}}</h4>
        </v-col>
      </v-row>

      <v-chip-group column>
        <v-chip v-for="tag in tags" :key="tag" color="primary" text-color="white" small>
          {{ tag }}
        </v-chip>
      </v-chip-group>

      <!-- Third row -->
      <!-- Description -->
      <h4 class="headline mb-0">Description</h4>
      <p>{{exerciseDescription}}</p>
      
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ExerciseCard",
  props: {
    exercisePicture: {
      type: String,
      default: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZXhlcmNpc2V8ZW58MHx8MHx8&w=1000&q=80"
    },
    exerciseName: String,
    exerciseDescription: String,
    tags: Array,
    route: String
  }
}
</script>

<style scoped>

</style>