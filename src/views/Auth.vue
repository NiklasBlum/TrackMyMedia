<template>
  <v-container fluid>
    <Login class="mb-3" />

    <Registration class="mb-3" />
    <Logout />
  </v-container>
</template>

<script>
import Login from "@/components/Auth/Login.vue";
import Registration from "@/components/Auth/Registration.vue";
import Logout from "@/components/Auth/Logout.vue";
export default {
  components: {
    Login,
    Registration,
    Logout
  }
};
</script>
