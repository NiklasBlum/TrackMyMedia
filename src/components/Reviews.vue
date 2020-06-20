<template >
  <div v-if="reviews.length > 0">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header color="blue">Reviews</v-expansion-panel-header>
        <v-expansion-panel-content>
          <div v-for="item in reviews" :key="item.id">
            <v-card outlined class="my-2">
              <v-card-title>{{item.author}}</v-card-title>
              <v-card-text v-html="item.content" />
            </v-card>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  props: {
    reviews: Array
  }
};
</script>
