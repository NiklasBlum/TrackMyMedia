<template>
  <v-progress-circular
    rotate="-90"
    size="40"
    width="5"
    :value="AverageVote * 10"
    color="green"
  >
    {{ AverageVote * 10 }}
  </v-progress-circular>
</template>

<script>
export default {
  props: {
    AverageVote: Number
  }
};
</script>
