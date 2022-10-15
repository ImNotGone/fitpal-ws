<template>
      <v-container>
        <v-card dark class="secondary">
          <v-card-title>
            <v-icon large class="mr-4" @click="$router.back()">mdi-chevron-left</v-icon>
            {{ title + ' Exercise' }}
          </v-card-title>

          <v-card-text>
            <v-form class="px-3" ref="form">
              <v-text-field label="Exercise name" v-model="exerciseName" :rules="[rules.required, rules.onlyLettersAndSpaces, rules.length(100)]" ></v-text-field>
              <v-textarea label="Description" v-model="desc" :rules="[rules.required, rules.length(200)]"></v-textarea>
              <v-select
                  v-model="tagsSelected"
                  :items="tags"
                  chips
                  label="Tags"
                  multiple
              ></v-select>
              <v-text-field
                  v-model="video"
                  prepend-icon="mdi-video"
                  label="Video"
              ></v-text-field>

              <p
                  v-if="finished && error"
                  type="error"
                  class="mt-3 error--text"
              >
                {{ errorText }}
              </p>
              <p
                  v-else-if="finished"
                  type="success"
                  class="white--text"
              >
                <v-icon class="mr-2" color="primary">mdi-check</v-icon>
                {{ successText }}
              </p>

              <v-btn flat class="primary mx-0 mt-3" @click="submit" :loading="loading">{{ title }}</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-container>
</template>

<script>
import {useExerciseStore} from "@/stores/ExerciseStore";
import {Exercise, Image} from "@/api/exercises";
import {imageExists} from "@/lib/validation";

export default {
  setup(){
    const exerciseStore= useExerciseStore()
    return {exerciseStore}
  },

  name: "ExerciseModif",
  data: () => ({
    pathBack: '/my-exercises',

    // Form data
    exerciseName: '',
    desc: '',
    tags: ['Abs', 'Biceps', 'Triceps', 'Legs', 'Chest', 'Back'],
    tagsSelected: [],
    video: "",

    // Form rules
    rules: {
      required: v => !!v || 'This field is required',
      length: (maxLen) => v => ((v || '').length <= maxLen) || `Required less than ${maxLen} characters`,
      onlyLettersAndSpaces:  (v) => /^[a-zA-Z ]+$/.test(v) || 'Must contain only letters and spaces'
    },

    // For button loading
    loading: false,

    // Error message
    finished: false,
    error: false,
    errorText: '',
    successText: '',

  }),
  methods:{
    async submit(){

      // Validate Form
      if (!this.$refs.form.validate()) {
        return;
      }

      // Button loading animation
      this.loading = true;

      // Check if image exists
      if (this.video.length > 0 && !await imageExists(this.video)) {
        this.error = true;
        this.finished = true;
        this.loading = false;
        this.errorText = 'Image does not exist';
        return;
      }

      // Flags
      this.finished = false;
      this.error = false;

      // Metadata for tags
      const metadata = {
        tags: this.tagsSelected
      };

      // Create new exercise object
      const exercise = new Exercise(
          this.exerciseName,
          this.desc,
          "exercise",
          metadata
      )

      // Create Image object
      const image = this.video.length === 0 ? null : new Image(
          this.video
      )

      try {
        // Add exercise to store
        await this.exerciseStore.addExercise(exercise, image);

        // Success message
        this.successText = 'Exercise created successfully';

      } catch (e) {

        this.error = true;

        if (e.code === 2) {
          this.errorText = 'Exercise already exists';
        } else if (e.code === 1){ // Should not happen
          this.errorText = 'Invalid data';
        } else {
          this.errorText = 'An error occured ,please try again later';
        }
      }

      // Button loading animation
      this.loading = false;

      // Set finished flag
      this.finished = true;

      // Redirect to my exercises
      await this.$router.push(this.pathBack);
    }
  },


  props: {
    title: String,
  }
}
</script>

<style scoped>
</style>