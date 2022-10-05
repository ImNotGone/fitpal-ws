<template>
  <div class="fill-width fill-height accent">
  <v-container  class="justify-center">
  <v-card dark class="secondary">
    <router-link :to="pathBack">
      <v-icon large class="white--text">mdi-chevron-left</v-icon>
    </router-link>

    <div align="center">
    <v-img class="logo d-flex justify-center ma-4" src="@/assets/fitpal-horizontallogo.svg"/>
    </div>

    <v-card-title>
      Sign Up
    </v-card-title>

  <v-form
      ref="form"
      v-model="form"
      class="pa-4 pt-6"
  >
    <v-text-field
        v-model="firstName"
        filled
        :rules="[rules.required]"
        color="primary"
        label="First Name"
        type="firstName"
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
        v-model="lastName"
        filled
        :rules="[rules.required]"
        color="primary"
        label="Last Name"
        type="lastName"
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
        v-model="email"
        :rules="[rules.email, rules.required]"
        filled
        color="primary"
        label="Email address"
        type="email"
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
        v-model="password"
        :rules="[rules.password, rules.length(8), rules.required]"
        filled
        color="primary"
        counter="8"
        label="Password"
        style="min-height: 96px"
        type="password"
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
        v-model="password2"
        :rules="[rules.password, rules.length(8), rules.required]"
        filled
        color="primary"
        label="Confirm Password"
        style="min-height: 96px"
        type="password"
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
    ></v-text-field>
    <v-select
        v-model="select"
        :items="trainer"
        :rules="[rules.required]"
        label="Are you a Trainer?"
    ></v-select>
    <v-btn
        class="primary mr-4"
        @click="submit"
        to="/"
    >
      Sign Up
    </v-btn>
  </v-form>
  </v-card>
  </v-container>
  </div>
</template>

<script>
export default {
  name: "FPSignUp",
  data: () => ({
    pathBack: '/landing-page',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
    trainer: [
      'Yes',
      'No',
    ],
    rules: {
      email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
      length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
      password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/) ||
          'Password must contain an upper case letter and a numeric character',
      required: v => !!v || 'This field is required',
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
.logo{
  width: 50%;
}
</style>