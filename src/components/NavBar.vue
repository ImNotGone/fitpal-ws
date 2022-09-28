<template>
  <nav>
    <v-app>
    <v-navigation-drawer app class="secondary">
      <v-toolbar-title>
        <v-img :aspect-ratio="16/9"
                src="@/assets/fitPal-logo.png"></v-img>
      </v-toolbar-title>
     <div align="center">
       <v-btn x-large plain class="white--text">
         <v-icon left>
           mdi-home
         </v-icon>
         Home
       </v-btn>
     </div>

      <div align="center">
        <v-btn x-large plain class="white--text" @click="expand = !expand">
          <v-icon left>
            mdi-book-open-variant
          </v-icon>
          <span>Routines</span>
          <v-icon right>
            mdi-chevron-down
          </v-icon>
        </v-btn>
        <v-expand-transition>
          <v-card class="secondary"
              v-show="expand"
              height="70"
              width="180"
          >
            <v-btn plain color="white">
              <span>My Routines</span>
            </v-btn>
            <v-btn plain color="white">
              <span>Explore Routines</span>
            </v-btn>
          </v-card>
        </v-expand-transition>
      </div>

      <div align="center">
        <v-btn x-large plain class="white--text">
          <v-icon left>
            mdi-account-multiple
          </v-icon>
          Trainers
        </v-btn>
      </div>

      <div align="center">
        <v-btn x-large plain class="white--text">
          <v-icon left>
            mdi-cog
          </v-icon>
          Settings
        </v-btn>
      </div>
    </v-navigation-drawer>
    </v-app>
  </nav>
</template>

<script>
export default {
  data: () => ({
    expand: false,
    items: [
      { title: 'My Routines' },
      { title: 'Explore Routines' },
    ],
  }),
  name: "NavBar",
}
</script>

<style scoped>

</style>