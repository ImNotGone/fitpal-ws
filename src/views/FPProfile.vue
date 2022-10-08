<!-- Profile editing -->
<!-- Show Profile Picture -->
<!-- Edit Profile picture -->
<!-- Edit email -->
<!-- Edit password -->
<!-- Edit first name -->
<!-- Edit last name -->

<template>
  <div class="fill-height settings">
    <ToolBar title="Profile"/>
    <v-container dark>
      <v-card class="ma-auto">
        <v-card-title>
          <v-avatar class="mr-3">
            <img :src="profilePicture" alt="profile picture">
          </v-avatar>
          <div>
            <h3 class="headline mb-0">{{ firstName }} {{ lastName }}</h3>
            <div>{{ email }}</div>
          </div>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
                v-model="email"
                :rules="[rules.email]"
                filled
                dark
                label="Email address"
                type="email"/>
<!--                @input="$v.name.$touch()"-->
<!--                @blur="$v.name.$touch()"-->
            <v-text-field
                v-model="password"
                :rules="[rules.password]"
                filled
                dark
                label="Password"
                style="min-height: 96px"
                type="password"/>
<!--                @input="$v.name.$touch()"-->
<!--                @blur="$v.name.$touch()"-->
            <v-text-field
                v-model="firstName"
                :rules="[rules.firstName]"
                filled
                dark
                label="First name"
                type="text"/>
<!--                @input="$v.name.$touch()"-->
<!--                @blur="$v.name.$touch()"-->
            <v-text-field
                v-model="lastName"
                :rules="[rules.lastName]"
                filled
                dark
                label="Last name"
                type="text"/>
<!--                @input="$v.name.$touch()"-->
<!--                @blur="$v.name.$touch()"-->
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
      firstName: 'pepe',
      lastName: 'pepe',
      email: 'pepe@gmail.com',
      password: '1234',
      profilePicture: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      rules: {
        email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
        password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/) ||
            'Password must contain an upper case letter and a numeric character',
        firstName: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/) ||
            'First name must contain an upper case letter and a numeric character',
        lastName: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/) ||
            'Last name must contain an upper case letter and a numeric character',
      },
    }
  },
}
</script>

<style scoped>
div {
  background-color: #939393;
  color: white;
}
</style>

