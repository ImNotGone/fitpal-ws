<template>
  <div class="fill-height accent">
    <ToolBar title="Edit Exercise"/>
    <ExerciseModif v-if="loaded" :path-back="'/exercise/' + this.$route.params.id" :edit="true"
                   :init-desc="exerciseDescription" :init-exercise-name="exerciseName"
                   :init-tags="tags" :init-video="video" :id="this.$route.params.id" :video-id="videoId"/>
  </div>

</template>

<script>
import ToolBar from "@/components/ToolBar";
import ExerciseModif from "@/components/Exercise-Routine/ExerciseModif";
import {useExerciseStore} from "@/stores/ExerciseStore";

export default {
  name: "FPCreateExercise",
  components: {ToolBar, ExerciseModif},

  props: {
    returnPath: String
  },

  data: () => ({
    video: '',
    videoId: Number,
    exerciseName: '',
    exerciseDescription: '',
    tags: [],
    loaded: false,
  }),
  async beforeMount() {
    const store = useExerciseStore();

    // Get exercise id from url
    const exerciseId = Number(this.$route.params.id);

    // If invalid id, redirect to my exercises
    if (isNaN(exerciseId))
      await this.$router.push('/my-exercises');

    await store.updateExercises();

    // If exercise doesn't exist, redirect to my exercises
    if (!store.containsExerciseWithId(exerciseId))
      await this.$router.push('/my-exercises');


    this.exerciseName = store.getExerciseName(exerciseId);
    this.exerciseDescription = store.getExerciseDetail(exerciseId);

    this.tags = store.getExerciseMetadata(exerciseId)?.tags;
    // TODO: Get muscles from exercise metadata and amount of routines from exercise metadata
    // this.amountRoutines
    this.muscles = store.getExerciseMetadata(exerciseId)?.tags;
    this.video = store.getExerciseImage(exerciseId);
    this.videoId = store.getExerciseImageId(exerciseId);

    this.loaded = true;
  }
}
</script>