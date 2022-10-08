<template>
  <div class="fill-height accent">
    <ToolBar title="Create Routine"/>
    <v-container>
      <v-card dark class="secondary">
        <v-card-title>
          Create Routine
        </v-card-title>
        <v-card-text>
          <v-form class="px-3">
            <v-text-field label="Routine name" v-model="routineName"></v-text-field>
            <v-textarea label="Description" v-model="desc"></v-textarea>
            <v-file-input
                v-model="image"
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
export default {
  name: "FPCreateRoutine",
  components: {ToolBar},
  data: () => ({
    routineName: '',
    desc: '',
    image: "",

  }),
  methods:{
    submit(){
      console.log(this.routineName, this.desc, this.image)
    }
  }
}
</script>

<style scoped>

</style>