<template>
  <nav>
    <v-app-bar flat>
      <v-app-bar-nav-icon @click="sideNav = !sideNav"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          <v-icon left>mdi-radar</v-icon>Track My Media
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        class="hidden-sm-and-down"
        v-for="item in menuItems"
        :key="item.title"
        :to="item.link"
      >
        <v-icon left>{{item.icon}}</v-icon>
        {{item.title}}
      </v-btn>
      <v-icon @click="changeLightMode">mdi-brightness-2</v-icon>
    </v-app-bar>
    <v-navigation-drawer class="indigo darken-4" v-model="sideNav" absolute temporary>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            :value="item.title"
            :to="item.link"
          >
            <v-list-item-title>
              <v-icon left>{{item.icon}}</v-icon>
              {{item.title}}
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      sideNav: false,
      menuItems: [
        { icon: "mdi-magnify", title: "Search", link: "/" },
        { icon: "mdi-file-find", title: "Discover", link: "/discover" },
        { icon: "mdi-finance", title: "Popular", link: "/popular" },
        { icon: "mdi-clock", title: "Watchlist", link: "/watchlist" },
        { icon: "mdi-check-all", title: "Watched", link: "/watched" }
      ]
    };
  },
  methods: {
    changeLightMode() {
      this.$store.commit("setLightMode", !this.$store.state.darkMode);
    }
  }
};
</script>