<!-- Detailed view of an exercise -->
<!-- First row is a video of the exercise -->
<!-- Second row is the exercise name -->
<!-- Third row is the exercise tags -->
<!-- Fourth row is the amount of times the exercise appears in other routines -->
<!-- Fifth row is the exercise description -->
<!-- Sixth row is the muscles used by the exercise and a button to add the exercise to a routine -->


<template>
  <v-card class="grey darken-3 white--text">
    <!-- Video of the exercise -->
    <!--<video
      class="mx-auto"
      width="100%"
      height="auto"
      controls
      :src="video"
    />-->
    <!--TODO: Replace with video of exercise-->

    <iframe
        width="100%"
        height="600"
        frameborder="0"
        :src="video"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
    ></iframe>

    <!-- Exercise name -->
    <v-card-title primary-title>
      <h3 class="headline mb-0">{{ exerciseName }}</h3>
      <v-spacer/>
      <v-btn class="primary pa-5 ml-5" :to="'/edit-exercise/' + id">Edit exercise</v-btn>
    </v-card-title>

    <!-- Exercise description -->
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">Description</h3>
      </div>
    </v-card-title>
    <v-card-text class="white--text">
      <p>{{ exerciseDescription }}</p>
    </v-card-text>

    <!-- A list of muscles used by the exercise and a button to add the exercise to a routine at the bottom right -->
    <v-card-text class="white--text">
      <v-row>
        <v-col cols="8">
          <h4 class="headline pb-3">Essence of exercise</h4>
          <!-- Vertical Column of muscles used by the exercise -->
          <v-col cols="8">
            <v-row class="pb-3" v-for="muscle in muscles" :key="muscle">
              <v-icon class="pr-3" color="primary">mdi-check</v-icon>
              <span class="white--text">Works {{ muscle }}</span>
            </v-row>
          </v-col>

        </v-col>
      </v-row>
    </v-card-text>
  </v-card>

</template>

<script>
export default {
  name: "DetailedExercise",
  props: {
    video: String,
    exerciseName: String,
    exerciseDescription: String,
    muscles: Array,
    id: String,
  },
}
</script>

<style scoped>
</style>