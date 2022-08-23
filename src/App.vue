<template>
  <v-app id="wrapper" class="app-container">
    <LoaderCpn :show="loader" />
    <v-card
      class="app-container-card"
      :style="
        'background:  url(' +
        ($vuetify.theme.dark
          ? require('./assets/bg-home-dark.webp')
          : require('./assets/bg-home.webp')) +
        ') no-repeat fixed center'
      "
    >
      <AppbarCpn />
      <!--main-->
      <v-main>
        <!--main-section-->
        <section style="min-height: 100vh">
          <!--views-->
          <router-view />
        </section>
      </v-main>
      <DrawerCpn />
      <FooterCpn />
      <ScrollTopBtnCpn />
    </v-card>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import { HOME_PAGE_URL, POST_GET_LIMIT } from "./utils/defines";
import {
  addAllPosts,
  getAllNotifs,
  translateDateToISO,
} from "./utils/functions";
import FooterCpn from "@/components/cpn/Footer-cpn.vue";
import AppbarCpn from "@/components/cpn/Appbar-cpn.vue";
import DrawerCpn from "@/components/cpn/Drawer-cpn.vue";
import ScrollTopBtnCpn from "./components/cpn/ScrollTopBtn-cpn.vue";
import LoaderCpn from "./components/cpn/Loader1-cpn.vue";

export default Vue.extend({
  name: "App",
  components: {
    AppbarCpn,
    FooterCpn,
    DrawerCpn,
    ScrollTopBtnCpn,
    LoaderCpn,
  },
  computed: {
    ...mapState(["currentUser", "userNotifs", "posts", "loader"]),
  },
  methods: {
    ...mapActions(["updateLoader"]),
    infiniteScroll() {
      let scroll: number;
      let bottom: number;
      window.onscroll = async () => {
        scroll = window.scrollY + window.innerHeight;
        bottom = document.body.scrollHeight;
        if (scroll === bottom) {
          if (
            this.posts.length &&
            this.$router.currentRoute.path === HOME_PAGE_URL
          ) {
            const date = translateDateToISO(
              this.posts[this.posts.length - 1].post.creation
            );
            addAllPosts(POST_GET_LIMIT, date);
          }
        }
      };
    },
    ckeThemeSwitcher() {
      const style = document.documentElement.style;
      if (this.currentUser && this.currentUser.dark) {
        style.setProperty("--ck-color-base-foreground", "#424242");
        style.setProperty("--ck-color-base-background", "#424242");
        style.setProperty("--ck-color-base-text", "white");
        style.setProperty(
          "--ck-color-button-default-hover-background",
          "#757575"
        );
        style.setProperty("--ck-color-button-on-background", "#757575");
      } else {
        style.removeProperty("--ck-color-base-foreground");
        style.removeProperty("--ck-color-base-background");
        style.removeProperty("--ck-color-base-text");
        style.removeProperty("--ck-color-button-default-hover-background");
        style.removeProperty("--ck-color-button-on-background");
      }
    },
  },
  created() {
    if (this.currentUser) this.$vuetify.theme.dark = this.currentUser.dark;
    this.ckeThemeSwitcher();
  },
  updated() {
    if (this.currentUser) this.$vuetify.theme.dark = this.currentUser.dark;
    this.ckeThemeSwitcher();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    getAllNotifs();
  },
  async mounted() {
    this.infiniteScroll();
  },
});
</script>

<style lang="scss">
#wrapper {
  scroll-behavior: smooth;
  background-size: 100vw 100vh !important;
}

.logo {
  font-family: $font-logo;
  font-size: $size-appbar-logo;
}

.btn {
  i {
    color: $color-appbar-icon;
    font-size: $size-appbar-icon;
  }

  span {
    color: $color-appbar-text;
  }
}

.on-hover {
  color: red !important;
}
</style>
