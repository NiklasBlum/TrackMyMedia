<template>
  <v-container fluid grid-list-lg>
    <v-row>
      <v-col v-for="episode in episodes" :key="episode.id">
        <EpisodeCard :episode="episode"></EpisodeCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import EpisodeCard from "@/components/Series/EpisodeCard";

export default {
  components: {
    EpisodeCard
  },
  data() {
    return {
      episodes: null
    };
  },
  methods: {
    getDetails(params) {
      let searchQuery = `${this.baseUrl}tv/${params.id}/season/${params.number}?api_key=${this.apiKey}&language=${this.language}`;
      axios
        .get(searchQuery)
        .then(response => {
          this.episodes = response.data.episodes;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: mapState(["baseUrl", "currentMedia", "apiKey", "language"]),
  created() {
    this.getDetails(this.$route.params);
  }
};
</script>
