<template>
  <v-app id="wrapper" class="app-container" :style="background">
    <LoaderCpn :show="loader" />
    <AlertCpn />
    <AlertPersistCpn />
    <div class="app-container-block">
      <AppbarCpn />
      <!--main-->
      <v-main>
        <!--main-section-->
        <section :style="minHeight">
          <!--views-->
          <router-view />
        </section>
      </v-main>
      <DrawerCpn />
      <FooterCpn />
      <ScrollTopBtnCpn />
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { HOME_PAGE_URL, POST_GET_LIMIT } from "./utils/defines";
import { addPosts, getNotifs, translateDateToISO } from "./utils/functions";
import FooterCpn from "@/components/cpn/Footer-cpn.vue";
import AppbarCpn from "@/components/cpn/Appbar-cpn.vue";
import DrawerCpn from "@/components/cpn/Drawer-cpn.vue";
import ScrollTopBtnCpn from "./components/cpn/ScrollTopBtn-cpn.vue";
import LoaderCpn from "./components/cpn/Loader-cpn.vue";
import AlertCpn from "@/components/cpn/Alert-cpn.vue";
import AlertPersistCpn from "@/components/cpn/Alert-persist-cpn.vue";

export default Vue.extend({
  name: "App",
  components: {
    AppbarCpn,
    FooterCpn,
    DrawerCpn,
    ScrollTopBtnCpn,
    LoaderCpn,
    AlertCpn,
    AlertPersistCpn,
  },
  computed: {
    ...mapState([
      "currentUser",
      "userNotifs",
      "posts",
      "loader",
    ]),
    background(): string {
      const backgroundUrl: string = this.$vuetify.theme.dark
        ? require("./assets/bg-home-dark.webp")
        : require("./assets/bg-home.webp");
      const backgroundImage: string =
        "background-image:  url(" + backgroundUrl + ");";
      const backgroundRepeat = "background-repeat:  no-repeat;";
      const backgroundPosition = "background-position: center;";
      const backgroundSize = "background-size: cover;";
      const backgroundAttachment = "background-attachment: fixed;";
      const backgroundColor = " background-color: #cccccc;";
      const background: string =
        backgroundImage +
        backgroundRepeat +
        backgroundPosition +
        backgroundSize +
        backgroundColor +
        backgroundAttachment;
      return background;
    },
    minHeight(): string {
      if (this.$vuetify.breakpoint.name == "xs") return "";
      else return "min-height: 100vh";
    },
  },
  methods: {
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
            addPosts(POST_GET_LIMIT, date);
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
    getNotifs();
  },
  async mounted() {
    this.infiniteScroll();
  },
});
</script>

<style lang="scss">
#wrapper {
  scroll-behavior: smooth;
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

.app-container-block {
  transition: background-image 0.7s linear;
}
</style>
