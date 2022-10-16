<template>
  <div class="fill-height accent">
    <ToolBar title="Edit Routine"/>
    <RoutineModif v-if="loaded" title="Edit" :path-back="'/routine/' + this.$route.params.id" :edit="true" :id="this.$route.params.id"/>
  </div>
</template>

<script>
import ToolBar from "@/components/ToolBar";
import RoutineModif from "@/components/Exercise-Routine/RoutineModif";
import {useCreateRoutineStore} from "@/stores/CreateRoutineStore";

export default {
  name: "FPCreateRoutine",
  components: {ToolBar, RoutineModif},

  props: {
    returnPath: String
  },
  setup(){
    const createRoutineStore= useCreateRoutineStore()
    return {createRoutineStore}
  },
  data: () => ({
    loaded: false,
  }),
  async beforeMount() {
      await this.createRoutineStore.fetchRoutine(this.$route.params.id);
      this.loaded = true;
  }
}
</script>