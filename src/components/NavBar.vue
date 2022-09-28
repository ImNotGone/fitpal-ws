<template>
  <nav>
    <v-app>
    <v-navigation-drawer app class="secondary">
      <v-toolbar-title>
        <v-img :aspect-ratio="16/9"
                src="@/assets/fitPal-logo.png"></v-img>
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
        <v-menu  :offset-y="offset">
          <template v-slot:activator="{ on, attrs }">
          <v-btn plain slot="activator" class="white--text" v-bind="attrs"
                 v-on="on">
            <v-icon left>
              mdi-book-open-variant
            </v-icon>
            <span>Routines</span>
          </v-btn>
          </template>
          <v-list>
            <v-list-item
                v-for="(item, index) in items"
                :key="index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
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
  data: () => ({
    items: [
      { title: 'My Routines' },
      { title: 'Explore Routines' },
    ],
    offset: true,
  }),
  name: "NavBar",
}
</script>

<style scoped>

</style>