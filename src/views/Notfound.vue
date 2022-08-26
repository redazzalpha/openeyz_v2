<template>
  <v-card
    class="notfound-page-card"
    :style="
      'background:  url(' +
      ($vuetify.theme.dark
        ? require('../assets/bg-notfound-dark.webp')
        : require('../assets/bg-notfound.webp')) +
      ') fixed no-repeat center; background-size: cover; '
    "
  >
    <h2>404 Not found</h2>

    <LoaderCpn :show="true" />
  </v-card>
</template>

<script>
import LoaderCpn from '../components/cpn/Loader-cpn.vue';
export default {
  components: { LoaderCpn },
  name: "Notfound-page",
};
</script>
