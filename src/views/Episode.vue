<template>
  <v-container fluid grid-list-lg>
    <v-layout row >
      <v-flex v-for="episode in episodes" :key="episode.id">
        <EpisodeCard :episode="episode"></EpisodeCard>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import EpisodeCard from "../components/EpisodeCard";

export default {
  components: {
    EpisodeCard
  },
  data() {
    return {
      episodes: null
    };
  },
  created() {
    this.getDetails(this.$route.params);
  },
  methods: {
    getDetails(params) {
      let searchQuery = `${this.baseUrl}tv/${params.id}/season/${params.number}?api_key=${this.apiKey}&language=${this.language}`;

      axios
        .get(searchQuery)
        .then(response => {
          console.log(response.data);
          this.episodes = response.data.episodes;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: mapState(["baseUrl", "currentMedia", "apiKey", "language"])
};
</script>

