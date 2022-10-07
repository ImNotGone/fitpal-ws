<template>
  <v-toolbar dark flat app class="toolbar secondary">
    <v-app-bar-nav-icon @click="sendMessage()"></v-app-bar-nav-icon>
    <v-toolbar-title class="headline">
      <span class="font-weight-medium">{{ title }}</span>
    </v-toolbar-title>
    <v-spacer/>
    <router-link :to="pathSettings">
      <v-avatar class="mr-3">
        <img :src="profilePicture" alt="profile picture">
      </v-avatar>
    </router-link>
  </v-toolbar>
</template>

<script>
export default {
  data: () => ({
    pathSettings: '/settings',
    burger: true,
  }),
  name: "ToolBar",
  props: {
    title: String,
    profilePicture: {
      type: String,
      default: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
    }
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

</style>