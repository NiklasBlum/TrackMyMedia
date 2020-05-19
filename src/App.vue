<template>
  <v-app>
    <AppBar v-if="user" />
    <v-content>
      <v-container fluid>
        <keep-alive max="3">
          <router-view :key="$route.fullPath"/>
        </keep-alive>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import db from "@/firebase/config";
import AppBar from "@/components/Navigation/AppBar.vue";
export default {
  components: {
    AppBar,
  },
  methods: {
    checkIfFirstLogin() {
      db.collection("users")
        .doc(this.user.uid)
        .get()
        .then((snapshot) => {
          if (!snapshot.data()) {
            db.collection("users")
              .doc(this.user.uid)
              .set({
                name: this.user.displayName,
                email: this.user.email,
                firstLogin: new Date(Date.now()),
              });
          }
        });
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
