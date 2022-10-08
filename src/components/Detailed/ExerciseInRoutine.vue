<!-- card with the current exercise inside routine -->
<!-- First row is the exercise name -->
<!-- Second row is the exercise tags and a see details text button -->
<!-- Third row is the exercise description -->
<!-- It has a circular timer -->


<template>
  <v-card class="grey darken-3 white--text fill-height">
    <v-row>
      <v-col>
        <!-- Exercise name -->
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ exerciseName }}</h3>
          </div>
        </v-card-title>

        <!-- Exercise tags -->
        <v-card-actions>
          <v-row>
            <v-chip-group column class="ml-4">
              <v-chip v-for="tag in tags" :key="tag" color="primary" text-color="white" small>
                {{ tag }}
              </v-chip>
            </v-chip-group>
            <v-btn text class="white--text pa-5" to="/detailed-exercise" >
              | See details |
            </v-btn>
          </v-row>
        </v-card-actions>

        <!-- Exercise description -->
        <v-card-title primary-title>
          <div>
            <h3 class="headline mt-14">Description</h3>
          </div>
        </v-card-title>
        <v-card-text class="white--text">
          <p>{{ exerciseDescription }}</p>
        </v-card-text>
      </v-col>

      <v-col>
        <!-- TODO: centrar el boton -->
        <v-container  v-if="!done">
          <CircularTimer
              :elapsed="timeElapsed"
              :limit="timeLimit"
          />
          <!-- Pause button or resume button depending on paused variable -->
          <v-card-actions>
            <v-btn
                color="primary"
                class="white--text"
                @click="updateTimer"
                x-large
            >
              {{ paused ? "Resume" : "Pause" }}
            </v-btn>
          </v-card-actions>
        </v-container>
        <v-container v-else>
          <v-card-actions>
            <v-icon color="primary" size="500">mdi-check-circle</v-icon>
          </v-card-actions>

          <!-- Restart button -->
          <v-card-actions>
            <v-btn
                color="primary"
                class="white--text"
                @click="restartTimer"
                x-large
            >
              Restart
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-col>
    </v-row>

    <!-- previous exercise next exercise button-->
    <v-card-actions class="pa-5">
      <v-btn
          color="primary"
          class="white--text"
          x-large>
        <v-icon>mdi-arrow-left</v-icon>
        Previous
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
          color="primary"
          class="white--text"
          x-large
      >
        Next exercise
        <v-icon right>mdi-arrow-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>

</template>

<script>
import CircularTimer from "@/components/CircularTimer";

export default {
  name: "ExerciseInRoutine.vue",
  props: {
    exerciseName: String,
    tags: Array,
    exerciseDescription: String,
    muscles: Array,
  },
  components: {
    CircularTimer
  },
  data() {
    return {
      timeElapsed: 0,
      timerInterval: undefined,
      timeLimit: 5,
      paused: false,
      done: false,
    };

  },
  methods: {
    startTimer() {
      this.timerInterval = setInterval(() => {
        // Stop counting when there is no more time left
        if (++this.timeElapsed === this.timeLimit) {
          clearInterval(this.timerInterval);
          this.done = true;
        }
      }, 1000);
    },
    pauseTimer() {
      clearInterval(this.timerInterval);
    },
    resumeTimer() {
      this.startTimer();
    },
    updateTimer() {
      this.paused = !this.paused;
      if (this.paused) {
        this.pauseTimer();
      } else {
        this.resumeTimer();
      }
    },
    restartTimer() {
      this.timeElapsed = 0;
      this.done = false;
      this.startTimer();
    },
  },
  // Start timer immediately
  mounted() {
    this.startTimer();
  },
}
</script>

<style scoped>

</style>