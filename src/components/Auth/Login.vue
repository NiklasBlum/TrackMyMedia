<template>
  <div>
    <v-btn @click="dialog = !dialog">Login</v-btn>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          Login Form
          <v-spacer />
          <v-btn icon @click="dialog = false" text>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-expansion-panels multiple>
            <v-expansion-panel>
              <v-expansion-panel-header>Social Login</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row align="center" justify="center">
                  <v-btn-toggle rounded>
                    <v-btn large color="red">
                      <v-icon>mdi-google</v-icon>
                    </v-btn>
                    <v-btn large color="blue">
                      <v-icon>mdi-facebook</v-icon>
                    </v-btn>
                  </v-btn-toggle>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>
                With Email
              </v-expansion-panel-header>
              <v-expansion-panel-content>
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
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
        <v-card-actions>
          <v-btn block :loading="loading" @click="signIn">Login</v-btn>
        </v-card-actions>
        <v-alert type="error" v-if="error">
          {{ error }}
        </v-alert>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from "@/firebase/auth";
export default {
  data() {
    return {
      loading: false,
      email: null,
      password: null,
      isValid: false,
      error: null,
      dialog: false
    };
  },
  methods: {
    signIn() {
      this.loading = true;
      firebase
        .signInWithEmailAndPassword(this.email, this.password)
        .then(res => {
          console.log(res);
          this.email = null;
          this.password = null;
          this.dialog = false;
        })
        .catch(err => {
          this.error = err.message;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
