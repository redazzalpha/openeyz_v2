<template>
  <!-- tabs-container -->
  <v-tabs
    align-with-title
    v-model="$store.state.tabAccess"
    :background-color="$vuetify.theme.dark ? '#424242' : 'cyan darken-1'"
    class="access-tabs-tabs white-text"
  >
    <v-tab
      active-class="background-color: light-blue darken-2"
      class="white--text"
      >Login</v-tab
    >
    <v-tab active-class="background-color: light-blue darken-2" class="white--text"
      >Register</v-tab
    >
    <!--tab-slider-->
    <v-tabs-slider color="#FF8124"></v-tabs-slider>
  </v-tabs>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Access-tabs",
});
</script>
