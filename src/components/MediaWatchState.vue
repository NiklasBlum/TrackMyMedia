<template>
  <div>
    <v-btn v-if="watched"  color="cyan darken-4" @click="setAsNotWatched">
      <v-icon>mdi-check-all</v-icon>
    </v-btn>
    <v-btn v-if="!watched"  @click="setAsWatched">
      <v-icon>mdi-check-bold</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapState } from "vuex";
import db from "@/firebase/init";

export default {
  props: {
    media: Object
  },
  data() {
    return {
      watched: false,
      fsMediaId: null
    };
  },
  methods: {
    setAsWatched() {
      if (this.media) {
        db.collection(this.currentMedia)
          .doc(this.media.id.toString())
          .set({})
          .then(() => {
            this.fsMediaId = this.media.id.toString();
            //computed Property?
            //Maybe add banner?
            this.watched = true;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    setAsNotWatched() {
      //delete doc from firestore
      db.collection(this.currentMedia)
        .doc(this.fsMediaId)
        .delete()
        .then(() => {
          this.watched = false;
        });
    },
    checkWatchState() {
      //fetch data from  the firestore
      db.collection(this.currentMedia)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let docMedia = doc.data();
            docMedia.id = doc.id;
            if (this.media.id == docMedia.id) {
              this.watched = true;
              this.fsMediaId = this.media.id.toString();
              return;
            }
          });
        });
    }
  },
  created() {
    this.checkWatchState();
  },
  computed: mapState(["currentMedia"])
};
</script>