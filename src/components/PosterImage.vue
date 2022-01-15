<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-img
        :src="posterFormattedUrl"
        :lazy-src="posterFormattedUrl"
        :aspect-ratio="16 / 9"
      >
        <template v-slot:placeholder>
          <v-row class="ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey lighten-5" />
          </v-row>
        </template>
        <v-fade-transition v-if="routePath">
          <v-overlay v-if="hover" absolute color="#036358">
            <v-btn large :to="routePath">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-overlay>
        </v-fade-transition>
      </v-img>
    </template>
  </v-hover>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    routePath: String,
    imagePath: String,
  },
  data() {
    return {
      notFoundPic: require("@/assets/no-image.png"),
    };
  },
  computed: {
    ...mapState(["posterUrl"]),
    posterFormattedUrl() {
      return this.imagePath != null
        ? this.posterUrl + this.imagePath
        : this.notFoundPic;
    },
  },
};
</script>
