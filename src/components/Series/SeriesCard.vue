<template>
  <v-card :class="{ 'cyan darken-4': watched, '': !watched }">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-img v-if="show.poster_path" :src="posterUrl + show.poster_path">
          <v-fade-transition>
            <v-overlay v-if="hover" absolute color="#036358">
              <v-btn large :to="/show/ + show.id">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-img>
        <v-img v-else :src="notFoundPic">
          <v-fade-transition>
            <v-overlay v-if="hover" absolute color="#036358">
              <v-btn large :to="/show/ + show.id">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-img>
      </template>
    </v-hover>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">{{ show.name }}</v-list-item-title>
        <v-list-item-subtitle>
          {{ getGermanDate(show.first_air_date) }}
          {{ getGermanDate(watchedAt) }}
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
import { mapState } from "vuex";
import dateFormatter from "@/dateFormatter";

export default {
  components: {
    CheckWatchList,
    MediaWatchState,
  },
  props: {
    show: Object,
  },
  data() {
    return {
      loading: false,
      watched: false,
      watchedAt: null,
      notFoundPic: require("@/assets/no-image.png"),
    };
  },
  computed: {
    ...mapState(["posterUrl"]),
  },
  methods: {
    getGermanDate(date) {
      return dateFormatter.getGermanDate(date);
    },
  },
};
</script>
