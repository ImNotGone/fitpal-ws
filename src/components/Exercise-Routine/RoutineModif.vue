<template>
  <v-container>
    <v-card dark class="secondary">

      <!-- Exercise List Dialog-->
      <ExerciseList v-model="list" @exerciseAdded="createRoutineStore.addExercise($event)"/>

      <v-card-title>
        <v-icon large class="mr-4" color="#FF8754" @click="$router.back()">mdi-chevron-left</v-icon>
        {{ (edit ? 'Edit' : 'Create') + ' Routine' }}
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="routineForm">
          <!-- Name -->
          <v-text-field color="#FF8754" label="Routine name" v-model="createRoutineStore.routineName" :rules="[rules.required, rules.max(100)]"/>

          <!-- Description -->
          <v-textarea color="#FF8754" label="Description" v-model="createRoutineStore.desc" :rules="[rules.required, rules.max(200)]"/>

          <!-- Difficulty -->
          <v-select color="#FF8754" label="Difficulty" v-model="createRoutineStore.difficulty" :items="['Rookie', 'Beginner', 'Intermediate', 'Advanced', 'Expert']" :rules="[rules.required]"/>

          <!-- Photo -->
          <v-text-field
              color="#FF8754"
              v-model="createRoutineStore.image"
              prepend-icon="mdi-camera"
              label="Preview photo"
          />

          <!-- Public -->
          <v-checkbox color="#FF8754" label="Public" v-model="createRoutineStore.isPublic"/>

          <!-- Exercises title -->
          <h1 class="mt-2 mb-2">Exercises</h1>

          <!-- Add Sections & Exercises -->
          <v-tabs vertical class="pa-5" background-color="secondary" ref="tabs" >

            <v-tab v-for="section in createRoutineStore.getSections"
                   :key="section.title"
                   @click="createRoutineStore.setActiveSection(section)"
            >
              {{section.title}}
            </v-tab>

            <v-tab-item class="accent" v-for="section in createRoutineStore.getSections" :key="section.title">
              <v-container class="accent pa-5">
                <v-row>
                  <!-- Amount of series -->
                  <v-text-field color="#FF8754" dark  label="Series" type="number" v-model="section.series" :rules="[rules.required, rules.number(1, 999)]"/>
                  <v-spacer/>
                  <!-- Time between series -->
                  <v-text-field color="#FF8754" dark label="Time between series (seconds)" type="number" v-model="section.rest" :rules="[rules.required]"/>
                  <v-spacer/>

                  <!-- Add exercise Button-->
                  <v-btn class="primary ma-auto" @click="list = !list">Add Exercise</v-btn>
                  <v-spacer/>
                </v-row>
                <v-list class="accent" v-for="exercise in section.exercises"
                        :key="section.title + exercise.id">
                  <v-list-item-content dark>
                    <v-row class="pa-2">
                      <h3 class="white--text pa-3">{{exercise.name}}</h3>
                      <v-row>
                        <v-spacer/>
                        <!-- Select if using reps or time -->
                        <v-select dark v-model="exercise.type" :items="['Reps', 'Time (seconds)']" :rules="[rules.required]"></v-select>
                        <v-spacer/>
                         <!-- Amount of reps or time -->
                        <v-text-field dark label="Amount" type="number" v-model="exercise.amount" :rules="[rules.required]"></v-text-field>
                        <v-spacer/>
                        <v-btn class="primary mr-5 mt-3" @click="createRoutineStore.deleteExercise(section, exercise.id)">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </v-row>
                    </v-row>
                  </v-list-item-content>
                </v-list>
              </v-container>
            </v-tab-item>

          </v-tabs>
          <v-row class="pa-5">
            <v-btn class="primary pa-5 px-3" @click="createRoutineStore.addSection()">
              Add Section
            </v-btn>
            <v-spacer/>
            <v-btn class="primary pa-5 px-3" @click="createRoutineStore.deleteSection()">
              Delete section
            </v-btn>
          </v-row>

          <p
              v-if="finished && error"
              type="error"
              class="mt-3 mb-n1 error--text"
          >
            {{ errorText }}
          </p>
          <p
              v-else-if="finished"
              type="success"
              class="white--text mt-3 mb-n1"
          >
            <v-icon class="mr-2" color="primary">mdi-check</v-icon>
            {{ successText }}
          </p>

          <v-btn flat class="primary mx-2 mt-6" @click="submit">{{ (edit ? 'Edit' : 'Create') }}</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import {useCreateRoutineStore} from "@/stores/CreateRoutineStore";
import ExerciseList from "@/components/ExerciseList";
import {imageExists} from "@/lib/validation";

export default {
  setup(){
    const createRoutineStore = useCreateRoutineStore()
    return {createRoutineStore}
  },
  name: "RoutineModif",
  components: {ExerciseList},
  data: () => ({
    // Dialog
    list: false,

    // Form rules
    rules: {
      required: value => !!value || 'Required.',
      max: (max) => (v) => v.length <= max || `Max ${max} characters`,
      // Converts v to number and checks if it is between min and max
      number: (min, max) => (v) => {
        v = Number(v)
        return v >= min && v <= max || `Must be between ${min} and ${max}`
      }
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

      // Button loading animation
      this.loading = true;

      // Flags
      this.finished = false;
      this.error = false;

      // Check if form is valid
      if(!this.$refs.routineForm.validate()) {
        return;
      }

      // Check if image exists, if it does not return
      if (!await imageExists(this.createRoutineStore.photo)) {
        this.error = true;
        this.finished = true;
        this.loading = false;
        this.errorText = 'Image does not exist';
        return;
      }

      try {
        // Submit
        if(this.edit){
          await this.createRoutineStore.editRoutine(this.$route.params.id);
          this.successText = 'Routine edited successfully';
        } else {
          await this.createRoutineStore.submitRoutine();
          this.successText = 'Routine created successfully';
        }

        await this.$router.push('/my-routines');
      } catch (e) {
        // Error message
        this.error = true;
        console.log(e);
        // TODO: Handle errors
        this.errorText = "An error occurred while creating the routine";
      }

      // Button loading animation
      this.loading = false;
      this.finished = true;
    },
  },
  props: {
    edit: Boolean,
    id: String,
    pathBack: String,
    title: String,
  },
  beforeMount() {
    if(!this.edit)
      this.createRoutineStore.clearRoutine();
  }
}
</script>

<style>
.v-tabs--vertical > .v-window{
  height: 100% !important;
}
</style>