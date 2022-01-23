<template>
  <v-card
    :class="{ 'green darken-4': watched, 'blue-grey darken-4': !watched }"
  >
    <PosterImage
      :imagePath="media.poster_path"
      :mediaType="mediaType"
      :routePath="
        '/' + (mediaType == 'movie' ? 'movie' : 'show') + '/' + media.id
      "
    />
    <v-list-item>
      <v-list-item-avatar>
        <MediaRating :AverageVote="media.vote_average" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="title">
          {{ mediaType == "movie" ? media.title : media.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{
            mediaType == "movie"
              ? getGermanDate(media.release_date)
              : getGermanDate(media.first_air_date)
          }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider />
    <v-card-actions>
      <MediaWatchState
        :media="media"
        :mediaType="mediaType"
        @watchStateChanged="watched = $event"
      />
      <v-spacer />
      <CheckWatchList :media="media" :mediaType="mediaType" />
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
    media: Object,
    mediaType: String,
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
