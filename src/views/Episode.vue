<template>
  <v-container>
    <v-layout row wrap>
      <v-flex v-for="episode in episodes" :key="episode.id">
        <EpisodeCard :episode="episode"></EpisodeCard>
        <v-divider light></v-divider>
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
      searchQuery: "",
      episodes: ""
    };
  },
  mounted() {
    this.getDetails(this.$route.params);
  },
  methods: {
    getDetails(params) {
      this.searchQuery = `${this.baseUrl}tv/${params.id}/season/${params.number}?api_key=${this.apiKey}&language=${this.language}`;
      console.log(this.searchQuery);
      axios
        .get(this.searchQuery)
        .then(response => {
          console.log(response.data);
          this.episodes = response.data.episodes;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: mapState([
    // map this.count to store.state.count
    "baseUrl",
    "currentMedia",
    "apiKey",
    "language"
  ])
};
</script>

