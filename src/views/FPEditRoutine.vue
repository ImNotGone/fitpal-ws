<template>
  <div class="fill-height accent">
    <ToolBar title="Edit Routine"/>
    <v-container>
      <v-card dark class="secondary">
        <v-card-title>
          Edit Routine
        </v-card-title>
        <v-card-text>
          <v-form class="px-3">
            <v-text-field label="Routine name" v-model="createRoutineStore.routineName"></v-text-field>
            <v-textarea label="Description" v-model="createRoutineStore.desc"></v-textarea>
            <v-tabs vertical class="pa-5" background-color="secondary">

              <v-tab>
                Warmup Section
              </v-tab>

              <v-tab v-for="section in createRoutineStore.sections"
                     :key="section.title">
                {{section.title}}
              </v-tab>

              <v-tab>
                Cooldown Section
              </v-tab>

              <v-tab-item class="fill-height accent">
                <v-container class="accent pa-5">
                  <v-row>
                    <v-text-field dark counter-value="0" label="Series" v-model="createRoutineStore.warmup.series"></v-text-field>
                    <v-spacer/>
                    <v-text-field dark label="Time between series" v-model="createRoutineStore.warmup.rest"></v-text-field>
                    <v-spacer/>
                    <ExerciseList @exerciseAdded="exerciseAddedWarmup($event)"/>
                    <v-spacer/>
                    <v-btn class="primary" @click="warmupDeleteExercise">delete exercise</v-btn>
                  </v-row>
                  <v-list class="accent" v-for="exercise in createRoutineStore.warmup.exercises"
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

              <v-tab-item v-for="section in createRoutineStore.sections"
                          :key="section.title">
                <v-container class="accent pa-5">
                  <v-row>
                    <v-text-field dark counter-value="0" label="Series"></v-text-field>
                    <v-spacer/>
                    <v-text-field dark label="Time between series" ></v-text-field>
                    <v-spacer/>
                    <ExerciseList @exerciseAdded="section.exercises.push({name:$event, reps:'', time:''})"/>
                    <v-spacer/>
                    <v-btn class="primary" @click="section.exercises.pop()">delete exercise</v-btn>
                  </v-row>
                  <v-list class="accent" v-for="exercise in section.exercises"
                          :key="exercise.name">
                    <v-list-item-content>
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

              <v-tab-item>
                <v-container class="accent pa-5">
                  <v-row>
                    <v-text-field dark counter-value="0" label="Series" v-model="createRoutineStore.cooldown.series"></v-text-field>
                    <v-spacer/>
                    <ExerciseList @exerciseAdded="exerciseAddedCooldown($event)"/>
                    <v-spacer/>
                    <v-btn class="primary" @click="cooldownDeleteExercise">delete exercise</v-btn>
                  </v-row>
                  <v-list class="accent" v-for="exercise in createRoutineStore.cooldown.exercises"
                          :key="exercise.name">
                    <v-list-item-content>
                      <v-row class="pa-2">
                        <h3 class="white--text pa-3">{{exercise.name}}</h3>
                        <v-row>
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
              <v-btn class="primary pa-5 px-3" @click="addSection">
                Add Section
              </v-btn>
              <v-spacer/>
              <v-btn class="primary pa-5 px-3" @click="deleteSection">
                Delete section
              </v-btn>
            </v-row>

            <v-file-input
                v-model="createRoutineStore.image"
                accept="image/png, image/jpeg, image/bmp, image/svg"
                placeholder="Insert image"
                prepend-icon="mdi-camera"
                label="Image"
            ></v-file-input>
            <v-btn flat class="primary mx-0 mt-3" @click="submit">Create</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import ToolBar from "@/components/ToolBar";
import ExerciseList from "@/components/ExerciseList";
import {useCreateRoutineStore} from "@/stores/CreateRoutineStore";

export default {
  setup(){
    const createRoutineStore= useCreateRoutineStore()
    return {createRoutineStore}
  },
  name: "FPEditRoutine",
  components: {ToolBar, ExerciseList},

  methods:{
    submit(){
      console.log(this.routineName, this.desc, this.image, this.warmup, this.sections, this.cooldown)
      this.createRoutineStore.$reset();
    },
    addSection(){
      this.createRoutineStore.numSect=this.createRoutineStore.numSect +1;
      this.createRoutineStore.sections.push({title:'Section ' + this.createRoutineStore.numSect, rest: '', series: '', exercises: []});
    },
    deleteSection(){
      if(this.createRoutineStore.numSect>1){
        this.createRoutineStore.sections.pop();
        this.createRoutineStore.numSect=this.createRoutineStore.numSect -1;
      }
    },
    exerciseAddedWarmup(name){
      this.createRoutineStore.warmup.exercises.push({name:name, reps:'', time:''})
    },
    exerciseAddedCooldown(name){
      this.createRoutineStore.cooldown.exercises.push({name:name, reps:'', time:''})
    },
    warmupDeleteExercise(){
      this.createRoutineStore.warmup.exercises.pop();
    },
    cooldownDeleteExercise(){
      this.createRoutineStore.cooldown.exercises.pop();
    }
  }
}
</script>

<style scoped>

</style>