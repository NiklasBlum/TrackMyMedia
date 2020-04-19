<template>
  <v-container fluid>
    <v-card shaped>
      <v-card-title>Authentication</v-card-title>
      <v-card-text>
        <v-tabs v-model="tabs" centered>
          <v-tab href="#login"> Login </v-tab>
          <v-tab href="#register"> Register </v-tab>
        </v-tabs>
        <Login class="mb-3" v-show="tabs == 'login'" />
        <Registration class="mb-3" v-show="tabs == 'register'" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Login from "@/components/Auth/Login.vue";
import Registration from "@/components/Auth/Registration.vue";
export default {
  components: {
    Login,
    Registration,
  },
  data() {
    return {
      tabs: "login",
    };
  },
};
</script>
