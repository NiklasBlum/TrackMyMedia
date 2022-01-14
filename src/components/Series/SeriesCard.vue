<template>
  <v-card
    :class="{ 'green darken-4': watched, 'blue-grey darken-4': !watched }"
  >
    <PosterImage :imagePath="show.poster_path" :routePath="/show/ + show.id" />
    <v-list-item>
      <v-list-item-avatar>
        <MediaRating :AverageVote="show.vote_average" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="title">{{ show.name }}</v-list-item-title>
        <v-list-item-subtitle>
          {{ getGermanDate(show.first_air_date) }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider />
    <v-card-actions>
      <MediaWatchState
        :media="show"
        :mediaType="'tv'"
        @watchStateChanged="watched = $event"
      />
      <v-spacer />
      <CheckWatchList :media="show" :mediaType="'tv'" />
    </v-card-actions>
  </v-card>
</template>

<script>
import MediaWatchState from "@/components/MediaWatchState.vue";
import CheckWatchList from "@/components/CheckWatchList";
import dateFormatter from "@/dateFormatter";
import PosterImage from "@/components/PosterImage.vue";
import MediaRating from "@/components/MediaRating.vue";
export default {
  components: {
    CheckWatchList,
    MediaWatchState,
    PosterImage,
    MediaRating,
  },
  props: {
    show: Object,
  },
  data() {
    return {
      watched: false,
    };
  },
  methods: {
    getGermanDate(date) {
      return dateFormatter.getGermanDate(date);
    },
  },
};
</script>
