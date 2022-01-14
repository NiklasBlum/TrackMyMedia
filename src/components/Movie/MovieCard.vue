<template>
  <v-card
    :class="{ 'green darken-4': watched, 'blue-grey darken-4': !watched }"
  >
    <PosterImage
      :imagePath="movie.poster_path"
      :mediaType="'movie'"
      :routePath="/movie/ + movie.id"
    />
    <v-list-item>
      <v-list-item-avatar>
        <MediaRating :AverageVote="movie.vote_average" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="title">{{ movie.title }}</v-list-item-title>
        <v-list-item-subtitle>
          {{ getGermanDate(movie.release_date) }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider />
    <v-card-actions>
      <MediaWatchState
        :media="movie"
        :mediaType="'movie'"
        @watchStateChanged="watched = $event"
      />
      <v-spacer />
      <CheckWatchList :media="movie" :mediaType="'movie'" />
    </v-card-actions>
  </v-card>
</template>

<script>
import PosterImage from "@/components/PosterImage.vue";
import CheckWatchList from "@/components/CheckWatchList";
import MediaWatchState from "@/components/MediaWatchState.vue";
import MediaRating from "@/components/MediaRating.vue";
import dateFormatter from "@/dateFormatter";

export default {
  components: {
    CheckWatchList,
    MediaWatchState,
    MediaRating,
    PosterImage,
  },
  props: {
    movie: Object,
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
