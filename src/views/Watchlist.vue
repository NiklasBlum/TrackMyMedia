<template>
  <div>
    <v-row no-gutters>
      <v-col align="center" class="mb-4">
        <MediaFilter @currentMediaChanged="getWatchlistFromFirestore" />
      </v-col>
    </v-row>
    <v-row class="align-center justify-space-around">
      <v-col
        sm="6"
        md="4"
        lg="3"
        v-for="mediaItem in tmdbMedia"
        :key="mediaItem.id"
      >
        <MediaCard :media="mediaItem" :mediaType="currentMedia" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MediaFilter from "@/components/MediaFilter";
import MediaCard from "@/components/MediaCard.vue";
import axios from "axios";
import { mapState } from "vuex";
import db from "@/firebase/config";

export default {
  components: {
    MediaFilter,
    MediaCard,
  },
  data() {
    return {
      fireBaseMedia: [],
      tmdbMedia: [],
    };
  },
  methods: {
    getWatchlistFromFirestore() {
      this.tmdbMedia = [];
      this.fireBaseMedia = [];
      db.collection("users")
        .doc(this.user.uid)
        .collection("watchlist")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            if (
              doc.data().media_type == this.currentMedia &&
              doc.data().watchlist == true
            ) {
              this.fireBaseMedia.push(doc.data());
              this.getMediaFromTmdb(doc.data().media_id);
            }
          });
        });
    },
    getMediaFromTmdb(id) {
      let query = `${this.baseUrl}${this.currentMedia}/${id}?api_key=${this.apiKey}&language=${this.language}`;
      axios
        .get(query)
        .then((response) => {
          this.tmdbMedia.push(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: mapState([
    "baseUrl",
    "posterUrl",
    "currentMedia",
    "apiKey",
    "language",
    "user",
  ]),
  created() {
    this.getWatchlistFromFirestore();
  },
};
</script>
