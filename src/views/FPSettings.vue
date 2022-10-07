<template>
    <div  class="fill-height settings">
      <ToolBar title="Settings"/>
      <v-col class="fill-height fill-width flex-column accent">
        <v-tabs
            app
            v-model="tab"
            dark
            fixed-tabs
            background-color="secondary"
        >
          <v-tab class="secondary"
              v-for="option in options"
              :key="option"
          >
            {{ option }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item key="General">

          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </div>
</template>


<script>
import ToolBar from "@/components/ToolBar";
export default {
  components: {ToolBar},
  data(){
    return{
     options: [
        'General',
         'Notifications'
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
