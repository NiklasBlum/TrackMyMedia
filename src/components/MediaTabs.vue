<template>
  <v-tabs
    v-model="currentMedia"
    @change="getMedia"
    slider-color="blue"
    icons-and-text
    dark
    background-color="transparent"
  >
    <v-tabs-slider></v-tabs-slider>
    <v-tab :href="'#movie'">
      Movies
      <v-icon>mdi-movie</v-icon>
    </v-tab>

    <v-tab :href="'#tv'">
      Series
      <v-icon>mdi-television</v-icon>
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
    
};
</script>
