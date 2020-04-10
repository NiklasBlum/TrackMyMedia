<template>
  <v-card :class="{ 'cyan darken-4': watched, '': !watched }">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-img v-if="movie.poster_path" :src="posterUrl + movie.poster_path">
          <v-fade-transition>
            <v-overlay v-if="hover" absolute color="#036358">
              <v-btn large :to="/movie/ + movie.id">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-img>
        <v-img v-else :src="notFoundPic">
          <v-fade-transition>
            <v-overlay v-if="hover" absolute color="#036358">
              <v-btn large :to="{ path: `movie/${movie.id}` }">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-img>
      </template>
    </v-hover>
    <v-list-item>
      <v-list-item-avatar>
        <MediaRating :AverageVote="movie.vote_average" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="title">
          {{ movie.original_title }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ getGermanDate(movie.release_date) }}
          <!-- {{ getHumanDate(watchedAt) }} -->
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider />
    <v-card-actions>
      <MovieWatchState :movie="movie" @watchStateChanged="watched = $event" />
      <v-spacer />
      <CheckWatchList :media="movie" :mediaType="'movie'" />
    </v-card-actions>
  </v-card>
</template>

<script>
import CheckWatchList from "@/components/CheckWatchList";
import MovieWatchState from "@/components/Movie/MovieWatchState.vue";
import MediaRating from "@/components/MediaRating.vue";
import { mapState } from "vuex";
import dateFormatter from "@/dateFormatter";

export default {
  components: {
    CheckWatchList,
    MovieWatchState,
    MediaRating
  },
  props: {
    movie: Object
  },
  data() {
    return {
      watched: false,
      watchedAt: null,
      notFoundPic: require("@/assets/no-image.png")
    };
  },
  methods: {
    getGermanDate(date) {
      return dateFormatter.getGermanDate(date);
    }
  },
  computed: {
    ...mapState(["posterUrl"])
  }
};
</script>
