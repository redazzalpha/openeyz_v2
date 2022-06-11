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
  </v-card>
</template>

<script>
export default {
  name: "Notfound-page",
};
</script>
