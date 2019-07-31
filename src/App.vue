<template>
  <v-app :dark="darkMode">
    <NavBar />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import { mapState } from "vuex";
export default {
  components: {
    NavBar
  },
  computed: mapState(["darkMode"])
};
</script>


<style>
</style>
