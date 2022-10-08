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
            <v-tabs vertical class="pa-5" background-color="secondary">

              <v-tab>
                Warmup Section
              </v-tab>

              <v-tab v-for="section in sections"
                     :key="section.title">
                {{section.title}}
              </v-tab>

              <v-tab>
                Cooldown Section
              </v-tab>

              <v-tab-item class="accent">
                <v-container class="accent pa-5">
                  <v-row>
                    <v-text-field dark counter-value="0" label="Series" v-model="warmup.series"></v-text-field>
                    <v-spacer/>
                    <v-text-field dark label="Time between series" v-model="warmup.rest"></v-text-field>
                    <v-spacer/>
                    <v-btn class="primary">add exercise</v-btn>
                    <v-spacer/>
                    <v-btn class="primary">delete exercise</v-btn>
                  </v-row>
                  <v-list class="accent" v-for="exercise in warmup.exercises"
                          :key="exercise.name">
                    <v-list-item-content v-text="exercise.name">
                      <v-row>
                        <v-text-field dark counter-value="0" label="Reps"></v-text-field>
                        <v-spacer/>
                        <v-text-field dark label="Time"></v-text-field>
                      </v-row>
                    </v-list-item-content>
                  </v-list>
                </v-container>
              </v-tab-item>

              <v-tab-item v-for="section in sections"
                          :key="section.title">
                <v-container class="accent pa-5">
                  <v-row>
                    <v-text-field dark counter-value="0" label="Series"></v-text-field>
                    <v-spacer/>
                    <v-text-field dark label="Time between series" ></v-text-field>
                    <v-spacer/>
                    <v-btn class="primary">add exercise</v-btn>
                    <v-spacer/>
                    <v-btn class="primary">delete exercise</v-btn>
                  </v-row>
                  <v-list class="accent" v-for="exercise in cooldown.exercises"
                          :key="exercise.name">
                    <v-list-item-content v-text="exercise.name">
                      <v-row>
                        <v-text-field dark counter-value="0" label="Reps"></v-text-field>
                        <v-spacer/>
                        <v-text-field dark label="Time"></v-text-field>
                      </v-row>
                    </v-list-item-content>
                  </v-list>
                </v-container>
              </v-tab-item>

              <v-tab-item>
                <v-container class="accent pa-5">
                  <v-row>
                    <v-text-field dark counter-value="0" label="Series" v-model="cooldown.series"></v-text-field>
                    <v-spacer/>
                    <v-btn class="primary">add exercise</v-btn>
                    <v-spacer/>
                    <v-btn class="primary">delete exercise</v-btn>
                  </v-row>
                  <v-list class="accent" v-for="exercise in cooldown.exercises"
                          :key="exercise.name">
                    <v-list-item-content v-text="exercise.name">
                      <v-row>
                        <v-text-field dark counter-value="0" label="Reps"></v-text-field>
                        <v-spacer/>
                        <v-text-field dark label="Time"></v-text-field>
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
    warmup:{
      series:'',
      rest:'',
      exercises:[]
    },
    sections: [
      {title:'Section 1',
        series:'',
        rest:'',
        exercises:[]
      }
    ],
    cooldown:{
      series:'',
      exercises:[]
    },
    numSect: 1,

  }),
  methods:{
    submit(){
      console.log(this.routineName, this.desc, this.image)
    },
    addSection(){
      this.numSect=this.numSect +1;
      this.sections.push({title:'Section ' + this.numSect, rest: '', series: '', exercises: []});
    },
    deleteSection(){
      if(this.numSect>1){
        this.sections.pop();
        this.numSect=this.numSect -1;
      }
    }
  }
}
</script>

<style scoped>

</style>