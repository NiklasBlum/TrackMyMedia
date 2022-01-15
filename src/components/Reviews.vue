<template >
  <div v-if="reviews.length > 0">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header color="blue">
          Reviews
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row dense>
            <v-col cols="12" v-for="review in reviews" :key="review.id">
              <v-card elevation="24">
                <v-card-title>
                  {{ review.author }} ({{ getGermanDate(review.created_at) }})
                </v-card-title>
                <v-card-text v-html="review.content" />
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
