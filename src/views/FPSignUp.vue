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
            class="pa-4 pt-6"
        >
          <v-text-field
              v-model="firstName"
              filled
              :rules="[rules.required]"
              color="primary"
              label="First Name"
              type="firstName"
          ></v-text-field>
          <v-text-field
              v-model="lastName"
              filled
              :rules="[rules.required]"
              color="primary"
              label="Last Name"
              type="lastName"
          ></v-text-field>
          <v-text-field
              v-model="email"
              :rules="[rules.email, rules.required]"
              filled
              color="primary"
              label="Email address"
              type="email"
          ></v-text-field>
          <v-text-field
              v-model="password"
              :rules="[rules.password, rules.length(8, 50), rules.required]"
              filled
              color="primary"
              label="Password"
              style="min-height: 96px"
              type="password"
          ></v-text-field>
          <v-text-field
              v-model="password2"
              :rules="[passwordConfirmationRule, rules.required]"
              filled
              color="primary"
              label="Confirm Password"
              style="min-height: 96px"
              type="password"
          ></v-text-field>
          <v-btn
              class="primary mr-4 mt-3"
              :loading="loading"
              :disabled="loading"
              @click="submit"
          >
            Sign Up
          </v-btn>

          <!-- Signup Error Message -->
          <p v-if="signupError" class="error--text align-center mb-n3 mt-1">
            {{ signupErrorText }}
          </p>


          <v-dialog persistent v-model="showCard" max-width="600px">
            <v-card v-if="!verified" dark class="secondary pa-5">
              <v-card-title class="justify-center">Verification</v-card-title>
              <v-card-text class="justify-center">An email has been sent to {{ email }}, please click the link in it or
                enter the code below to verify your account
              </v-card-text>
              <v-text-field dark v-model="vCode" type="vCode" label="Verification Code"></v-text-field>
              <!-- Show error message if verification code is incorrect -->
              <v-card-text v-if="verificationError" class="justify-center ml-n6 error--text"> {{
                  verificationErrorText
                }}
              </v-card-text>
              <v-card-text v-if="verified" class="justify-center ml-n6"> Your account has been verified!</v-card-text>

              <v-btn class="primary pa-5" :loading="verifying"
                     :disabled="loading" @click="verify">Verify
              </v-btn>
              <v-btn class="primary ma-5 pa-5" :loading="resending"
                     :disabled="loading" @click="resend">Resend Code
              </v-btn>
            </v-card>

            <!-- Verification success card -->
            <v-card v-else dark class="secondary pa-5">
              <v-card-title>
                <v-row>
                  <v-icon large color="primary" class="pr-3">mdi-check-circle</v-icon>
                  Your account has been verified!
                  <v-spacer/>
                  <v-btn class="primary pa-5" to="/login">Log In</v-btn>
                </v-row>
              </v-card-title>
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
import {UserApi, RegistrationCredentials, AccountVerify, ResendVerification} from "@/api/user";

export default {
  name: "FPSignUp",
  components: {NoLoginFooter, TopToolbar},
  data: () => ({
    // For verification dialog card
    // Disables the login button until the user has verified their email
    verified: false,

    signupError: false,
    signupErrorText: '',

    verificationError: false,
    verificationErrorText: '',

    // Shows the verification dialog card
    showCard: false,
    // Verification code
    vCode: '',
    pathBack: '/landing-page',

    // For button loading
    loading: false,
    resending: false,
    verifying: false,

    // Form data
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',

    // Form validation
    rules: {
      email: v => !!(v || '').match(/.+@.+\..+/) || 'Please enter a valid email',
      length: (minLen, maxLen) => v => ((v || '').length >= minLen && (v || '').length <= maxLen) || `Invalid character length, required more than ${minLen} and less than ${maxLen}`,
      password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/) ||
          'Password must contain an upper case letter, a lower case letter and a numeric character',
      required: v => !!v || 'This field is required',
    },
  }),
  methods: {
    async submit() {

      // Check if form is valid
      if (!this.$refs.form.validate()) {
        return;
      }

      this.loading = true;

      // Create registration object
      const creds = new RegistrationCredentials(this.firstName, this.lastName, this.email, this.password);

      try {
        // Register user
        await UserApi.signup(creds);

        // Show verification dialog card
        this.showCard = true;

      } catch (error) {

        this.signupError = true;

        if (error.code === 1) {
          this.signupErrorText = 'Invalid Data'; // This should never happen
        } else if (error.code === 2) {
          this.signupErrorText = 'Email already in use';
        } else {
          this.signupErrorText = 'An error occurred, please try again later';
        }
      }

      this.loading = false;
    },

    async verify() {
      this.loading = true;
      this.verifying = true;
      this.verificationError = false;
      this.verificationErrorText = '';

      // Verify the code
      try {
        // Verification object
        const accountVerify = new AccountVerify(this.email, this.vCode);

        await UserApi.verify_email(accountVerify);
      } catch (error) {
        this.verificationError = true;

        if (error.code === 8) {
          this.verificationErrorText = error.details[0];
        } else {
          this.verificationErrorText = 'An error occurred, please try again later';
        }
        this.verifying = false;
        this.loading = false;
        return;
      }
      this.verified = true;
      this.verifying = false;
      this.loading = false;
    },
    async resend() {
        this.loading = true;
        this.resending = true;

        this.verificationError = false;
        this.verificationErrorText = '';
        try {
            const resend_verification = new ResendVerification(this.email);
            await UserApi.resend_verification(resend_verification);
        } catch(error) {
            this.verificationError = true;
            this.verificationErrorText = 'An error ocurred, please try again later';
        }

        this.resending = false;
        this.loading = false;
    },
  },
  computed: {
    passwordConfirmationRule() {
      return () => (this.password === this.password2) || 'Password must match'
    }
  }
}
</script>

<style scoped>
.logo {
  width: 50%;
  margin: 0 auto;
}
</style>
