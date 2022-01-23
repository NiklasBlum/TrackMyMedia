<template>
  <div>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <div class="split-btn">
          <v-btn
            v-if="!watched"
            @click="setMediaWatchState(true)"
            :loading="loading"
          >
            <v-icon left>mdi-eye-check</v-icon>
            <small>Add to History</small>
          </v-btn>
          <v-btn
            v-if="watched"
            color="green accent-4"
            @click="setMediaWatchState(false)"
            :loading="loading"
          >
            <v-icon left>mdi-eye-check</v-icon>
            <small>{{ getGermanDate(watchedAt) }}</small>
          </v-btn>
          <v-btn class="actions-btn secondary" v-on="on" v-bind="attrs">
            <v-icon>mdi-calendar-clock</v-icon>
          </v-btn>
        </div>
      </template>
      <v-card class="teal">
        <div class="text-center">When did you watch this?</div>
        <v-divider></v-divider>
        <v-list align="center" class="teal">
          <v-btn>Now</v-btn>
          <v-btn>Specific date</v-btn>
          <v-btn>Now</v-btn>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<style>
.actions-btn {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: 0 !important;
  min-width: 35px !important;
  margin-left: -3.5px;
}
.split-btn {
  display: inline-block;
}
</style>
<script>
import { mapState } from "vuex";
import dateFormatter from "@/dateFormatter";
import FirestoreService from "@/services/FirestoreService.js";

export default {
  props: {
    media: Object,
    mediaType: String,
  },
  data() {
    return {
      loading: false,
      watched: false,
      watchedAt: null,
      menu: null,
    };
  },
  methods: {
    getGermanDate(date) {
      return dateFormatter.getGermanDate(date);
    },
    checkMediaWatchState() {
      this.loading = true;
      FirestoreService.getMediaWatchState(this.media.id, this.mediaType)
        .then((res) => {
          (this.watched = res.watched), (this.watchedAt = res.watchedAt);
        })
        .finally(() => (this.loading = false));
    },
    setMediaWatchState(watchState) {
      this.loading = true;
      FirestoreService.setMediaWatchState(
        this.media,
        this.mediaType,
        watchState
      )
        .then(() => {
          (this.watched = watchState),
            (this.watchedAt = watchState ? new Date(Date.now()) : null);
        })
        .finally(() => (this.loading = false));
    },
  },
  watch: {
    watched() {
      this.$emit("watchStateChanged", this.watched);
    },
  },
  created() {
    this.checkMediaWatchState();
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>
