<template>
<div class="fill-width fill-height accent">
    <div class='verify'>
        <TopToolbar/>
      <v-card dark class="secondary pa-5">
        <v-card-title>Verify</v-card-title>
      </v-card>
        <!-- if automatic form or normal form are succesfull then show message-->

        <!-- button and form to submit if automatic form is not completed -->
        <!-- fields should be email and code -->
        <!-- upon clicking the button it should call verify -->
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
            verified: true,
            failed: false,
            email: this.$route.query.email,
            code: this.$route.query.code
        }
    },
    methods: {
        async verify() {
        try {
            const accountVerify = new AccountVerify(this.email, this.code);
            await UserApi.verify_email(accountVerify);
        } catch(error) {
            console.log(error);
            this.failed = true;
        }
        this.verified = true;
    },
    },

    // autoruns when component is called
    async created() {
        if(!this.code || !this.email) {
            // replace this with form?
            console.log("missing email or code");
            return;
        }
        await this.verify();
    }
}
</script>
