<template>
  <v-container grid-list-lg fluid>
    <v-layout justify-center row>
      <v-flex xs8 sm4 md3 lg3 v-for="item in 5" :key="item.id">
        <v-card>
          <v-container fluid>
            <v-layout row>
              <v-flex xs12>
                <v-img src="https://image.tmdb.org/t/p/original/vFOnUUCWGWpbCmGvCpCkPxB2KJd.jpg"></v-img>
              </v-flex>
              <v-flex>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="headline">titasdfffffffffffffffffffffle</v-list-item-title>
                    <v-list-item-subtitle>2019</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-flex>
              <v-flex xs4>
                <v-btn block>
                  <v-icon>mdi-check-all</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs4>
                <v-btn block>
                  <v-icon>mdi-clock</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs4>
                <v-btn block to>
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>