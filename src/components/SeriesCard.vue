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
        <v-list-item-title class="headline">{{show.name}}</v-list-item-title>
        <v-list-item-subtitle>{{show.first_air_date}}</v-list-item-subtitle>
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
      <v-spacer></v-spacer>
      <CheckWatchList v-if="show" :media="show"></CheckWatchList>
    </v-card-actions>
  </v-card>
</template>

<script>
import CheckWatchList from "./CheckWatchList";
import { mapState } from "vuex";
import db from "@/firebase/init";

export default {
  components: {
    CheckWatchList
  },
  props: {
    show: Object
  },
  data() {
    return {
      watched: false,
      notFoundPic: require("../assets/no-image.png")
    };
  },
  methods: {
    checkShowWatchState() {
      db.collection("tv")
        .get()
        .then(snapshot => {
          snapshot.forEach(snapShow => {
            if (snapShow.id == this.show.id.toString()) {
              this.watched = snapShow.data().finished;
            }
          });
        });
    },
    setShowAsWatched() {
      db.collection("tv")
        .doc(this.show.id.toString())
        .set({
          finished: true,
          title: this.show.original_name
        })
        .then((this.watched = true));
    },
    setShowAsNotWatched() {
      db.collection("tv")
        .doc(this.show.id.toString())
        .update({
          finished: false
        })
        .then((this.watched = false));
    }
  },
  created() {
    console.log(this.show);
    this.checkShowWatchState();
  },
  computed: mapState(["posterUrl"])
};
</script>