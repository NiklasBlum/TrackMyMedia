<template>
  <div>
    <div v-if="watched">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn fab small color="success" v-on="on" @click="setAsNotWatched">
            <v-icon>mdi-check-all</v-icon>
          </v-btn>
        </template>
        <span>Set as not watched</span>
      </v-tooltip>
    </div>
    <div v-else>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn fab small color="grey" v-on="on" @click="setAsWatched">
            <v-icon>mdi-check-bold</v-icon>
          </v-btn>
        </template>
        <span>Set as watched</span>
      </v-tooltip>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import db from "@/firebase/init";

export default {
  props: {
    movie: Object
  },
  data() {
    return {
      watched: false,
      docMovie: null
    };
  },
  methods: {
    setAsWatched() {
      if (this.movie) {
        db.collection("movies")
          .add({
            title: this.movie.title,
            MovieId: this.movie.id
          })
          .then(() => {
            //Maybe add banner?
            console.log("success!");
            this.watched = true;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback("Enter a smoothie title!");
      }
    },
    setAsNotWatched() {
      //delete doc from firestore
      db.collection("movies")
        .doc(this.docMovie.id)
        .delete()
        .then(() => {
          this.watched = false;
        });
    },
    checkWatchState() {
      //fetch data from  the firestore
      db.collection("movies")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let docMovie = doc.data();
            docMovie.id = doc.id;
            if (this.movie.id == docMovie.MovieId) {
              this.watched = true;
              this.docMovie = docMovie;
              return;
            }
          });
        });
    }
  },
  created() {
    console.log(this.movie);
    this.checkWatchState();
  }
};
</script>
