<template>
  <v-tabs
    v-model="$store.state.tabProfile"
    center-active
    show-arrows
    centered
    class="d-flex justify-center"
  >
    <v-tabs-slider color="#EE964B" centered></v-tabs-slider>
    <v-tab v-for="item in items" :key="item">
      {{ item }}
    </v-tab>
  </v-tabs>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Profile-tabs",
  data() {
    return {
      tab: null,
      items: ["Information", "Password", "Account"],
    };
  },
  methods: {
    keypressed({ code }: KeyboardEvent) {
      console.log(code);
    },
  },
});
</script>
