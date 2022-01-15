<template>
  <div>
    <v-row dense>
      <v-col>
        <v-chip class="secondary text-h5" large v-if="this.episodes != null">
          {{ this.episodes.length }} Folgen
        </v-chip>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col v-for="episode in episodes" :key="episode.id" cols="12">
        <EpisodeCard :episode="episode" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import EpisodeCard from "@/components/Series/EpisodeCard";
import TmdbService from "@/services/TmdbService";

export default {
  components: {
    EpisodeCard,
  },
  data() {
    return {
      episodes: null,
    };
  },
  methods: {
    async getEpisodes(showId, seasonNumber) {
      this.episodes = await TmdbService.getEpisodes(showId, seasonNumber);
    },
  },
  computed: mapState(["baseUrl", "currentMedia", "apiKey", "language"]),
  created() {
    this.getEpisodes(this.$route.params.id, this.$route.params.number);
  },
};
</script>
