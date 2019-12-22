<template>
  <v-card :class="{ 'cyan darken-4': watched, '': !watched }">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-img v-if="show.poster_path" :src="posterUrl + show.poster_path">
          <v-fade-transition>
            <v-overlay v-if="hover" absolute color="#036358">
              <v-btn large :to="/show/ + show.id">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-img>
        <v-img v-else :src="notFoundPic">
          <v-fade-transition>
            <v-overlay v-if="hover" absolute color="#036358">
              <v-btn large :to="/show/ + show.id">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-img>
      </template>
    </v-hover>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">{{ show.name }}</v-list-item-title>
        <v-list-item-subtitle>
          {{ getHumanDate(show.first_air_date) }}
          {{ getHumanDate(watchedAt) }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn v-if="watched" color="cyan darken-4" @click="setShowAsNotWatched">
        <v-icon>mdi-check-all</v-icon>
      </v-btn>
      <v-btn v-if="!watched" @click="setShowAsWatched">
        <v-icon>mdi-check-bold</v-icon>
      </v-btn>
      <v-spacer />
      <CheckWatchList :media="show" :mediaType="'tv'" />
    </v-card-actions>
  </v-card>
</template>

<script>
import CheckWatchList from "./CheckWatchList";
import { mapState } from "vuex";
import db from "@/firebase/firestore";
import moment from "moment";

export default {
  components: {
    CheckWatchList
  },
  props: {
    show: Object
  },
  data() {
    return {
      loading: false,
      watched: false,
      watchedAt: null,
      notFoundPic: require("../assets/no-image.png")
    };
  },
  methods: {
    getHumanDate(date) {
      if (date) {
        if (date.seconds) {
          return moment(date.seconds * 1000).format("DD.MM.YYYY");
        } else {
          return moment(date).format("DD.MM.YYYY");
        }
      } else {
        return "-";
      }
    },
    checkShowWatchState() {
      this.loading = true;
      db.collection("tv")
        .get()
        .then(snapshot => {
          snapshot.forEach(snapShow => {
            if (snapShow.id == this.show.id.toString()) {
              this.watched = snapShow.data().watched;
              this.watchedAt = snapShow.data().watchedAt;
            }
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    setShowAsWatched() {
      this.loading = true;
      db.collection("tv")
        .doc(this.show.id.toString())
        .set({
          media_id: this.show.id,
          watched: true,
          watchedAt: new Date(Date.now()),
          title: this.show.original_name
        })
        .then(() => {
          this.watched = true;
          this.watchedAt = new Date(Date.now());
        })
        .finally(() => {
          this.loading = false;
        });
    },
    setShowAsNotWatched() {
      this.loading = true;
      db.collection("tv")
        .doc(this.show.id.toString())
        .update({
          watched: false,
          watchedAt: null
        })
        .then(() => {
          this.watched = false;
          this.watchedAt = null;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  created() {
    this.checkShowWatchState();
  },
  computed: mapState(["posterUrl"])
};
</script>
