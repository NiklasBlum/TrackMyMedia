<template>
  <div>
    <v-btn
      v-if="onWatchlist"
      light
      color="cyan"
      :loading="loading"
      @click="removeFromWatchList"
    >
      <v-icon>mdi-clock</v-icon>
    </v-btn>
    <v-btn v-if="!onWatchlist" :loading="loading" @click="addToWatchlist">
      <v-icon>mdi-clock</v-icon>
    </v-btn>
  </div>
</template>

<script>
import db from "@/firebase/config";
import { mapState } from "vuex";

export default {
  props: {
    media: Object,
    mediaType: String
  },
  data() {
    return {
      loading: false,
      onWatchlist: false
    };
  },
  methods: {
    checkWatchList() {
      this.loading = true;
      this.dbRef
        .get()
        .then(snapshot => {
          snapshot.forEach(snap => {
            if (snap.id == this.media.id.toString()) {
              this.onWatchlist = snap.data().watchlist;
            }
          });
        })
        .finally(() => (this.loading = false));
    },
    addToWatchlist() {
      this.loading = true;
      this.dbRef
        .doc(this.media.id.toString())
        .set({
          media_type: this.mediaType,
          watchlist: true,
          media_id: this.media.id
        })
        .then((this.onWatchlist = true))
        .finally(() => (this.loading = false));
    },
    removeFromWatchList() {
      this.loading = true;
      this.dbRef
        .doc(this.media.id.toString())
        .update({
          watchlist: false
        })
        .then((this.onWatchlist = false))
        .finally(() => (this.loading = false));
    }
  },
  created() {
    this.checkWatchList();
  },
  computed: {
    ...mapState(["user"]),
    dbRef() {
      return db
        .collection("users")
        .doc(this.user.uid)
        .collection("watchlist");
    }
  }
};
</script>
