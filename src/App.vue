<template>
<<<<<<< HEAD
  <v-app dark>
    <NavBar />
    <v-content>
      <router-view />
    </v-content>
=======
  <v-app :dark="darkMode">
    <NavBar></NavBar>
    <router-view/>
>>>>>>> 014649e25ec0329e136056dbca1a6b9279d9d99a
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
