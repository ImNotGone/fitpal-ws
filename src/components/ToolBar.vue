<template>
  <v-toolbar dark flat app class="toolbar secondary">
    <v-app-bar-nav-icon @click="sendMessage()"></v-app-bar-nav-icon>
    <v-toolbar-title class="headline">
      <span class="font-weight-medium">{{ title }}</span>
    </v-toolbar-title>
    <v-spacer/>
    <router-link :to="pathProfile">
      <v-avatar class="mr-3">
        <img :src="securityStore.avatarUrl" alt="profile picture">
      </v-avatar>
    </router-link>
  </v-toolbar>
</template>

<script>
import { useSecurityStore } from "@/stores/SecurityStore";

export default {
  data: () => ({
    pathProfile: '/profile',
    burger: true,
  }),
  name: "ToolBar",
  props: {
    title: String,
  },
  setup() {
    const securityStore = useSecurityStore()
    return {securityStore}
  },
  methods:{
    sendMessage(){
      this.burger=!this.burger;
      this.$root.$emit("fromToolBar", this.burger);
    }
  },
}
</script>

<style scoped>

</style>
