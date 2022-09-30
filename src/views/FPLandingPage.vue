<template>
  <div class="landing-page image">
  <v-toolbar app dark class="secondary">
    <v-toolbar-title>
      <router-link to="/landing-page" tag="span" style="cursor: pointer">
        <v-img class="icon" src="@/assets/fitpal-verticallogo.svg"/>
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

    <h1 class="ma-6 white--text">Welcome to your exercise companion</h1>
    <h2 class="ma-6 white--text">Exercise at home today!</h2>

    <v-footer
        class="secondary"
        padless
        absolute
        dark
    >
      <v-row
          justify="center"
          no-gutters
      >
        <v-col
            class="secondary py-4 text-center"
            cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>FitPal</strong>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>


<script>
export default {
  name: "FPLandingPage",
  data(){
    return {
      appTitle: 'Awesome App',
      sidebar: false,
      menuItems: [
        { title: 'Home', path: '/landing-page', icon: 'mdi-home' },
        { title: 'Sign Up', path: '/signup', icon: 'mdi-account-plus' },
        { title: 'Log In', path: '/signin', icon: 'mdi-login-variant' }
      ]
    }
  },
}
</script>

<style scoped>
  .image{
    background-image: url('../assets/background-landingpage.jpg');
    background-size: cover;
    height: 100vh;
  }
  .icon{
    height: 100%;
    width: 70%;
  }
  .max-v-list-height {
    width: 120px;
    overflow-x: auto;
  }
</style>