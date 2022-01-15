<template>
  <v-card :class="{ 'cyan darken-4': watched, 'blue-grey darken-4': !watched }">
    <v-container fluid>
      <v-row justify="center">
        <v-col xs="12" sm="5" md="4" lg="2" align-self="center">
          <PosterImage :imagePath="episode.still_path" />
        </v-col>
        <v-col xs="12" sm="12" md="6" lg="8">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">
                Folge {{ this.episode.episode_number }}
              </v-list-item-title>
              <v-list-item-subtitle>
                Erschienen am {{ getGermanDate(episode.air_date) }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-expansion-panels>
            <v-expansion-panel class="">
              <v-expansion-panel-header>
                {{ episode.name }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                {{ this.episode.overview }}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
        <v-col xs="12" sm="12" md="2" lg="2">
          <v-btn
            elevation="24"
            v-if="!watched"
            block
            height="100%"
            @click="setEpisodeAsWatched"
            :loading="loading"
          >
            <v-icon large>mdi-eye-plus</v-icon>
          </v-btn>
          <v-btn
            elevation="24"
            :class="{ 'cyan darken-4': watched, '': !watched }"
            v-if="watched"
            block
            height="100%"
            @click="setEpisodeAsNotWatched"
            :loading="loading"
          >
            <v-icon large>mdi-eye-check</v-icon>
          </v-btn>
        </v-col>
      </v-row>
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
    PosterImage,
  },
  props: {
    episode: Object,
  },
  data() {
    return {
      panel: [0],
      loading: false,
      watched: null,
      showId: this.$route.params.id,
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
        .then((snapshot) => {
          snapshot.forEach((snapEpisode) => {
            console.log(snapEpisode);
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
    },
  },
  computed: {
    ...mapState(["posterUrlOrg", "user"]),
    dbRef() {
      return db
        .collection("users")
        .doc(this.user.uid)
        .collection("tv")
        .doc(this.showId.toString())
        .collection("seasons")
        .doc(this.episode.season_number.toString())
        .collection("episodes");
    },
  },
  created() {
    this.CheckWatchStateEpisode();
  },
};
</script>
