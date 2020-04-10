<template>
  <div>
    <v-btn @click="trailerDialog = !trailerDialog" color="red">
      <v-icon left>
        mdi-youtube
      </v-icon>
      Trailer
    </v-btn>
    <v-dialog v-model="trailerDialog">
      <youtube :video-id="trailerId" resize fitParent />
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    trailerId: String
  },
  data() {
    return {
      trailerDialog: false
    };
  }
};
</script>
