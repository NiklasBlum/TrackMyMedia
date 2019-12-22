<template>
  <v-btn @click="logout">Logout</v-btn>
</template>

<script>
import firebase from "@/firebase/auth";
export default {
  methods: {
    logout() {
      firebase
        .signOut()
        .then(() => {
          console.log("logged out!");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
