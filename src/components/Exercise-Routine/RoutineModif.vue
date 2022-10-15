<template>
  <v-container>
    <v-card dark class="secondary">
      <v-card-title>
        <v-icon large class="mr-4" color="#FF8754" @click="$router.back()">mdi-chevron-left</v-icon>
        {{ title + ' Routine' }}
      </v-card-title>
      <v-card-text>
        <v-form class="px-3">
          <v-text-field color="#FF8754" label="Routine name" v-model="createRoutineStore.getRoutineName"></v-text-field>
          <v-textarea color="#FF8754" label="Description" v-model="createRoutineStore.getDesc"></v-textarea>
          <v-tabs vertical class="pa-5" background-color="secondary">

            <v-tab v-for="section in createRoutineStore.getSections"
                   :key="section.title">
              {{section.title}}
            </v-tab>

            <v-tab-item class="accent" v-for="section in createRoutineStore.getSections" :key="section.title">
              <v-container class="accent pa-5">
                <v-row>
                  <v-text-field color="#FF8754" dark counter-value="0" label="Series" v-model="section.series"></v-text-field>
                  <v-spacer/>
                  <v-text-field color="#FF8754" dark label="Time between series" v-model="section.rest"></v-text-field>
                  <v-spacer/>
                  <ExerciseList v-model="list" @exerciseAdded="createRoutineStore.addExercise(section, $event)"/>
                  <v-btn class="primary ma-auto" @click="list = !list">Add Exercise</v-btn>
                  <v-spacer/>
                  <v-btn class="primary ma-auto" @click="createRoutineStore.deleteExercise(section)">Delete Exercise</v-btn>
                </v-row>
                <v-list class="accent" v-for="exercise in section.exercises"
                        :key="exercise.name">
                  <v-list-item-content dark>
                    <v-row class="pa-2">
                      <h3 class="white--text pa-3">{{exercise.name}}</h3>
                      <v-row>
                        <v-spacer/>
                        <v-text-field dark counter-value="0" label="Reps" v-model="exercise.reps"></v-text-field>
                        <v-spacer/>
                        <v-text-field dark label="Time" v-model="exercise.time"></v-text-field>
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

          <v-btn flat class="primary mx-0 mt-3" @click="submit">{{ title }}</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import {useCreateRoutineStore} from "@/stores/CreateRoutineStore";
import ExerciseList from "@/components/ExerciseList";

export default {
  setup(){
    const createRoutineStore= useCreateRoutineStore()
    return {createRoutineStore}
  },
  name: "RoutineModif",
  components: {ExerciseList},
  data: () => ({
    list: false,
  }),
  methods:{
    submit(){

    },
  },
  props: {
    title: String,
  }
}
</script>

<style>
.v-tabs--vertical > .v-window{
  height: 100% !important;
}
</style>