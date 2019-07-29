import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: "https://api.themoviedb.org/3/",
    baseAccountUrl: "https://api.themoviedb.org/3/account/",
    baseDiscoverUrl: "https://api.themoviedb.org/3/discover/",
    baseSearchUrl: "https://api.themoviedb.org/3/search/",
    posterUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2",
    posterUrlOrg: "https://image.tmdb.org/t/p/original",
    currentMedia: "movie",
    language: "de-DE",
    searchText: "",
    apiKey: "1f8b7310d5aba63d03369c54c3e4ccd5",
    sessionId: "ced41823e994afd59517d8bcd13c48e36a9a906d",
    accountId: "8149935",
    media: [],
    darkMode: true,

  },
  mutations: {
    setLightMode(state, mode) {
      state.darkMode = mode
    },
    setCurrentMedia(state, media) {
      state.currentMedia = media
    },
    setSearchText(state, text) {
      state.searchText = text;
    },
    setMediaData(state, mediaData) {
      state.media = mediaData;
    },
  },
})
