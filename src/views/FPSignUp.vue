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
    <v-dialog persistent v-model="showCard" max-width="600px">
      <v-card dark class="secondary pa-5">
        <v-card-title class="justify-center">Verification</v-card-title>
        <v-card-text class="justify-center">An email has been sent to {{ email }}, please click the link in it or enter the code below to verify your account</v-card-text>
        <v-text-field dark v-model="vCode" type="vCode" label="Verification Code"></v-text-field>
        <v-row class="pa-5">
          <v-btn class="primary pa-5" :loading="loading"
                 :disabled="loading" @click="verify">Verify</v-btn>
          <v-spacer/>
          <v-btn :disabled="logIn" class="primary pa-5" to="/login">Log In</v-btn>
        </v-row>

      </v-card>
    </v-dialog>
  </v-form>
  </v-card>
  </v-container>
    <NoLoginFooter/>
  </div>
</template>

<script>
import TopToolbar from "@/components/TopToolbar";
import NoLoginFooter from "@/components/NoLoginFooter";
import {UserApi, RegistrationCredentials, AccountVerify} from "@/api/user";

export default {
  name: "FPSignUp",
  components: {NoLoginFooter, TopToolbar},
  data: () => ({
    logIn: true,
    showCard: false,
    vCode: '',
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
        this.showCard=true;
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
    async verify() {
      this.loading = true;
      try {
        const accountVerify = new AccountVerify(this.email, this.vCode);
        await UserApi.verify_email(accountVerify);
        this.logIn= true;
      } catch(error) {
        alert(error);
        this.failed = false;
      }
      this.verified = true;
      this.loading = false;
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
