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
            <v-btn text class="white--text pa-5" :to="'/exercise/' + exerciseId">
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
        <v-container v-if="!done && type === 'duration'">
          <CircularTimer
              :elapsed="timeElapsed"
              :limit="amount"
          />
          <!-- Pause button or resume button depending on paused variable -->
          <v-card-actions>
            <v-btn
                color="primary"
                class="white--text"
                @click="updateTimer"
                x-large
            >
              {{ started ? (paused ? "Resume" : "Pause") : "Start" }}
            </v-btn>
          </v-card-actions>
        </v-container>
        <v-container v-else-if="type === 'duration'">
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
        <!-- Show the number of repetitions -->
        <v-card-title primary-title v-else>
          <div>
            <h1 class="mb-0 reps mt-16">x{{ amount }} Reps</h1>
          </div>
        </v-card-title>
      </v-col>
    </v-row>

    <!-- previous exercise next exercise button-->
    <v-card-actions class="pa-5">
      <v-btn
          color="primary"
          class="white--text"
          x-large
          @click="previousExercise"
          :disabled="started && !done"
      >
        <v-icon>mdi-arrow-left</v-icon>
        {{ previous }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
          color="primary"
          class="white--text"
          x-large
          @click="nextExercise"
          :disabled="started && !done"
      >
        {{ next }}
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
    exerciseId: Number,
    exerciseName: String,
    tags: Array,
    exerciseDescription: String,
    muscles: Array,
    amount: Number,
    type: String,
    next: String,
    previous: String,
  },
  components: {
    CircularTimer
  },
  data() {
    return {
      timeElapsed: 0,
      timerInterval: undefined,
      paused: true,
      done: false,
      started: false,
    };

  },
  methods: {
    startTimer() {
      this.timerInterval = setInterval(() => {
        // Stop counting when there is no more time left
        if (++this.timeElapsed === this.amount) {
          clearInterval(this.timerInterval);
          this.done = true;
        }
      }, 1000);
    },
    pauseTimer() {
      clearInterval(this.timerInterval);
    },
    resumeTimer() {
      this.started = true;
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
    nextExercise() {
      this.$emit("nextExercise");
    },
    previousExercise() {
      this.$emit("previousExercise");
    },
  },
}
</script>

<style scoped>
.reps {
  font-size: 80px;
  text-align: center;
}
</style>