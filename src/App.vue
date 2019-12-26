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
import { mapState } from "vuex";
import db from "@/firebase/config";
import AppBar from "@/components/AppBar.vue";
export default {
  components: {
    AppBar
  },
  methods: {
    checkIfFirstLogin() {
      db.collection("users")
        .doc(this.user.uid)
        .get()
        .then(snapshot => {
          //Check if fields already exists
          if (!snapshot.data()) {
            db.collection("users")
              .doc(this.user.uid)
              .set({
                name: this.user.displayName,
                email: this.user.email,
                firstLogin: new Date(Date.now())
              });
          }
        });
    }
  },
  watch: {
    user() {
      if (this.user) this.checkIfFirstLogin();
    }
  },
  computed: { ...mapState(["user"]) }
};
</script>
