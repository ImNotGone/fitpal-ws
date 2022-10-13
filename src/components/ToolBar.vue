<template>
  <v-toolbar dark flat app class="toolbar secondary">
    <v-app-bar-nav-icon @click="sendMessage()"></v-app-bar-nav-icon>
    <v-toolbar-title class="headline">
      <span class="font-weight-medium">{{ title }}</span>
    </v-toolbar-title>
    <v-spacer/>
    <router-link :to="pathProfile">
      <v-avatar class="mr-3">
        <img :src="profilePicture" alt="profile picture">
      </v-avatar>
    </router-link>
  </v-toolbar>
</template>

<script>
import { useSecurityStore } from "@/stores/SecurityStore";
import { mapActions } from "pinia";

export default {
  data: () => ({
    pathProfile: '/profile',
    burger: true,
    profilePicture: {
        type: String,
        default: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
    }
  }),
  name: "ToolBar",
  props: {
    title: String,
  },
  methods:{
    ...mapActions(useSecurityStore, {
      $getUser: 'getUser',
    }),
    sendMessage(){
      this.burger=!this.burger;
      this.$root.$emit("fromToolBar", this.burger);
    }
  },
  async created() {
    const user = await this.$getUser()
    this.profilePicture = user.avatarUrl
  }
}
</script>

<style scoped>

</style>
