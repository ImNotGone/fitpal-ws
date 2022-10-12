<template>
  <div class="fill-height settings">
    <ToolBar title="Profile"/>
    <v-container class="container">
      <v-card>
        <v-card-title class="secondary">
          <v-avatar class="mr-3">
            <img :src="profilePicture" alt="profile picture">
          </v-avatar>
          <div class="secondary">
            <h3 class="headline mb-0">{{ textFields[0].model }} {{ textFields[1].model }}</h3>
            <div class="secondary">{{ textFields[2].model }}</div>
          </div>
        </v-card-title>
        <v-card-text class="secondary">
          <v-form>
            <v-text-field
                dark
                filled
                class="secondary"
                v-for="field in textFields"
                :key="field.label"
                v-model="field.model"
                :rules="[field.rules]"
                :label="field.label"
                :type="field.type"
                :disabled="field.disabled"
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"/>
            <v-file-input
                class="secondary"
                dark
                filled
                v-model="profilePicture"
                accept="image/png, image/jpeg, image/bmp, image/svg"
                placeholder="Insert image"
                prepend-icon="mdi-camera"
                label="Change profile picture"
            ></v-file-input>
            <v-btn
                class="primary mr-4"
                @click="submit"
                to="/"
            >
              Save
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import ToolBar from "@/components/ToolBar";
export default {
  components: {ToolBar},
  data(){
    return{
     options: [
        'Profile'
      ],
      textFields: [
        {model: 'Pepe', label: 'First Name', type: 'text', rules: v => !!(v || '').match(/^[A-Za-z]+$/) ||  'First name must only contain letters', disabled: false},
        {model: 'Fernandez', label: 'Last Name', type: 'text', rules: v => !!(v || '').match(/^[A-Za-z]+$/) || 'Last name must only contain letters', disabled: false},
        {model: 'pepe@gmail.com', label: 'Email', type: 'email', rules: v => !!(v || '').match(/@/) || 'Please enter a valid email', disabled: true},
        {model: '1234', label: 'Password', type: 'password', rules: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/) || 'Password must contain an upper case letter and a numeric character', disabled: false}
      ],
      profilePicture: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    }
  },
}
</script>

<style scoped>
div{
  background-color: #939393;
  color: white;
}
.container{
  margin: auto auto 40px auto;
  padding: 20px;
}
</style>

