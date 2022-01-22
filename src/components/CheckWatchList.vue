<template>
  <div>
    <v-btn
      v-if="onWatchlist"
      light
      color="cyan"
      :loading="loading"
      @click="removeFromWatchList"
    >
      <v-icon>mdi-clock-check</v-icon>
    </v-btn>
    <v-btn v-if="!onWatchlist" :loading="loading" @click="addToWatchlist">
      <v-icon>mdi-clock-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapState } from "vuex";
import FirestoreService from "@/services/FirestoreService.js";

export default {
  props: {
    media: Object,
    mediaType: String,
  },
  data() {
    return {
      loading: false,
      onWatchlist: false,
    };
  },
  methods: {
    checkWatchList() {
      this.loading = true;
      FirestoreService.getIsOnWatchlist(this.media.id, this.mediaType)
        .then((onWatchlist) => {
          this.onWatchlist = onWatchlist;
        })
        .finally(() => (this.loading = false));
    },
    addToWatchlist() {
      this.loading = true;
      FirestoreService.setMediaWatchlistState(
        this.media.id,
        this.mediaType,
        true
      )
        .then((this.onWatchlist = true))
        .finally(() => (this.loading = false));
    },
    removeFromWatchList() {
      this.loading = true;
      FirestoreService.setMediaWatchlistState(
        this.media.id,
        this.mediaType,
        false
      )
        .then((this.onWatchlist = false))
        .finally(() => (this.loading = false));
    },
  },
  created() {
    this.checkWatchList();
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>
