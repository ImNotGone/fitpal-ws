<template>
    <div  class="settings">
      <ToolBar title="Settings"/>
      <v-card class="accent pa-lg-10">
        <v-tabs
            app
            v-model="tab"
        dark
        tabs>
          <v-tab class="secondary"
              v-for="option in options"
              :key="option"
          >
            {{ option }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>

          </v-tab-item>
        </v-tabs-items>
      </v-card>
      <h1>Lula estuvo aqui O.o</h1>
    </div>
</template>


<script>
import ToolBar from "@/components/ToolBar";
export default {
  components: {ToolBar},
  data(){
    return{
     options: [
        'General'
      ],
    }
  }

}
</script>

<style scoped>
div {
  background-color: #939393;
  color: white;
}
</style>
