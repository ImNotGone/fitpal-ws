<template>
  <v-footer
      class="secondary"
      app
      padless
      bottom
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
</template>

<script>
export default {
  name: "NoLoginFooter"
}
</script>

<style scoped>

</style>