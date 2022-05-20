<template>
  <!--main-app-container-->
  <v-app>
    <!--app-bar-header-->
    <Appbar />
    <!--main-->
    <v-main :style='"background:  url(" + ($vuetify.theme.dark? require("./assets/bg-home-dark.webp") : require("./assets/bg-home.webp")) + ") fixed no-repeat center; background-size: cover; "'>
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
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Footer from './components/Footer-cpn.vue';
import Appbar from './components/Appbar-cpn.vue';
export default Vue.extend({
  name: 'App',
  components: {
    Appbar,
    Footer,
  },
  data() {
    return {

    };
  },

});
</script>

<style lang="scss">
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
</style>
