<template>
  <v-container fluid>
    <LoginForm class="mb-3" /> <v-spacer></v-spacer> <RegistrationForm
  /></v-container>
</template>

<script>
import LoginForm from "@/components/Auth/LoginForm.vue";
import RegistrationForm from "@/components//Auth/RegistrationForm.vue";
export default {
  components: {
    LoginForm,
    RegistrationForm
  }
};
</script>

<style lang="scss" scoped></style>
