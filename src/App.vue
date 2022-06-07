<template>
  <!-- TODO: got to lock all access if not authentified cause there a bug user can access to profil page cause there no request to the server to reject request -->
  <!--main-app-container-->
  <v-app id="wrapper">
    <!--app-bar-header-->
    <AppbarCpn />
    <!--main-->
    <v-main
      :style='"background:  url(" + ($vuetify.theme.dark ? require("./assets/bg-home-dark.webp") : require("./assets/bg-home.webp")) + ") fixed no-repeat center; background-size: cover; "'>
      <!--main-section-->
      <section>
        <!--views-->
        <router-view />
      </section>
    </v-main>
    <!--nav-->
    <DrawerCpn />
    <!--footer-->
    <FooterCpn />
    <!--scroll-top-button-->
    <v-hover v-slot="{ hover }">
      <v-btn v-scroll="onScroll" v-show="fab" fab fixed bottom right tab="button" color="cyan darken-1"
        :class="(hover ? 'on-hover' : '')" @click="toTop">
        <v-icon class="text-h3 white--text">mdi-chevron-up</v-icon>
      </v-btn>
    </v-hover>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import FooterCpn from '@/components/cpn/Footer-cpn.vue';
import AppbarCpn from '@/components/cpn/Appbar-cpn.vue';
import DrawerCpn from '@/components/cpn/Drawer-cpn.vue';
export default Vue.extend({
  name: 'App',
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
  methods: {
    onScroll(e: UIEvent) {
      if (typeof window === 'undefined') return;
      if (e.target != null) {
        const top = window.pageYOffset || ((e.target) as Element).scrollTop || 0;
        this.fab = top > 20;
      }
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },


  mounted() {
    this.$vuetify.theme.dark = false;
  }
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
