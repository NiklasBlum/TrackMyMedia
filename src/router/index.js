import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/search",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '*',
    redirect: '/search'
  },
  {
    path: '/',
    redirect: '/search'
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("../views/Auth.vue")
  },

  {
    path: "/discover",
    name: "discover",
    component: () => import("../views/Discover.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/watchlist",
    name: "watchlist",
    component: () => import("../views/Watchlist.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/popular",
    name: "popular",
    component: () => import("../views/Popular.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/watched",
    name: "watched",
    component: () => import("../views/Watched.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/movie/:id",
    name: "movie",
    component: () => import("../views/Movie.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/show/:id",
    name: "show",
    component: () => import("../views/Show.vue"),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/show/:id/season/:number",
    name: "season",
    component: () => import("../views/Episode.vue"),
    meta: {
      requiresAuth: true
    }
  },
];


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next("auth");
  else if (!requiresAuth && currentUser) next("home");
  else next();
});

export default router;
