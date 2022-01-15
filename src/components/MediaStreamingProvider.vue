<template>
  <v-card class="black">
    <v-card-title class="blue">Free Streaming</v-card-title>
    <v-card-text>
      <v-container>
        <v-row class="text-center">
          <v-col
            cols="12"
            v-for="item in this.providers"
            :key="item.provider_id"
          >
            <v-chip> {{ item.provider_name }}</v-chip>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    providers: Array,
  },
};
</script>
