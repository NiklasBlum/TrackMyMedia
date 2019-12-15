<template>
  <v-app>
    <AppBar />
    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar.vue";
export default {
  components: {
    AppBar
  }
};
</script>
