<template>
  <div>
    <v-btn
      v-if="onWatchlist"
      light
      color="cyan"
      :loading="loading"
      @click="setWatchlist(false)"
    >
      <v-icon>mdi-clock-check</v-icon>
    </v-btn>
    <v-btn v-if="!onWatchlist" :loading="loading" @click="setWatchlist(true)">
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
    getWatchList() {
      this.loading = true;
      FirestoreService.getWatchlistState(this.media.id, this.mediaType)
        .then((onWatchlist) => {
          this.onWatchlist = onWatchlist;
        })
        .finally(() => (this.loading = false));
    },
    setWatchlist(setState) {
      this.loading = true;
      FirestoreService.setWatchlistState(this.media, this.mediaType, setState)
        .then((this.onWatchlist = setState))
        .finally(() => (this.loading = false));
    },
  },
  created() {
    this.getWatchList();
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>
