<template>
    <div class="trainers">
      <ToolBar title="Trainers"/>
      <TrainerCard trainerName="pepe"  routineAmount="22" rating="4.7" review-amount="36"/>
    </div>
</template>


<script>
import ToolBar from "@/components/ToolBar";
import TrainerCard from "@/components/TrainerCard";
export default {
  components: {
    ToolBar,
    TrainerCard
  }
}
</script>
