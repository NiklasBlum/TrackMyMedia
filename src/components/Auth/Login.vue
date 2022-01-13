<template>
  <v-card>
    <v-card-title>Login</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" class="text-center">
          <v-btn rounded large color="red" @click="signInWithGoogle()">
            <v-icon>mdi-google</v-icon>
            Login with Google
          </v-btn>
        </v-col>
        <v-col cols="12" class="text-center">
          <v-btn rounded large color="blue" @click="signInWithFacebook()">
            <v-icon>mdi-facebook</v-icon>
            Login with Facebook
          </v-btn>
        </v-col>
      </v-row>
      <v-form>
        <v-text-field
          label="Email"
          v-model="email"
          required
          :rules="[(v) => !!v || 'Email is required']"
        />
        <v-text-field
          label="Password"
          v-model="password"
          type="password"
          required
          :rules="[(v) => !!v || 'Password is required']"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn block :loading="loading" @click="signIn">Login</v-btn>
    </v-card-actions>
    <v-alert type="error" v-if="error">
      {{ error }}
    </v-alert>
  </v-card>
</template>

<script>
import firebase from "firebase/app";

export default {
  data() {
    return {
      loading: false,
      email: null,
      password: null,
      isValid: false,
      error: null,
    };
  },
  methods: {
    signIn() {
      this.loading = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace("/");
          this.email = null;
          this.password = null;
        })
        .catch((err) => {
          this.error = err.message;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          this.$router.replace("/");
        });
    },
    signInWithFacebook() {
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          this.$router.replace("/");
        });
    },
  },
};
</script>
