<template>
  <!--main-app-container-->
  <v-app id="wrapper">
    <!--app-bar-header-->
    <Appbar />
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
    <v-navigation-drawer tag="nav" v-model="$store.state.drawer" absolute temporary></v-navigation-drawer>
    <!--footer-->
    <Footer />
    <!--scroll-top-button-->
    <v-hover v-slot="{ hover }">
      <v-btn v-scroll="onScroll" v-show="fab" fab fixed bottom right tab="button" color="cyan darken-1"
        :class="(hover ? 'on-hover' : '')" @click="toTop">
        <v-icon class="text-h3">mdi-chevron-up</v-icon>
      </v-btn>
    </v-hover>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Footer from '@/components/Footer-cpn.vue';
import Appbar from '@/components/Appbar-cpn.vue';
export default Vue.extend({
  name: 'App',
  components: {
    Appbar,
    Footer,
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
