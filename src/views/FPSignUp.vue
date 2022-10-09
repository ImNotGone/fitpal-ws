<template>
  <div class="fill-width fill-height accent">
    <TopToolbar/>
  <v-container>
  <v-card dark class="secondary">
    <router-link :to="pathBack">
      <v-icon large class="white--text">mdi-chevron-left</v-icon>
    </router-link>

    <v-img class="logo" src="@/assets/fitpal-horizontallogo.svg"/>

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
        v-model="selectedChoice"
        :items="trainer"
        :rules="[rules.required]"
        label="Are you a Trainer?"
    ></v-select>
    <v-btn
        class="primary mr-4"
        :loading="loading"
        :disabled="loading"
        @click="submit"
    >
      Sign Up
    </v-btn>
  </v-form>
  </v-card>
  </v-container>
    <NoLoginFooter/>
  </div>
</template>

<script>
import TopToolbar from "@/components/TopToolbar";
import NoLoginFooter from "@/components/NoLoginFooter";
import { UserApi, RegistrationCredentials } from "@/api/user";

export default {
  name: "FPSignUp",
  components: {NoLoginFooter, TopToolbar},
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
    selectedChoice: '',
    rules: {
      email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
      length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
      password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/) ||
          'Password must contain an upper case letter, a lower case letter and a numeric character',
      required: v => !!v || 'This field is required',
    },
    loading: false,
  }),
  methods: {
    async submit () {
      this.loading = true;
      const creds = new RegistrationCredentials(this.firstName, this.lastName, this.email, this.password);
      try {
        console.log(await UserApi.signup(creds))
        // TODO: MANDARLO A LA PAGINA DE VERIFICACION O ALGO
        // POR EJEMPLO -> verify -> login
        // router.replace({path: '/verify?email=${this.email}&code='''})
        //  o sino mostrar un mensaje diciendo que vaya al mail a verificarse desde ahi
      } catch (error) {
        console.log(error)
        // TODO: MOSTRAR EL ERROR EN PANTALLA
      }
      this.loading = false;
      this.$v.$touch()
    },
  },
}
</script>

<style scoped>
.logo{
  width: 50%;
  margin: 0 auto;
}
.form{

}
</style>
