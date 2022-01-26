<template>
  <v-progress-circular
    class="black font-weight-bold"
    rotate="-90"
    size="40"
    width="5"
    :value="AverageVote * 10"
    :color="calculateColor()"
  >
    {{ AverageVote * 10 }}
  </v-progress-circular>
</template>

<script>
export default {
  props: {
    AverageVote: Number,
  },
  methods: {
    calculateColor() {
      let rating = this.AverageVote * 10;
      if (rating >= 75) {
        return "green";
      }
      if (rating >= 65) {
        return "orange";
      }
      return "red darken-1";
    },
  },
};
</script>
<style>
</style>
