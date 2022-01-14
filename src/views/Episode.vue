<template>
  <v-container fluid grid-list-lg>
    <v-row>
      <v-col>
        <v-chip class="secondary text-h4" large v-if="this.episodes != null">
          <div text-h4>{{ this.episodes.length }} Folgen</div>
        </v-chip>
      </v-col>
      <v-col v-for="episode in episodes" :key="episode.id" cols="12">
        <EpisodeCard :episode="episode" />
      </v-col>
    </v-row>
  </v-container>
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
