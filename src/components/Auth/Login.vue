<template>
  <v-card>
    <v-card-title>Login Form</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Email"
          v-model="email"
          required
          :rules="[v => !!v || 'Email is required']"
        />
        <v-text-field
          label="Password"
          v-model="password"
          type="password"
          required
          :rules="[v => !!v || 'Password is required']"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="signIn">Login</v-btn>
    </v-card-actions>

    <v-text-field v-model="error" :readonly="true"></v-text-field>
  </v-card>
</template>

<script>
import firebase from "@/firebase/auth";
export default {
  data() {
    return {
      email: null,
      password: null,
      isValid: false,
      error: null
    };
  },
  methods: {
    signIn() {
      firebase
        .signInWithEmailAndPassword(this.email, this.password)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>
