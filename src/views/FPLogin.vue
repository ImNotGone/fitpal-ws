<template>
  <div class="fill-width fill-height accent">
    <v-container  class="justify-center">

    <v-card dark class=" secondary">
      <router-link :to="pathBack">
        <v-icon large class="white--text">mdi-chevron-left</v-icon>
      </router-link>
      <v-card-title>Log In</v-card-title>
      <v-form
          ref="form"
          v-model="form"
          class="pa-4 pt-6"
      >
        <v-text-field
            v-model="email"
            :rules="[rules.email]"
            filled
            color="primary"
            label="Email address"
            type="email"
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
        ></v-text-field>
        <v-text-field
            v-model="password"
            :rules="[rules.password]"
            filled
            color="primary"
            label="Password"
            style="min-height: 96px"
            type="password"
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
        ></v-text-field>
        <v-btn
            class="primary mr-4"
            @click="submit"
        >
          Log In
        </v-btn>
      </v-form>
    </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "FPLogin",
  data: () => ({
    pathBack: '/landing-page',
    email: '',
    password: '',
    rules: {
      email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
      password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/) ||
          'Password must contain an upper case letter and a numeric character',
    },
  }),
  methods: {
    submit () {
      this.$v.$touch()
    },
  },
}
</script>

<style scoped>

</style>