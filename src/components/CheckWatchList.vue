<template>
  <div>
    <v-btn v-if="onWatchlist" color="cyan" :loading="loading" @click="removeFromWatchList">
      <v-icon>mdi-clock</v-icon>
    </v-btn>

    <v-btn v-if="!onWatchlist" :loading="loading" @click="addToWatchlist">
      <v-icon>mdi-clock</v-icon>
    </v-btn>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  props: ["media"],
  data() {
    return {
      loading: false,
      onWatchlist: false
    };
  },
  methods: {
    addToWatchlist() {
      this.loading = true;

      let searchQuery = `${this.baseAccountUrl}${this.accountId}/watchlist?api_key=${this.apiKey}&session_id=${this.sessionId}`;
      axios
        .post(searchQuery, {
          media_type: this.currentMedia,
          media_id: this.media.id,
          watchlist: true
        })
        .then(() => {
          this.checkWatchList();
        })

        .catch(error => {
          console.log(error);
        });
      this.loading = false;
    },
    removeFromWatchList() {
      this.loading = true;
      this.searchQuery = `${this.baseAccountUrl}${this.accountId}/watchlist?api_key=${this.apiKey}&session_id=${this.sessionId}`;
      axios
        .post(this.searchQuery, {
          media_type: this.currentMedia,
          media_id: this.media.id,
          watchlist: false
        })
        .then(response => {
          console.log(response);
          this.checkWatchList();
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
      this.loading = false;
    },
    checkWatchList() {
      this.loading = true;
      this.searchQuery = `${this.baseUrl}${this.currentMedia}/${this.media.id}/account_states?api_key=${this.apiKey}&session_id=${this.sessionId}`;
      axios
        .get(this.searchQuery)
        .then(response => {
          this.onWatchlist = response.data.watchlist;
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
        });
    }
  },
  mounted() {
    this.checkWatchList();
  },
  computed: mapState([
    "baseUrl",
    "baseAccountUrl",
    "apiKey",
    "currentMedia",
    "apiKey",
    "sessionId",
    "accountId"
  ])
};
</script>

