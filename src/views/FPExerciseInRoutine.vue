<template>
  <div class="fill-height accent">
    <ToolBar :title="this.routineName + ' -> ' + this.sectionName + ' | ' + this.repsLeft + ' reps left'"/>
    <v-card class="accent pa-5">
    <ExerciseInRoutine v-if="!loading" :exercise-name="exerciseName"
                       :exercise-description="exerciseDescription"
                       :tags="tags"
                       :muscles="tags"
                       :amount="amount"
                       :type="type"
                       :exerciseId="exerciseId"
                       @nextExercise="nextExercise()"
                       @previousExercise="previousExercise()"
                       :next="next"
                       :previous="previous"
    />
    </v-card>
  </div>

</template>

<script>
import ToolBar from "@/components/ToolBar";
import ExerciseInRoutine from "@/components/Detailed/ExerciseInRoutine";
import {useCurrentRoutineStore} from "@/stores/CurrentRoutineStore";

export default {
  name: "FPExerciseInRoutine",
  components: {ExerciseInRoutine, ToolBar},
  data: () => ({
    // Exercise data
    exerciseId: Number,
    exerciseName: String,
    exerciseDescription: String,
    muscles: [],
    tags: [],

    // Exercise data from section
    amount: Number,
    type: String,

    // Section data
    sectionName: String,
    repsLeft: Number,

    // Routine name
    routineName: String,

    // Next and previous information
    next: String,
    previous: String,

    loading: true,
  }),
  async beforeMount() {

    const routineId = this.$route.params.routineId;
    const exerciseOrder = this.$route.params.exerciseOrder;
    const sectionOrder = this.$route.params.sectionOrder;

    // Load Data
    const currentRoutineSore = useCurrentRoutineStore();
    await currentRoutineSore.init(routineId, sectionOrder, exerciseOrder);

    this.routineName = currentRoutineSore.getRoutineName;

   // Exercise data
    this.exerciseId = currentRoutineSore.getCurrentExerciseId;

    this.exerciseName = currentRoutineSore.getCurrentExerciseName

    this.exerciseDescription = currentRoutineSore.getCurrentExerciseDescription
    this.tags = currentRoutineSore.getCurrentExerciseTags
    this.amount = currentRoutineSore.getCurrentExerciseAmount
    this.type = currentRoutineSore.getCurrentExerciseType

    // Section data
    this.sectionName = currentRoutineSore.getCurrentSectionName
    this.repsLeft = currentRoutineSore.currentSectionRepsLeft

    // Next and information
    this.next = currentRoutineSore.willFinishRoutine ? "Finish" :
      currentRoutineSore.willFinishSection ? "Next section" :
      currentRoutineSore.willFinishRepetition ? "Next repetition" : "Next exercise";

    this.previous = currentRoutineSore.startOfRoutine ? "Return" :
      currentRoutineSore.startOfSection ? "Previous section" :
      currentRoutineSore.startOfRepetition ? "Previous repetition" : "Previous exercise";



    this.loading = false;
  },
  methods: {
    nextExercise() {
      if(useCurrentRoutineStore().willFinishRoutine){
        this.$router.push({name: "my-routines"});
      } else{
        useCurrentRoutineStore().nextExercise();
        this.pushAndUpdate();
      }
    },
    previousExercise() {
      if(useCurrentRoutineStore().startOfRoutine){
        this.$router.push({name: "detailed-routine", params: {id: this.$route.params.routineId}});
      } else{
        useCurrentRoutineStore().previousExercise();
        this.pushAndUpdate();
      }
    },
    pushAndUpdate() {
      const currentRoutineStore = useCurrentRoutineStore();

      this.exerciseId = currentRoutineStore.getCurrentExerciseId;

      this.exerciseName = currentRoutineStore.getCurrentExerciseName;

      this.exerciseDescription = currentRoutineStore.getCurrentExerciseDescription;
      this.tags = currentRoutineStore.getCurrentExerciseTags;
      this.amount = currentRoutineStore.getCurrentExerciseAmount;
      this.type = currentRoutineStore.getCurrentExerciseType;

      // Section data
      this.sectionName = currentRoutineStore.getCurrentSectionName;
      this.repsLeft = currentRoutineStore.currentSectionRepsLeft;

      // Next information
      this.next = currentRoutineStore.willFinishRoutine ? "Finish" :
          currentRoutineStore.willFinishSection ? "Next section" :
              currentRoutineStore.willFinishRepetition ? "Next repetition" : "Next exercise";

      this.previous = currentRoutineStore.startOfRoutine ? "Return" :
          currentRoutineStore.startOfSection ? "Previous section" :
              currentRoutineStore.startOfRepetition ? "Previous repetition" : "Previous exercise";

      this.$router.push({
        name: "exercise-in-routine",
        params: {
          routineId: this.$route.params.routineId,
          exerciseOrder: currentRoutineStore.getCurrentExercise,
          sectionOrder: currentRoutineStore.getCurrentSection,
        },
      });
    }
  }
}
</script>

<style scoped>

</style>