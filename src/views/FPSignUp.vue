<template>
  <v-col  class="fill-height fill-width flex-column accent">

  <v-card dark max-width="600" class=" secondary">
    <router-link :to="pathBack">
      <v-icon large class="white--text">mdi-chevron-left</v-icon>
    </router-link>
    <v-card-title>Sign Up</v-card-title>
  <v-form
      ref="form"
      v-model="form"
      class="pa-4 pt-6"
  >
    <v-text-field
        v-model="name"
        filled
        :rules="[rules.required]"
        color="primary"
        label="Name"
        type="name"
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
    <v-select
        v-model="select"
        :items="trainer"
        :rules="[rules.required]"
        label="Are you a Trainer?"
    ></v-select>
    <v-btn
        class="primary mr-4"
        @click="submit"
    >
      submit
    </v-btn>
    <v-btn
        class="primary mr-4"
        @click="clear()">
      clear
    </v-btn>
  </v-form>
  </v-card>
  </v-col>
</template>

<script>
export default {
  name: "FPSignUp",
  data: () => ({
    pathBack: '/landing-page',
    name: '',
    email: '',
    password: '',
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
    clear () {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.password=''
      this.select = null
    },
  },
}
</script>

<style scoped>

</style>