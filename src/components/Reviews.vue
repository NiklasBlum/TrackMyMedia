<template >
  <div v-if="reviews.length > 0">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header color="blue">
          Reviews
          <span>
            <v-chip class="ms-2">{{ reviews.length }}</v-chip>
          </span>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="black py-4">
          <v-row>
            <v-col cols="12" v-for="review in reviews" :key="review.id">
              <v-card elevation="24">
                <v-card-title class="teal darken-4">
                  {{ review.author }} ({{ getGermanDate(review.created_at) }})
                </v-card-title>
                <v-card-text class="py-3" v-html="review.content" />
              </v-card>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import dateFormatter from "@/dateFormatter";
export default {
  props: {
    reviews: Array,
  },
  methods: {
    getGermanDate(date) {
      return dateFormatter.getGermanDate(date);
    },
  },
};
</script>
