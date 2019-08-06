import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/card",
      name: "card",
      component: () => import("./components/Card.vue")
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/discover",
      name: "discover",
      component: () => import("./views/Discover.vue")
    },
    {
      path: "/watchlist",
      name: "watchlist",
      component: () => import("./views/Watchlist.vue")
    },
    {
      path: "/popular",
      name: "popular",
      component: () => import("./views/Popular.vue")
    },
    {
      path: "/watched",
      name: "watched",
      component: () => import("./views/Watched.vue")
    },
    {
      path: "/movie/:id",
      name: "movie",
      component: () => import("./views/Movie.vue")
    },
    {
      path: "/show/:id",
      name: "show",
      component: () => import("./views/Show.vue")
    },
    {
      path: "/show/:id/season/:number",
      name: "season",
      component: () => import("./views/Episode.vue")
    }
  ]
});
