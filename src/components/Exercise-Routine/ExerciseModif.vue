<template>
  <v-container>
    <v-card dark class="secondary">
      <v-card-title>
        <v-icon large class="mr-4" color="#FF8754" @click="$router.back()">mdi-chevron-left</v-icon>
        {{ (edit ? 'Edit' : 'Create') + ' Exercise' }}
      </v-card-title>

      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field color="#FF8754" label="Exercise name" v-model="exerciseName"
                        :rules="[rules.required, rules.onlyLettersAndSpaces, rules.length(100)]"/>
          <v-textarea color="#FF8754" label="Description" v-model="desc" :rules="[rules.required, rules.length(200)]"/>
          <v-select
              color="#FF8754"
              v-model="tagsSelected"
              :items="tags"
              chips
              label="Tags"
              multiple
          ></v-select>
          <v-text-field
              color="#FF8754"
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
          <v-row class="mt-3 pb-5">
            <v-btn flat class="primary mx-0" @click="submit" :loading="loading">{{
                (edit ? 'Edit' : 'Create')
              }}
            </v-btn>
            <v-spacer></v-spacer>

            <!-- Delete button -->
            <v-btn flat class="error mx-0" v-if="edit" @click="toggleDialog">Delete</v-btn>

            <!-- Dialog to confirm deletion -->
            <v-dialog v-model="showDialog" max-width="600">
              <v-card dark class="secondary">
                <v-card-title class="headline">Are you sure you want to delete this exercise?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="() => this.showDialog = false">Cancel</v-btn>
                  <v-btn color="error" @click="deleteExercise">Delete</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>

        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import {useExerciseStore} from "@/stores/ExerciseStore";
import {Exercise, Video} from "@/api/exercises";
import {videoExists} from "@/lib/validation";

export default {
  setup() {
    const exerciseStore = useExerciseStore()
    return {exerciseStore}
  },

  name: "ExerciseModif",

  props: {
    // Initial values
    edit: Boolean,
    initExerciseName: String,
    initDesc: String,
    initTags: Array,
    initVideo: String,
    videoId: Number,
    id: String,
    pathBack: String,
  },

  data: () => ({
    // Form data
    exerciseName: '',
    desc: '',
    tags: ['Abs', 'Biceps', 'Triceps', 'Legs', 'Chest', 'Back'],
    tagsSelected: [],
    video: '',

    // Form rules
    rules: {
      required: v => !!v || 'This field is required',
      length: (maxLen) => v => ((v || '').length <= maxLen) || `Required less than ${maxLen} characters`,
      onlyLettersAndSpaces: (v) => /^[a-zA-Z ]+$/.test(v) || 'Must contain only letters and spaces'
    },

    // For button loading
    loading: false,

    // Error message
    finished: false,
    error: false,
    errorText: '',
    successText: '',

    // Delete Dialog
    showDialog: false

  }),
  methods: {
    async submit() {

      // Validate Form
      if (!this.$refs.form.validate()) {
        return;
      }

      // If in edition, return if no fields have been changed
      if (this.edit && this.exerciseName === this.initExerciseName && this.desc === this.initDesc && this.tagsSelected === this.initTags && this.video === this.initVideo) {
        return;
      }

      // Button loading animation
      this.loading = true;

      // Check if video exists
      if (this.video && !await videoExists(this.video)) {
        this.error = true;
        this.finished = true;
        this.loading = false;
        this.errorText = 'Video does not exist';
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

      // Create Video object
      const video = (this.video.length === 0 || this.video === this.initVideo) ? null : new Video(
          this.video
      )

      try {
        // Add or edit exercise to store
        if (this.edit) {
          await this.exerciseStore.editExercise(this.id, exercise, video, this.videoId);
        } else {
          await this.exerciseStore.addExercise(exercise, video);
        }

        // Success message
        this.successText = 'Exercise ' + (this.edit? 'edited' : 'created') + ' successfully';

      } catch (e) {

        this.error = true;

        if (e.code === 2) {
          this.errorText = 'Exercise already exists';
        } else if (e.code === 1) { // Should not happen
          this.errorText = 'Invalid data';
        } else {
          this.errorText = 'An error occured, please try again later';
        }
      }

      // Button loading animation
      this.loading = false;

      // Set finished flag
      this.finished = true;

      // Redirect to my exercises
      if (!this.edit) {
        await this.$router.push(this.pathBack);
      }

    },
    toggleDialog() {
      this.showDialog = !this.showDialog;
    },
    async deleteExercise() {
      await this.exerciseStore.deleteExercise(this.id);
      await this.$router.push(this.pathBack);
    }
  },
  beforeMount() {
    // Set initial values
    this.exerciseName = this.initExerciseName;
    this.desc = this.initDesc;
    this.tagsSelected = this.initTags;
    this.video = this.initVideo;
  }
}
</script>

<style scoped>

</style>