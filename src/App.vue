<template>
  <v-app>
    <NavBar v-if="!$route.meta.hideNavbar"/>
    <v-content>
        <router-view></router-view>
    </v-content>
    <v-dialog persistent v-model="isOffline" max-width="600px">
      <v-card dark class="secondary pa-5">
        <v-card-title class="justify-center">Error</v-card-title>
        <v-card-text class="justify-center">Connection lost, please restart your connection</v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar';
import { useSecurityStore } from './stores/SecurityStore';
export default {
  name: 'App',

  components: {
    NavBar,
  },
  data: () => ({
    isOffline: !navigator.onLine,

  }),
  methods: {
    updateOnlineStatus() {
        this.isOffline = !navigator.onLine
    },
  },
  async mounted() {
    if(useSecurityStore().isLoggedIn)
        await useSecurityStore().getUser();
  },
  created() {
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);

  },
  props: {
    hideNavbar: Boolean,
  }
};
</script>
