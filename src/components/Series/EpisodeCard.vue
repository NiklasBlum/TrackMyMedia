<template>
  <v-card :class="{ 'cyan darken-4': watched, '': !watched }">
    <v-container fluid>
      <v-layout row justify-center>
        <v-flex xs12 sm5 md4 lg3 align-self-center grow>
          <PosterImage :imagePath="episode.still_path" />
          <!-- <v-img :src="this.posterUrlOrg + this.episode.still_path" /> -->
        </v-flex>
        <v-flex xs12 sm12 md6 lg7>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">{{ episode.name }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ getGermanDate(episode.air_date) }}
                <!-- {{ getHumanDate(watchedAt) }} -->
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-card-text>{{ this.episode.overview }}</v-card-text>
        </v-flex>
        <v-flex xs12 sm12 md2 lg2>
          <v-btn
            v-if="!watched"
            block
            height="100%"
            @click="setEpisodeAsWatched"
            :loading="loading"
          >
            <v-icon large>mdi-check-all</v-icon>
          </v-btn>
          <v-btn
            v-if="watched"
            block
            height="100%"
            @click="setEpisodeAsNotWatched"
            :loading="loading"
          >
            <v-icon large>mdi-cancel</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import db from "@/firebase/config";
import dateFormatter from "@/dateFormatter";
import PosterImage from "@/components/PosterImage.vue";
export default {
  components: {
    PosterImage
  },
  props: {
    episode: Object
  },
  data() {
    return {
      loading: false,
      watched: null
    };
  },
  methods: {
    getGermanDate(date) {
      return dateFormatter.getGermanDate(date);
    },
    CheckWatchStateEpisode() {
      this.loading = true;
      this.dbRef
        .get()
        .then(snapshot => {
          snapshot.forEach(snapEpisode => {
            if (snapEpisode.id == this.episode.episode_number.toString()) {
              this.watched = true;
            }
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    setEpisodeAsWatched() {
      this.loading = true;
      this.dbRef
        .doc(this.episode.episode_number.toString())
        .set({})
        .then((this.watched = true))
        .finally(() => {
          this.loading = false;
        });
    },
    setEpisodeAsNotWatched() {
      this.dbRef
        .doc(this.episode.episode_number.toString())
        .delete()
        .then((this.watched = false))
        .finally(() => {
          this.loading = false;
        });
    }
  },
  computed: {
    ...mapState(["posterUrlOrg", "user"]),
    dbRef() {
      return db
        .collection("users")
        .doc(this.user.uid)
        .collection("tv")
        .doc(this.episode.show_id.toString())
        .collection("seasons")
        .doc(this.episode.season_number.toString())
        .collection("episodes");
    }
  },
  created() {
    this.CheckWatchStateEpisode();
  }
};
</script>
