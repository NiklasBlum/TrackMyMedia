<template>
  <v-app>
    <AppBar v-if="user" />
    <v-main>
      <v-container fluid>
        <!-- TODO: check if keep-alive is useful - to much traffic otherwise? -->
        <!-- <keep-alive max="3">
          <router-view :key="$route.fullPath" />
        </keep-alive> -->
        <router-view :key="$route.fullPath" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import AppBar from "@/components/Navigation/AppBar.vue";
import FirestoreService from "@/services/FirestoreService.js";

export default {
  components: {
    AppBar,
  },
  methods: {
    checkIfFirstLogin() {
      FirestoreService.createUserIfNotExists();
    },
  },
  watch: {
    user() {
      if (this.user) this.checkIfFirstLogin();
    },
  },
  computed: { ...mapState(["user"]) },
};
</script>
