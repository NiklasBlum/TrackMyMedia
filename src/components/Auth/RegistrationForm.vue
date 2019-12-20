<template>
  <v-card>
    <v-card-title>Registration Form</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Email"
          v-model="email"
          required
          :rules="[v => !!v || 'Email is required']"
        ></v-text-field>
        <v-text-field
          label="Password"
          v-model="password"
          type="password"
          required
          :rules="[v => !!v || 'Password is required']"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="register()">Register</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import firebase from "@/firebase/init";
export default {
  data() {
    return {
      email: null,
      password: null,
      isValid: false
    };
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
