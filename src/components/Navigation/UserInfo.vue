<template>
  <v-menu
    :close-on-content-click="false"
    :nudge-width="200"
    offset-y
    transition="slide-y-transition"
  >
    <template v-slot:activator="{ on }">
      <v-avatar color="indigo" v-on="on">
        <img v-if="user.photoURL" :src="user.photoURL" />
        <v-icon v-if="!user.photoURL" dark>mdi-account-circle</v-icon>
      </v-avatar>
    </template>

    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Hi {{ user.displayName }}!</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-spacer />
        <Logout />
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { mapState } from "vuex";
import Logout from "@/components/Auth/Logout.vue";
export default {
  components: {
    Logout
  },
  computed: { ...mapState(["user"]) }
};
</script>
