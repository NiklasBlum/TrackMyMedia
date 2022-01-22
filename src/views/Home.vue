<template>
  <div>
    <v-row no-gutters>
      <v-col align="center">
        <MediaFilter
          @currentMediaChanged="searchText !== '' ? getMedia() : ''"
        />
      </v-col>
      <v-col cols="12" class="mt-4">
        <v-text-field
          light
          background-color="white"
          rounded
          filled
          dense
          label="Search"
          hide-details
          :placeholder="'Search for ' + this.currentMedia + ' and press enter.'"
          v-model="searchText"
          @keyup.enter="searchText !== '' ? getMedia() : ''"
          :loading="loading"
          prepend-inner-icon="mdi-magnify"
        />
      </v-col>
    </v-row>
    <div v-if="searchText !== ''">
      <v-row>
        <v-col
          sm="6"
          md="4"
          lg="3"
          xl="2"
          v-for="mediaItem in media"
          :key="mediaItem.id"
        >
          <MediaCard :media="mediaItem" :mediaType="currentMedia" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MediaFilter from "@/components/MediaFilter";
import MediaCard from "@/components/MediaCard";
import { mapState } from "vuex";

export default {
  components: {
    MediaFilter,
    MediaCard,
  },
  data() {
    return {
      searchText: "",
      media: [],
      loading: false,
    };
  },
  methods: {
    getMedia() {
      this.loading = true;
      let searchQuery = `${this.baseSearchUrl}${this.currentMedia}?api_key=${this.apiKey}&language=${this.language}&query=${this.searchText}`;
      axios
        .get(searchQuery)
        .then((response) => {
          this.media = response.data.results;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  computed: mapState(["baseSearchUrl", "apiKey", "currentMedia", "language"]),
};
</script>
