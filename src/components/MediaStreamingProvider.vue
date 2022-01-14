<template>
  <v-card v-if="this.providers != null" class="black">
    <v-card-title class="blue">Free Streaming</v-card-title>
    <v-card-text>
      <v-row class="text-center">
        <v-col v-for="item in this.providers" :key="item.provider_id">
          <v-chip> {{ item.provider_name }}</v-chip>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import TmdbService from "@/services/TmdbService";
export default {
  props: {
    mediaId: Number,
    mediaType: String,
  },
  data() {
    return {
      providers: null,
    };
  },
  methods: {
    async getStreamingProviders() {
      this.providers = await TmdbService.getFreeStreamingProviders(
        this.mediaType,
        this.mediaId
      );
      console.log(this.providers);
    },
  },
  created() {
    this.getStreamingProviders();
  },
};
</script>

<style>
</style>