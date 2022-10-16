<template>
<div class="fill-width fill-height accent">
    <div class='verify'>
        <TopToolbar/>
        <v-overlay is-absolute :value="loading">
            <v-progress-circular class="center" color="primary" indeterminate size="200" width="10"/>
        </v-overlay>
        <v-container v-show="!loading">
        <v-card dark class="secondary">
            <v-card-title v-if="verified">Verified!</v-card-title>
            <v-card-title v-if="!verified">Verification error... </v-card-title>
            <!-- Verification Error Message -->
            <v-col>
            <p v-if="verificationError" class="error--text align-center mt-n7">
                {{ verificationErrorText }}
            </p>
            <p v-if="!verificationError">
                Account created succesfully, you may now log in!
            </p>
            </v-col>
            <v-col align="right">
            <v-btn
                class="primary mr-4"
                v-show="verified"
                to="/login"
            >
            Log In
            </v-btn>
            </v-col>
        </v-card>
        </v-container>
    </div>
</div>
</template>


<script>
import { AccountVerify, UserApi } from "@/api/user";
import TopToolbar from "@/components/TopToolbar.vue";

export default {
    name: 'FPVerify',
    components: { TopToolbar },
    data() {
        return {
            loading: false,
            verified: false,
            verificationError: false,
            verificationErrorText: '',
            email: this.$route.query.email,
            code: this.$route.query.code
        }
    },
    methods: {
        async verify() {
        this.loading = true;
        try {
            const accountVerify = new AccountVerify(this.email, this.code);
            await UserApi.verify_email(accountVerify);
            this.verified = true;
        } catch(error) {
            this.verificationError = true;
            this.verificationErrorText = `${error.details[0]}`;
        }

        this.loading = false;

        },
    },

    // autoruns when component is called
    async created() {
        if(!this.code || !this.email) {
            this.showDialog = true;
            console.log("missing email or code");
            return;
        }
        await this.verify();
    }
}
</script>
