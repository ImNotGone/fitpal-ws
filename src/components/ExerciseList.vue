<template>
    <v-dialog v-model="list" max-width="600px">
      <v-card dark class="secondary pa-5">
        <v-row>
          <v-card-title>
            <h2>Exercises</h2>
          </v-card-title>
          <v-spacer/>
          <v-btn class="primary my-auto mx-1" to="/create-exercise">
            Create Exercise
          </v-btn>
        </v-row>
        <v-list class="secondary">
          <v-list-item-group>
            <v-list-item v-for="exercise in exerciseStore.getExercises"
                         :key="exercise.title" @click="submit(exercise.title)">
              <v-list-item-content>
                {{exercise.title}}
              </v-list-item-content>
              <v-list-item-icon>
                <router-link :to="exercise.route">
                  <v-icon>mdi-dots-vertical</v-icon>
                </router-link>
              </v-list-item-icon>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-dialog>
</template>

<script>
import {useExerciseStore} from "@/stores/ExerciseStore";

export default {
  setup(){
    const exerciseStore= useExerciseStore()
    return {exerciseStore}
  },
  name: "ExerciseList",
  methods:{
    submit(title){
      this.$emit('exerciseAdded', title)
    },
  },
  props: {
    value: Boolean
  },
  computed: {
    list: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style scoped>

</style>