<template>
  <div class="fill-height accent">
    <ToolBar title="Edit Exercise"/>
    <v-container>
      <v-card dark class="secondary">
        <v-card-title>
          Edit Exercise
        </v-card-title>

        <v-card-text>
          <v-form class="px-3">
            <v-text-field label="Exercise name" v-model="exerciseName"></v-text-field>
            <v-textarea label="Description" v-model="desc"></v-textarea>
            <v-select
                v-model="tagsSelected"
                :items="tags"
                attach
                chips
                label="Tags"
                multiple
            ></v-select>
            <v-file-input
                v-model="video"
                accept="video/mp4"
                placeholder="Insert video"
                prepend-icon="mdi-video"
                label="Video"
            ></v-file-input>
            <v-btn flat class="primary mx-0 mt-3" @click="submit">Submit</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>

</template>

<script>
import ToolBar from "@/components/ToolBar";
import {useExerciseStore} from "@/stores/ExerciseStore";
export default {
  setup(){
    const exerciseStore= useExerciseStore()
    return {exerciseStore}
        //TODO: edit exercise deberia ir a buscar a la store el ejercicio que le corresponde y cargar la info en data
  },
  name: "FPEditExercise",
  components: {ToolBar},
  data: () => ({
    exerciseName: '',
    desc: '',
    tags: ['abs', 'biceps', 'triceps', 'legs', 'chest', 'back'],
    tagsSelected: [],
    video: "",

  }),
  methods:{
    submit(){
      console.log(this.exerciseName, this.desc, this.tagsSelected, this.video)
      //TODO: actualizar el valor dentro de la store con la info modificada de data
    }
  }
}
</script>

<style scoped>

</style>