<template>
  <v-dialog
      v-model="dialog"
      width="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="primary"
          v-bind="attrs"
          v-on="on"
          class="pa-5"
      >
        Rate Routine
      </v-btn>
    </template>
    <v-card
        dark class="secondary elevation-16 mx-auto"
    >
      <v-card-title class="text-h5">
        Rate this routine
      </v-card-title>
      <v-card-text>
        If you enjoy using this routine, please take a few seconds to rate your experience with it. It really helps!

        <div class="text-center mt-12">
          <v-rating
              v-model="rating"
              color="yellow darken-3"
              background-color="grey darken-1"
              empty-icon="$ratingFull"
              half-increments
              hover
              large
          ></v-rating>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="justify-space-between">
        <v-btn text @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn
            color="primary"
            text
            @click="rateRoutine()"
        >
          Rate Now
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {Review, RoutineApi} from "@/api/routines";

export default {
  name: "RatingDialog",
  data() {
    return {
      rating: 0,
      dialog: false,
    };
  },
  methods:{
    async rateRoutine(){
      const rev = new Review(this.rating * 2, '');
      await RoutineApi.addRoutineReview(this.id, rev);
      this.dialog = false;
    },
  },
  props: {
    id: {
      type: String,
      required: true,
    }
  },
}
</script>

<style scoped>

</style>