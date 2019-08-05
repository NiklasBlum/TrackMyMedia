<template>
  <v-app>
    <NavBar />
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import { mapState } from "vuex";
export default {
  components: {
    NavBar
  }
};
</script>
