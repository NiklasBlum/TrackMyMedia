<template>
  <div>
    <v-row no-gutters>
      <v-col align="center" class="mb-4">
        <MediaFilter @currentMediaChanged="getMediaFromFireStore" />
      </v-col>
    </v-row>
    <v-row class="align-center justify-space-around">
      <v-col
        sm="6"
        md="4"
        lg="3"
        xl="2"
        v-for="mediaItem in tmdbMedia"
        :key="mediaItem.id"
      >
        <MediaCard :media="mediaItem" :mediaType="currentMedia" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import db from "@/firebase/config";
import MediaFilter from "@/components/MediaFilter.vue";
import MediaCard from "@/components/MediaCard.vue";
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
    //TODO: new Firebase method to get all media Ids where watched=true
    getMediaFromFireStore() {
      this.tmdbMedia = [];
      this.fireBaseMedia = [];
      this.dbRef.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().watched == true) {
            this.fireBaseMedia.push(doc.data());
            this.getMediaFromTmdb(doc.data().media_id);
          }
        });
      });
    },
    //TODO: auslagern in TmdbService
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
  created() {
    this.getMediaFromFireStore();
  },
  computed: {
    ...mapState([
      "baseUrl",
      "posterUrl",
      "currentMedia",
      "apiKey",
      "language",
      "user",
    ]),
    dbRef() {
      return db
        .collection("users")
        .doc(this.user.uid)
        .collection(this.currentMedia)
        .orderBy("title")
        .limit(30);
    },
  },
};
</script>
