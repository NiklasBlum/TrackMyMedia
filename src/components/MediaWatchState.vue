<template>
  <div>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <div class="split-btn">
          <v-btn v-if="!watched" @click="setMediaAsWatched" :loading="loading">
            <v-icon left>mdi-eye-check</v-icon>
            <small>Add to History</small>
          </v-btn>
          <v-btn
            v-if="watched"
            color="green accent-4"
            @click="setMediaAsNotWatched"
            :loading="loading"
          >
            <v-icon left>mdi-eye-check</v-icon>
            <small>{{ getGermanDate(watchedAt) }}</small>
          </v-btn>
          <v-btn class="actions-btn secondary" v-on="on" v-bind="attrs">
            <v-icon>mdi-calendar-clock</v-icon>
          </v-btn>
        </div>
      </template>
      <v-card class="teal">
        <div class="text-center">When did you watch this?</div>
        <v-divider></v-divider>
        <v-list align="center" class="teal">
          <v-btn>Now</v-btn>
          <v-btn>Specific date</v-btn>
          <v-btn>Now</v-btn>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<style>
.actions-btn {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: 0 !important;
  min-width: 35px !important;
  margin-left: -3.5px;
}
.split-btn {
  display: inline-block;
}
</style>
<script>
import { mapState } from "vuex";
import db from "@/firebase/config";
import dateFormatter from "@/dateFormatter";
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
      menu: null,
    };
  },
  methods: {
    getGermanDate(date) {
      return dateFormatter.getGermanDate(date);
    },
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
