<template>
<!--main-app-container-->
  <v-app>
    <!--header-->
    <v-app-bar tag="header" color="cyan darken-1" elevation="0"  app>
      <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="logo white--text mr-5">OpenEyz</v-toolbar-title>
      <v-toolbar-items>
        <v-btn plain icon>
          <v-icon size="35px" color="white">mdi-account</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <!--main-->
    <v-main>
      <!--main-section-->
      <section>
        <router-view />
      </section>
    </v-main>
    <!--nav--->
    <v-navigation-drawer
    tag="nav"
    v-model="drawer"
    absolute
    temporary
    ></v-navigation-drawer>
    <!--footer-->
    <v-footer></v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'app',

  data(){
    return {
      drawer: false,
    };
  },
});
</script>

<style lang="scss">
.logo {
  font-family: 'Water Brush', 'cursive'!important;
  font-size: 2.5rem!important;
}
</style>
