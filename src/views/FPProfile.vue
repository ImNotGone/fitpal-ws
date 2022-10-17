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
            <h3 class="headline mb-0">{{ firstName }} {{ lastName }}</h3>
            <div class="secondary">{{ email }}</div>
          </div>
        </v-card-title>
        <v-card-text class="secondary">
          <v-form ref="form">
            <v-text-field
                dark
                filled
                class="secondary"
                color="primary"
                v-for="field in textFields"
                :key="field.label"
                v-model="field.model"
                :rules="field.rules"
                :label="field.label"
                :type="field.type"
                :disabled="field.disabled"
            />
            <!-- Save button and text, showing error message or success message -->
            <p
                v-if="finished && error"
                type="error"
                class="mt-3 error--text"
            >
              {{ errorText }}
            </p>
            <p
                v-else-if="finished"
                type="success"
                class="white--text"
            >
              <v-icon class="mr-2" color="primary">mdi-check</v-icon>
              {{ successText }}
            </p>
              <v-btn
                  class="primary mr-4"
                  @click="submit"
                  :loading="loading"
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
import { useSecurityStore } from "@/stores/SecurityStore";
import {AccountEdit, UserApi} from "@/api/user";
import {imageExists} from "@/lib/validation";

export default {
  components: {ToolBar},
  data: () => ({
    options: [
      'Profile'
    ],

    // For loading animation
    loading: false,

    // Error message
    finished: false,
    error: false,
    errorText: '',
    successText: '',

    // Fields that do not update with the form
    firstName: String,
    lastName: String,
    email: String,
    profilePicture: String,

    textFields: [
        // First Name
        {
          model: '',
          label: 'First Name',
          type: 'text',
          disabled: false,
          rules: [
            (v) => !!v || 'First Name is required',
            (v) => /^[a-zA-Z ]+$/.test(v) || 'First Name must contain only letters and spaces',
            (v) => (v && v.length <= 50) || 'First Name must be less than 50 characters',
          ],
        },
        // Last Name
        {
          model: '',
          label: 'Last Name',
          type: 'text',
          disabled: false,
          rules: [
            (v) => !!v || 'Last Name is required',
            (v) => /^[a-zA-Z ]+$/.test(v) || 'Last Name must contain only letters and spaces',
            (v) => (v && v.length <= 50) || 'Last Name must be less than 50 characters',
          ],
        },
        // Email
        {
          model: '',
          label: 'Email',
          type: 'email',
          disabled: true,
          rules: [
            (v) => !!v || 'E-mail is required',
            (v) => /.+@.+\..+/.test(v) || 'Please enter a valid email',
          ],
        },
        //Avatar URL
        {
          model: '',
          label: 'Profile Picture URL',
          type: 'text',
          disabled: false,
          rules: [
            (v) => /.+\..+/.test(v) || 'Please enter a valid URL',
          ],
        },
      ],
  }),
  methods: {
    async submit() {

      // Check if the form is valid
      if (!this.$refs.form.validate()) {
        return;
      }

      // Check for changes in the form
      if (this.textFields[0].model === this.firstName &&
          this.textFields[1].model === this.lastName &&
          this.textFields[2].model === this.email &&
          this.textFields[3].model === this.profilePicture) {
        return;
      }

      // Button loading animation
      this.loading = true;

      // Check if image exists, if it does not return
      if (!await imageExists(this.textFields[3].model)) {
        this.error = true;
        this.finished = true;
        this.loading = false;
        this.errorText = 'Image does not exist';
        return;
      }

      // Flags
      this.finished = false;
      this.error = false;

      // Create a new accountEdit object
      const accountEdit = new AccountEdit(
          this.textFields[0].model,
          this.textFields[1].model,
          this.textFields[3].model,
      );

      try {
        // Call the editAccount method from the security store
        await UserApi.editCurrentUser(accountEdit);

        // Update the security store
        await useSecurityStore().updateUser();

        // Update fields
        this.firstName = useSecurityStore().firstName;
        this.lastName = useSecurityStore().lastName;
        this.email = useSecurityStore().email;
        this.profilePicture = useSecurityStore().avatarUrl;

        // Success message
        this.successText = 'Profile updated successfully';

      } catch (e) {

        this.error = true;

        // Set error message
        // None of this should happen
        if (e.code === 1) {
          this.errorText = 'Invalid data';
        } else if (e.code === 7) {
          this.errorText = 'You dont have permission to edit this account';
        } else {
          this.errorText = 'An error occurred, please try again later';
        }
      }

      // Button loading animation
      this.loading = false;

      // Set finished flag
      this.finished = true;
    },
  },
  async beforeMount() {
    // Get user data if user is not loaded
    await useSecurityStore().getUser();

    // Update fields
    this.firstName = useSecurityStore().firstName;
    this.textFields[0].model = this.firstName;

    this.lastName = useSecurityStore().lastName;
    this.textFields[1].model = this.lastName;

    this.email = useSecurityStore().email;
    this.textFields[2].model = this.email;

    this.profilePicture = useSecurityStore().avatarUrl;
    this.textFields[3].model = this.profilePicture;
  }
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

