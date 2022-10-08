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
    <v-img
        class="mx-auto"
        width="100%"
        height="auto"
        :src="routinePicture"
    ></v-img>

    <!-- Exercise name -->
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ routineName }}</h3>
      </div>
    </v-card-title>

    <!-- Exercise tags -->
    <v-card-actions>
      <v-chip-group column>
        <v-chip v-for="tag in tags" :key="tag" color="primary" text-color="white" small>
          {{ tag }}
        </v-chip>
      </v-chip-group>
    </v-card-actions>

    <!-- Amount of times the exercise appears in other routines -->
    <!-- Icon amount Routines -->
    <v-card-text>
      <v-row>
        <v-icon class="pr-3 ml-3" color="white">mdi-account-multiple-outline</v-icon>
        <span class="white--text"> {{amountUsers}} Users used this routine</span>
        <v-icon class="pr-3 ml-3" color="white">mdi-clock-time-five-outline</v-icon>
        <span class="white--text"> {{ time }}</span>
      </v-row>
    </v-card-text>

    <!-- Exercise description -->
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">Description</h3>
      </div>
    </v-card-title>
    <v-card-text class="white--text">
      <p>{{ routineDescription }}</p>
    </v-card-text>

    <!-- A list of muscles used by the exercise and a button to add the exercise to a routine at the bottom right -->
    <v-card-text class="white--text">
      <v-row>
        <v-col cols="8">
          <h4 class="headline pb-3">Essence of routine</h4>
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
            Start Routine
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>

</template>

<script>
export default {
  name: "DetailedRoutine",
  props: {
    routinePicture: {
      type: String,
      default: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZXhlcmNpc2V8ZW58MHx8MHx8&w=1000&q=80"
    },
    routineName: String,
    routineDescription: String,
    amountUsers: Number,
    time: String,
    tags: Array,
    muscles: Array,
  },
}
</script>

<style scoped>
</style>