<template>
  <div class="fill-width fill-height accent">
    <TopToolbar/>
    <v-container>
    <v-card dark class=" secondary">
      <router-link :to="pathBack">
        <v-icon large class="white--text">mdi-chevron-left</v-icon>
      </router-link>
      <v-img class="logo" src="@/assets/fitpal-horizontallogo.svg"/>
      <v-card-title>Log In</v-card-title>
      <v-form
          ref="form"
          v-model="form"
          class="pa-4 pt-6"
      >
        <v-text-field
            v-model="email"
            filled
            color="primary"
            label="Email address"
            type="email"
        ></v-text-field>
        <v-text-field
            v-model="password"
            filled
            color="primary"
            label="Password"
            style="min-height: 96px"
            type="password"
        ></v-text-field>
        <!-- Login Error Message -->
        <p v-if="loginError" class="error--text align-center mt-n7">
          {{ loginErrorText }}
        </p>
        <v-btn
            class="primary mr-4"
            :loading="loading"
            :disabled="loading"
            @click="login"
        >
          Log In
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
import { useSecurityStore } from "@/stores/SecurityStore";
import { mapActions } from "pinia";
import { LoginCredentials } from "@/api/user";
import router from "@/router";

export default {
  name: "FPLogin",
  components: {NoLoginFooter, TopToolbar},
  data: () => ({
    pathBack: '/landing-page',

    // Login
    loginError: false,
    loginErrorText: '',

    // Form data
    email: '',
    password: '',

    // For button loading
    loading: false
  }),
  methods: {
    ...mapActions(useSecurityStore, {
      $login: 'login',
    }),
    async login() {
      this.loading = true;

      // Create a login credentials object
      const credentials = new LoginCredentials(this.email, this.password);

      try {
        // Attempt to log in
        await this.$login(credentials);

        // If successful, redirect to the home page
        await router.replace({path: '/'});
      } catch (e) {
        // If unsuccessful, display an error message
        this.loginError = true;

        if (e.code === 8) {
          this.loginErrorText = 'Email not verified';
        } else if (e.code === 4) {
          this.loginErrorText = 'Invalid email or password';
        } else {
          this.loginErrorText = 'An unknown error occurred, please try again later';
        }
      }

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
</style>
