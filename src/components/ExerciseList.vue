<template>
  <div>
  <v-btn class="primary" @click="list=!list">Add Exercise</v-btn>
  <v-dialog v-model="list" max-width="600px">
    <v-card dark class="secondary pa-5">
      <v-row>
        <v-card-title>
          <h2>Exercises</h2>
        </v-card-title>
        <v-spacer/>
        <v-btn class="primary" to="/create-exercise">
          Create Exercise
        </v-btn>
      </v-row>
      <v-list class="secondary">
        <v-list-item-group>
          <v-list-item v-for="exercise in exercises"
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
  </div>
</template>

<script>
export default {
  name: "ExerciseList",
  data: () => ({
    list: false,
    exercises:[
      {title: 'Exercise Title 1', route:'/detailed-exercise'},
      {title: 'Exercise Title 2', route:'/detailed-exercise'},
      {title: 'Exercise Title 3', route:'/detailed-exercise'}
    ]

  }),
  methods:{
    submit(title){
      this.$emit('exerciseAdded', title)
      this.list=false

    }
  }
}
</script>

<style scoped>

</style>