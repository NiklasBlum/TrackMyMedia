<template>
  <div>
    <v-row no-gutters>
      <v-col align="center" class="mb-4">
        <MediaFilter @currentMediaChanged="getPopular" />
      </v-col>
    </v-row>
    <v-row class="align-center justify-space-around">
      <v-col
        sm="6"
        md="3"
        lg="3"
        v-for="mediaItem in media"
        :key="mediaItem.id"
      >
        <MediaCard :media="mediaItem" :mediaType="currentMedia" />
      </v-col>
    </v-row>

    <v-layout mt-5 justify-center>
      <Pagination @pageChanged="pageChanged" v-show="showPagination" />
    </v-layout>
  </div>
</template>

<script>
import Pagination from "@/components/Navigation/Pagination.vue";
import MediaFilter from "@/components/MediaFilter";
import MediaCard from "@/components/MediaCard.vue";
import axios from "axios";
import { mapState } from "vuex";

export default {
  components: {
    MediaCard,
    MediaFilter,
    Pagination,
  },
  data() {
    return {
      media: null,
      showPagination: false,
      page: 1,
    };
  },
  methods: {
    pageChanged(page) {
      this.page = page;
      this.getPopular();
    },
    getPopular() {
      this.showPagination = false;
      this.media = null;
      let searchQuery = `${this.baseUrl}${this.currentMedia}/popular?api_key=${this.apiKey}&language=${this.language}&page=${this.page}`;
      axios
        .get(searchQuery)
        .then((response) => {
          this.media = response.data.results;
        })
        .finally(() => {
          this.showPagination = true;
        });
    },
  },
  created() {
    this.getPopular();
  },
  computed: mapState(["baseUrl", "apiKey", "currentMedia", "language"]),
};
</script>
