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
    exerciseId: 0,
    exerciseName: "Push-ups",
    exerciseDescription: "A push-up is a common calisthenics exercise beginning from the prone position. By raising and lowering the body using the arms, push-ups exercise pectoral muscles, triceps, and anterior deltoids, with ancillary benefits to the rest of the deltoids, serratus anterior, coracobrachialis, and the midsection.",
    muscles: ["Pectoral muscles", "Triceps", "Anterior deltoids"],
    tags: ["Push-ups", "Cardio", "Strength"],
    video: "https://www.youtube.com/embed/IODxDxX7oi4",

    // Exercise data from section
    amount: 10,
    type: "reps",

    // Section data
    sectionName: "Chest day",
    repsLeft: 0,

    // Routine name
    routineName: "Chest day",

    // Next information
    next: String,

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

    // Next information
    this.next = currentRoutineSore.willFinishRoutine ? "Finish" :
      currentRoutineSore.willFinishSection ? "Next section" :
      currentRoutineSore.willFinishRepetition ? "Next repetition" : "Next exercise";


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
      useCurrentRoutineStore().previousExercise();
      this.pushAndUpdate();
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