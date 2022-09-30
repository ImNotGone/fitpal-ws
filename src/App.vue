<template>
  <v-app>
    <NavBar v-if="!$route.meta.hideNavbar"/>
    <v-content>
        <router-view></router-view>
    </v-content>

  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar';

export default {
  name: 'App',

  components: {
    NavBar,
  },

  data: () => ({
    //
  }),

  props: {
    hideNavbar: Boolean,
  }
};
</script>
