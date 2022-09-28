<template>
  <nav>
    <v-app>
    <v-navigation-drawer app class="secondary">
      <v-toolbar-title>
        <v-img :aspect-ratio="16/9"
               :width="width" src="@/assets/fitPal-logo.png"></v-img>
      </v-toolbar-title>
     <div align="center">
       <v-btn plain class="white--text">
         <v-icon left>
           mdi-home
         </v-icon>
         Home
       </v-btn>
     </div>
      <div align="center">
        <v-btn plain class="white--text">
          <v-icon left>
            mdi-book-open-variant
          </v-icon>
          Routines
        </v-btn>
      </div>
      <div align="center">
        <v-btn plain class="white--text">
          <v-icon left>
            mdi-account-multiple
          </v-icon>
          Trainers
        </v-btn>
      </div>
      <div align="center">
        <v-btn plain class="white--text">
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
  name: "NavBar"
}
</script>

<style scoped>

</style>