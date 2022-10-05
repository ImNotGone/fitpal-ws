<template>

</template>

<script>
export default {
  name: "FPSignUp",
  data: () => ({
    email: undefined,
    password: undefined,
    rules: {
      email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
      length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
      password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/) ||
          'Password must contain an upper case letter and a numeric character',
      required: v => !!v || 'This field is required',
    },
  }),
}
</script>

<style scoped>

</style>