<template>
  <v-toolbar dark flat app class="toolbar secondary">
    <v-app-bar-nav-icon @click="sendMessage()"></v-app-bar-nav-icon>
    <v-toolbar-title class="headline">
      <span class="font-weight-medium">{{ title }}</span>
    </v-toolbar-title>
    <v-spacer/>
  </v-toolbar>
</template>

<script>
export default {
  data: () => ({
    burger: true,
  }),
  name: "ToolBar",
  props: {
    title: String,
  },
  methods:{
    sendMessage(){
      this.burger=!this.burger;
      this.$root.$emit("fromToolBar", this.burger);
    }
  }
}
</script>

<style scoped>
  .toolbar{

  }
</style>