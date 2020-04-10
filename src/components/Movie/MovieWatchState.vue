<template>
  <div>
    <v-btn
      v-if="watched"
      light
      color="cyan"
      @click="setMovieAsNotWatched"
      :loading="loading"
    >
      <v-icon>mdi-check-all</v-icon>
    </v-btn>
    <v-btn v-if="!watched" dark @click="setMovieAsWatched" :loading="loading">
      <v-icon>mdi-check-bold</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapState } from "vuex";
import db from "@/firebase/config";

export default {
  props: {
    movie: Object
  },
  data() {
    return {
      loading: false,
      watched: false,
      watchedAt: null
    };
  },
  methods: {
    checkMovieWatchState() {
      this.loading = true;
      this.dbRef
        .get()
        .then(snapshot => {
          snapshot.forEach(snapMovie => {
            if (snapMovie.id == this.movie.id.toString()) {
              this.watched = snapMovie.data().watched;
              this.watchedAt = snapMovie.data().watchedAt;
            }
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    setMovieAsWatched() {
      this.loading = true;
      this.dbRef
        .doc(this.movie.id.toString())
        .set({
          media_id: this.movie.id,
          watched: true,
          watchedAt: new Date(Date.now()),
          title: this.movie.original_title
        })
        .then(() => {
          this.watched = true;
          this.watchedAt = new Date(Date.now());
        })
        .finally(() => {
          this.loading = false;
        });
    },
    setMovieAsNotWatched() {
      this.loading = true;
      this.dbRef
        .doc(this.movie.id.toString())
        .delete()
        .then(() => {
          this.watched = false;
          this.watchedAt = null;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  watch: {
    watched() {
      this.$emit("watchStateChanged", this.watched);
    }
  },
  created() {
    this.checkMovieWatchState();
  },
  computed: {
    ...mapState(["user"]),
    dbRef() {
      return db
        .collection("users")
        .doc(this.user.uid)
        .collection("movie");
    }
  }
};
</script>
