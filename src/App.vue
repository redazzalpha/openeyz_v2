<template>
  <!-- TODO: got to lock all access if not authentified cause there a bug user can access to profil page cause there no request to the server to reject request -->
  <v-app id="wrapper" class="app-container">
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
      <!--scroll-top-button-->
      <v-hover v-slot="{ hover }">
        <v-btn
          v-scroll="onScroll"
          v-show="fab"
          fab
          fixed
          bottom
          right
          tab="button"
          :color="$vuetify.theme.dark ? '#424242' : 'cyan darken-1'"
          :class="hover ? 'on-hover' : ''"
          @click="toTop"
        >
          <v-icon class="text-h3 white--text">mdi-chevron-up</v-icon>
        </v-btn>
      </v-hover>
    </v-card>
  </v-app>
</template>
//
<!-- TODO: need to change code where i modify front end value without get server  response like in profile information field and like publication value has been modified without get server response-->
// TODO: add autofocuse on fields
<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { getAllNotifs } from "./utils/functions";
import FooterCpn from "@/components/cpn/Footer-cpn.vue";
import AppbarCpn from "@/components/cpn/Appbar-cpn.vue";
import DrawerCpn from "@/components/cpn/Drawer-cpn.vue";

export default Vue.extend({
  name: "App",
  components: {
    AppbarCpn,
    FooterCpn,
    DrawerCpn,
  },
  data() {
    return {
      fab: false,
    };
  },

  computed: {
    ...mapState(["currentUser", "userNotifs"]),
  },
  methods: {
    onScroll(e: UIEvent) {
      if (typeof window === "undefined") return;
      if (e.target != null) {
        const top = window.pageYOffset || (e.target as Element).scrollTop || 0;
        this.fab = top > 20;
      }
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
    async ckeThemeSwitcher() {
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
