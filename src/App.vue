<template>
  <!--main-app-container-->
  <v-app>
    <!--app-bar-header-->
    <Appbar />
    <!--main-->
    <v-main>
      <!--main-section-->
      <section>
        <!--views-->
        <router-view />
      </section>
    </v-main>
    <!--nav-->
    <v-navigation-drawer tag="nav" v-model="drawer" absolute temporary></v-navigation-drawer>
    <!--footer-->
    <Footer />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Footer from './components/footer-cpn.vue';
import Appbar from './components/appbar-cpn.vue';
export default Vue.extend({
  name: 'app',
  components: {
    Appbar,
    Footer,
  },
  data() {
    return {
      drawer: false,

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
