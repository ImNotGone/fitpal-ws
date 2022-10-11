<!-- Detailed view of a routine, it has 2 cards -->
<!-- first card -->
<!-- First row is an image of the routine and a bookmark button -->
<!-- Second row is the routine name -->
<!-- Third row is the routine tags -->
<!-- Fourth row is  a progress bar & the amount of users that used the routine with the routines duration -->
<!-- Fifth row is the routines description -->
<!-- Sixth row is the muscles used by the routine-->

<!-- second card -->
<!-- First row is the number of series of the routine -->
<!-- Second row is the time between series -->
<!-- Third row is the list of exercises of the routine -->
<!-- fourth roe is the routine information -->
<!-- Fifth row is a button to start the routine -->


<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="8">
        <!-- First card -->
        <v-card class="grey darken-3 white--text">
          <!-- Image of the routine -->
          <v-img
              class="white--text align-end rounded-lg"
              aspect-ratio="2.75"
              :src="image"
          />

          <!-- Routine name, bookmark button -->
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-n5">{{ routineName }}</h3>
            </div>
            <v-spacer />
            <v-btn class="primary pa-5" to="/edit-routine">Edit routine</v-btn>
            <v-btn text class="white--text pa-5 pt-7">
              <v-icon x-large>mdi-bookmark-multiple-outline</v-icon>
            </v-btn>
          </v-card-title>

          <!-- Routine tags -->
          <v-card-actions>
            <v-chip-group column class="ml-2">
              <v-chip v-for="tag in tags" :key="tag" color="primary" text-color="white" small>
                {{ tag }}
              </v-chip>
            </v-chip-group>
          </v-card-actions>

          <!-- Progress bar -->
          <v-card-text>
            <v-col cols="8">
              <v-row>
                <h3 class="headline mb-6 white--text">Progress</h3>
                <v-spacer></v-spacer>
                <h3 class="headline progress-indicator">{{ progress }}%</h3>
              </v-row>

              <v-progress-linear
                  :value="progress"
                  height="10"
                  color="primary"
                  class="rounded-lg ml-n3"
              ></v-progress-linear>
            </v-col>

          </v-card-text>

          <!-- Amount of users that used the routine and the routines duration -->
          <!-- Icon amount Routines -->
          <v-card-text>
            <v-row>
              <v-icon class="pr-3 ml-3" color="white">mdi-account-multiple-outline</v-icon>
              <span class="white--text">{{ amountUsers }} Used this routine</span>
              <v-icon class="pr-3 ml-3" color="white">mdi-clock-outline</v-icon>
              <span class="white--text">{{ duration }} minutes</span>
            </v-row>
          </v-card-text>

          <!-- Routine description -->
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Description</h3>
            </div>
          </v-card-title>
          <v-card-text class="white--text">
            <p>{{ routineDescription }}</p>
          </v-card-text>

          <!-- A list of muscles used by the Routine -->
          <v-card-text class="white--text">
            <v-row>
              <v-col cols="8">
                <h4 class="headline pb-3">Essence of Routine</h4>
                <!-- Vertical Column of muscles used by the routine -->
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
      </v-col>
      <v-col cols="12" sm="4" md="4">

        <!-- Second card -->
        <v-card class="fill-height grey darken-3 white--text">

          <!-- Detailed routine, edit button -->
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Detailed Routine</h3>
            </div>
            <v-spacer />
            <v-btn text class="white--text pa-5 pt-7">
              <v-icon x-large>mdi-pencil-outline</v-icon>
            </v-btn>
          </v-card-title>

          <!-- Number of series -->
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Number of series: {{ series }}</h3>
            </div>
          </v-card-title>

          <!-- Time between series -->
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Time between series: {{ timeBetweenSeries }} seconds</h3>
            </div>
          </v-card-title>

          <!-- List of exercises -->
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Exercises</h3>
            </div>
          </v-card-title>
          <v-card-text class="white--text">
            <v-row>
              <v-col cols="12">
                <v-row class="pb-3" v-for="exercise in exercises" :key="exercise">
                  <v-icon class="ml-3 pr-3" color="primary" x-small>mdi-circle</v-icon>
                  <span class="white--text">{{ exercise.name }}</span>
                  <v-spacer></v-spacer>
                  <span class="white--text pr-2">{{ exercise.duration }}</span>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>

          <!-- Routine information -->
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Routine information</h3>
            </div>
          </v-card-title>
          <v-card-text class="white--text">
            <p>{{ routineInformation }}</p>
          </v-card-text>

          <!-- Button to start the routine -->
          <v-card-actions>
            <v-spacer />
            <v-btn
                color="primary"
                class="white--text"
                to="routine/exercise"
            >
              Start Routine
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
export default {
  name: "DetailedRoutine",
  props: {
    image: {
      type: String,
      default: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZXhlcmNpc2V8ZW58MHx8MHx8&w=1000&q=80"
    },
    routineName: String,
    routineDescription: String,
    amountUsers: Number,
    duration: Number,
    tags: Array,
    muscles: Array,
    progress: {
      type: Number,
      default: 0
    },
    series: Number,
    timeBetweenSeries: Number,
    exercises: Array,
    routineInformation: String
  },
}
</script>

<style scoped>
.progress-indicator {
  color: #FF8754;
}
</style>