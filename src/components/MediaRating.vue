<template>
  <v-progress-circular
    rotate="-90"
    size="40"
    width="5"
    :value="AverageVote * 10"
    :color="AverageVote * 10 >= 75 ? 'green' : 'red darken-1'"
  >
    {{ AverageVote * 10 }}
  </v-progress-circular>
</template>

<script>
export default {
  props: {
    AverageVote: Number,
  },
};
</script>
