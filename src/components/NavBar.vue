<template>
  <nav>
    <v-navigation-drawer app v-model="burger" class="menus secondary">
      <v-toolbar-title class="mb-5">
        <v-img :aspect-ratio="16/9" src="@/assets/fitpal-logo.svg"/>
      </v-toolbar-title>

      <v-card
          dark
          class="list secondary"
          flat
      >
        <v-list>
          <v-list-item-group>
            <v-list-item
                v-for="item in primaryItems"
                :key="item.title" :to="item.route"
                class="menus my-3"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon" class="menus"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.title" class="menus mr-14"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>

      <template v-slot:append>
        <div class="pb-5 px-2">
          <v-btn block flat color="grey" @click="signOut">
            <v-icon left>mdi-exit-to-app</v-icon>
            <span>Sign Out</span>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { useSecurityStore } from '@/stores/SecurityStore';
import { mapActions } from 'pinia';

export default {
  data: () => ({
    expand: false,
    burger: true,
    primaryItems: [
      {title: 'Exercises', icon: 'mdi-dumbbell', route: '/my-exercises'},
      {title: 'Routines', icon: 'mdi-gymnastics', route: '/my-routines'},
      {title: 'Explore', icon: 'mdi-weight-lifter', route: '/exp-routines'},
      {title: 'Profile', icon: 'mdi-account', route: '/profile'},
    ],
  }),
  name: "NavBar",
  mounted() {
    this.$root.$on("fromToolBar", (msg) => {
      this.burger = msg;
    });
  },
  methods: {
    ...mapActions(useSecurityStore, {
        $signOut: 'logout'
    }),
    async signOut() {
        await this.$signOut()
        this.$router.replace({path: "/landing-page"})
    }
  }
}
</script>

<style scoped>
.menus {
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: lightgray;
}
.list .v-list-item-group .v-list-item--active {
  color: #FF8754;
  background-color: #353535;
}
</style>
