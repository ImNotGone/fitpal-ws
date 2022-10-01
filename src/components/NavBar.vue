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
          <v-list-group
              prepend-icon="mdi-book-open-variant"
          >
            <template v-slot:activator>
              <v-list-item-title class="menus">Routines</v-list-item-title>
            </template>

            <v-list-item-group>
              <v-list-item
                  v-for="routine in routinesMenu"
                  :key="routine.title" :to="routine.route"
                  class="menus"
              >
                <v-list-item-content>
                  <v-list-item-title v-text="routine.title" class="menus"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list-group>

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

      <!--
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
          <v-btn plain block class="mt-1 white--text" v-for="routineMenu in routinesMenu" :key="routineMenu.title"
                 :to="routineMenu.route">
            <span>{{ routineMenu.title }}</span>
          </v-btn>
        </v-card>
      </v-expand-transition>

      <v-btn x-large block plain class="my-3 white--text" v-for="menu in primaryItems" :key="menu.title"
             :to="menu.route">
        <v-icon left>{{ menu.icon }}</v-icon>
        <span>{{ menu.title }}</span>
      </v-btn>

      -->



      <template v-slot:append>
        <div class="pa-2">
          <v-btn block flat color="grey">
            <v-icon left>mdi-help-circle-outline</v-icon>
            <span>Help</span>
          </v-btn>
        </div>
        <div class="pa-2">
          <v-btn block flat color="grey">
            <v-icon left>mdi-exit-to-app</v-icon>
            <span>Sign Out</span>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data: () => ({
    expand: false,
    burger: true,
    width: 250,
    primaryItems: [
      {title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/'},
      {title: 'Trainers', icon: 'mdi-account-multiple', route: '/trainers'},
      {title: 'Settings', icon: 'mdi-cog', route: '/settings'},
    ],
    routinesMenu: [
      {title: 'My Routines', route: '/my-routines'},
      {title: 'Explore Routines', route: '/exp-routines'},
    ],
  }),
  name: "NavBar",
  mounted() {
    this.$root.$on("fromToolBar", (msg) => {
      this.burger = msg;
    });
  },
}
</script>

<style scoped>
.menus {
  font-weight: bold;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: lightgray;
}

.submenu {
  display: inline-block;
  height: 84px;
  width: 320px;
}

.list .v-list-item-group .v-list-item--active {
  color: #FF8754;
  background-color: #353535;
}
</style>
