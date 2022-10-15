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
    ></video>-->
    <!--TODO: Replace with video of exercise-->
    <v-img
      class="mx-auto"
      width="100%"
      height="auto"
      :src="video"
    ></v-img>

    <!-- Exercise name -->
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ exerciseName }}</h3>
      </div>
      <v-spacer/>
      <v-btn class="primary pa-5" :to="'/edit-exercise/' + id">Edit exercise</v-btn>
    </v-card-title>

    <!-- Amount of times the exercise appears in other routines -->
    <!-- Icon amount Routines -->
    <v-card-text>
      <v-row>
        <v-icon class="pr-3 ml-3" color="white">mdi-book-open-variant</v-icon>
        <span class="white--text">In {{ amountRoutines }} Routines</span>
      </v-row>
    </v-card-text>

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


        <v-col cols="4" align-self="end">

          <!-- TODO cambiar el css feo -->
          <v-btn
            color="primary"
            depressed
            class="white--text pa-5"
            style="float: right"
          >
            Add to routine
          </v-btn>
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
    amountRoutines: Number,
    muscles: Array,
    id: String,
  },
}
</script>

<style scoped>
</style>