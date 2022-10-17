<!-- Detailed view of a routine, it has 1 cards -->
<!-- First row is an image of the routine and a bookmark button -->
<!-- Second row is the routine name -->
<!-- Third row is the routine tags -->
<!-- Fourth row is  a progress bar & the amount of users that used the routine with the routines duration -->
<!-- Fifth row is the routines description -->
<!-- Sixth row is the muscles used by the routine-->

<template>
        <v-card class="secondary white--text">
          <!-- Image of the routine -->
          <v-img
              class="white--text align-end rounded-lg"
              aspect-ratio="2.75"
              :src="image"
          />

          <!-- Routine name, bookmark button -->
          <v-card-title primary-title>
            <h3 class="headline mb-n5">{{ routineName }}</h3>
            <v-spacer/>
            <RatingDialog :id="id"/>
            <v-btn v-if="canEdit" class="primary pa-5 ml-5" :to="'/edit-routine/' + id">Edit routine</v-btn>
          </v-card-title>

          <!-- Routine tags -->
          <v-card-actions>
            <v-chip-group column class="ml-2">
              <v-chip v-for="tag in tags" :key="tag" color="primary" text-color="white" small>
                {{ tag }}
              </v-chip>
            </v-chip-group>
          </v-card-actions>

          <!-- Amount of users that used the routine and the routines duration -->
          <!-- Icon amount Routines -->
          <v-card-title primary-title>
              <h3 class="headline mb-n3">Rating: </h3>
          </v-card-title>

          <v-rating
              :value="rating"
              color="primary"
              class="ml-1 mb-2"
              background-color="grey"
              empty-icon="$ratingFull"
              half-increments
              hover
              large
              readonly
          />

          <!-- Routine description -->
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Description</h3>
            </div>
          </v-card-title>
          <v-card-text class="white--text">
            <p>{{ routineDescription }}</p>
          </v-card-text>

          <!-- Number of sections -->
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0 ml-1">Number of sections: {{ sections }}</h3>
            </div>
          </v-card-title>

          <v-card-actions class="justify-lg-end">
            <v-spacer/>
            <v-btn
                absolute
                bottom
                x-large
                color="primary"
                class="white--text mr-3"
                :to="'/routine/' + this.$route.params.id + '/section/1/exercise/1'"
            >
              Start Routine
            </v-btn>
          </v-card-actions>
        </v-card>
</template>

<script>
import RatingDialog from "@/components/RatingDialog";

export default {
  components: {RatingDialog},
  name: "DetailedRoutine",
  props: {
    image: {
      type: String,
      default: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZXhlcmNpc2V8ZW58MHx8MHx8&w=1000&q=80"
    },
    routineName: String,
    routineDescription: String,
    duration: Number,
    tags: Array,
    muscles: Array,
    sections: Number,
    id: String,
    rating: Number,
    canEdit: Boolean,
  },
}
</script>
