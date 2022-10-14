<template>
  <v-toolbar dark flat app class="toolbar secondary">
    <v-app-bar-nav-icon @click="sendMessage()"></v-app-bar-nav-icon>
    <v-toolbar-title class="headline">
      <span class="font-weight-medium">{{ title }}</span>
    </v-toolbar-title>
    <v-spacer/>
    <router-link :to="pathProfile">
      <v-avatar class="mr-3">
        <img :src="securityStore.user.avatarUrl" alt="profile picture">
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
    ...mapActions(useSecurityStore, {
      $getUser: 'getUser',
    }),
    sendMessage(){
      this.burger=!this.burger;
      this.$root.$emit("fromToolBar", this.burger);
    }
  },
  async beforeCreate() {
    useSecurityStore().init()
    if(!useSecurityStore().isLoggedIn) {
        this.$router.replace({path: '/login'})
    }
    await this.$getUser()

  }
}
</script>

<style scoped>

</style>
