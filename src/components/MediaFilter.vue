<template>
  <v-btn-toggle
    v-model="currentMedia"
    rounded
    mandatory
    @change="$emit('currentMediaChanged')"
  >
    <v-btn value="movie">
      <v-icon left>mdi-movie</v-icon>
      Movies
    </v-btn>
    <v-btn value="tv">
      <v-icon left>mdi-television</v-icon>
      Shows
    </v-btn>
  </v-btn-toggle>
</template>

<script>
export default {
  computed: {
    currentMedia: {
      get() {
        return this.$store.state.currentMedia;
      },
      set(media) {
        this.$store.commit("setCurrentMedia", media);
      },
    },
  },
};
</script>
