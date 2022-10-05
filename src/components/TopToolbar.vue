<template>
  <v-toolbar app dark class="secondary">
    <v-toolbar-title>
      <router-link to="/landing-page" tag="span" style="cursor: pointer">
        <v-img class="icon" src="@/assets/fitpal-horizontallogo.svg"/>
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-list-item
          flat
          class="max-v-list-height"
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
        <v-icon left dark>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-list-item>
    </v-toolbar-items>
  </v-toolbar>

</template>

<script>
export default {
  name: "TopToolbar",
  data(){
    return {
      appTitle: 'Awesome App',
      sidebar: false,
      menuItems: [
        { title: 'Home', path: '/landing-page', icon: 'mdi-home' },
        { title: 'Sign Up', path: '/signup', icon: 'mdi-account-plus' },
        { title: 'Log In', path: '/login', icon: 'mdi-login-variant' }
      ]
    }
  },
}
</script>

<style scoped>
.icon{
  height: 100%;
  width: 200px;
}
.max-v-list-height {
  width: 120px;
  overflow-x: auto;
}
</style>