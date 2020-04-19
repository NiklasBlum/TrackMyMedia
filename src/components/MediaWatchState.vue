<template>
  <div>
    <v-btn
      v-if="watched"
      light
      color="cyan"
      @click="setMediaAsNotWatched"
      :loading="loading"
    >
      <v-icon>mdi-check-all</v-icon>
    </v-btn>
    <v-btn v-if="!watched" dark @click="setMediaAsWatched" :loading="loading">
      <v-icon>mdi-check-bold</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapState } from "vuex";
import db from "@/firebase/config";

export default {
  props: {
    media: Object,
    mediaType: String,
  },
  data() {
    return {
      loading: false,
      watched: false,
      watchedAt: null,
    };
  },
  methods: {
    checkMediaWatchState() {
      this.loading = true;
      this.dbRef
        .get()
        .then((snapshot) => {
          snapshot.forEach((snapItem) => {
            if (snapItem.id == this.media.id.toString()) {
              this.watched = snapItem.data().watched;
              this.watchedAt = snapItem.data().watchedAt;
            }
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    setMediaAsWatched() {
      let mediaTitle;
      if (this.media.title) {
        mediaTitle = this.media.title;
      }
      if (this.media.name) {
        mediaTitle = this.media.name;
      }
      this.loading = true;
      this.dbRef
        .doc(this.media.id.toString())
        .set({
          media_id: this.media.id,
          watched: true,
          watchedAt: new Date(Date.now()),
          title: mediaTitle,
        })
        .then(() => {
          this.watched = true;
          this.watchedAt = new Date(Date.now());
        })
        .finally(() => {
          this.loading = false;
        });
    },
    setMediaAsNotWatched() {
      this.loading = true;
      this.dbRef
        .doc(this.media.id.toString())
        .delete()
        .then(() => {
          this.watched = false;
          this.watchedAt = null;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  watch: {
    watched() {
      this.$emit("watchStateChanged", this.watched);
    },
  },
  created() {
    this.checkMediaWatchState();
  },
  computed: {
    ...mapState(["user"]),
    dbRef() {
      return db
        .collection("users")
        .doc(this.user.uid)
        .collection(this.mediaType);
    },
  },
};
</script>
