<template>
  <v-app>
    <AppBar v-if="user" />
    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar.vue";
export default {
  components: {
    AppBar
  },
  computed: {
    user: {
      get() {
        return this.$store.state.user;
      },
      set(user) {
        this.$store.commit("setUser", user);
      }
    }
  }
};
</script>
