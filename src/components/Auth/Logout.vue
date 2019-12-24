<template>
  <v-btn @click="logout">Logout</v-btn>
</template>

<script>
import firebase from "firebase";
export default {
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("logged out!");
          this.$router.replace("home");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
