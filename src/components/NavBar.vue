<template>
  <nav>
    <v-app>
    <v-navigation-drawer app class="menus secondary">
      <v-toolbar-title class="mb-5">
        <v-img :aspect-ratio="16/9" src="@/assets/fitpal-logo.svg"></v-img>
      </v-toolbar-title>

      <v-btn x-large block plain class="white--text" @click="expand = !expand">
        <v-icon left>
          mdi-book-open-variant
        </v-icon>
        <span>Routines</span>
        <v-icon right v-show="!expand">mdi-chevron-down</v-icon>
        <v-icon right v-show="expand">mdi-chevron-up</v-icon>
      </v-btn>
      <v-expand-transition>
        <v-card class="submenu secondary" v-show="expand">
          <v-btn plain block class="mt-1 white--text" v-for="routineMenu in routinesMenu" :key="routineMenu.title" :to="routineMenu.route">
            <span>{{routineMenu.title}}</span>
          </v-btn>
        </v-card>
      </v-expand-transition>

       <v-btn x-large block plain class="my-3 white--text" v-for="menu in primaryItems" :key="menu.title" :to="menu.route">
         <v-icon left>{{menu.icon}}</v-icon>
         <span>{{menu.title}}</span>
       </v-btn>

    </v-navigation-drawer>
    </v-app>
  </nav>
</template>

<script>
export default {
  data: () => ({
    expand: false,
    primaryItems: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/' },
      { title: 'Trainers', icon: 'mdi-account-multiple', route: '/trainers' },
      { title: 'Settings', icon: 'mdi-cog', route: '/settings' },
    ],
    routinesMenu: [
      { title: 'My Routines', route: '/my-routines' },
      { title: 'Explore Routines', route: '/exp-routines' },
    ],
  }),
  name: "NavBar",
}
</script>

<style scoped>
  .menus{
    text-align: center;
  }
  .submenu{
    display: inline-block;
    height: 84px;
    width: 180px;
  }
</style>