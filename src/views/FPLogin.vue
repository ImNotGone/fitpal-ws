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

export default {
  name: "FPLogin",
  components: {NoLoginFooter, TopToolbar},
  data: () => ({
    pathBack: '/landing-page',
    email: '',
    password: '',
    rules: {
      email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
      password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/) ||
          'Password must contain an upper case letter and a numeric character',
    },
    loading: false
  }),
  methods: {
    ...mapActions(useSecurityStore, {
      $login: 'login',
    }),
    async login() {
      this.loading=true;
      const credentials = new LoginCredentials(this.email, this.password);
      await this.$login(credentials, true)
      this.loading=false;
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
</style>
