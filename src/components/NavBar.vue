<template>
  <nav>
    <!--
    <div class="d-inline-flex flex-xl-column pa-5 mt-5 secondary text--info">
     <h1>FitPal</h1>
      <div><v-btn flat class="secondary">Click</v-btn></div>
      <div><v-btn flat>Click</v-btn></div>
      <div><v-btn flat>Click</v-btn></div>
      <div><v-btn flat>Click</v-btn></div>
    </div>
    -->
    <v-navigation-drawer app class="black">
      <v-toolbar-title>FitPal</v-toolbar-title>
     <div align="center">
       <v-btn plain>
         <v-icon left>
         </v-icon>
         Home
       </v-btn>
     </div>
      <div align="center">
        <v-btn plain>
          <v-icon left>
          </v-icon>
          Routines
        </v-btn>
      </div>
      <div align="center">
        <v-btn plain>
          <v-icon left>
          </v-icon>
          Trainers
        </v-btn>
      </div>
      <div align="center">
        <v-btn plain>
          <v-icon left>
          </v-icon>
          Settings
        </v-btn>
      </div>
    </v-navigation-drawer>
    <v-toolbar vertical flat app>
      <v-toolbar-title>FitPal</v-toolbar-title>
    </v-toolbar>
  </nav>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>

</style>