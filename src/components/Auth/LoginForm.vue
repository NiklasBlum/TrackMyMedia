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
      <v-btn>Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      isValid: false
    };
  }
};
</script>
