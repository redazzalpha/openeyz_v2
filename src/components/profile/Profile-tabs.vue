<template>
  <v-tabs
    v-model="$store.state.tabProfile"
    center-active
    show-arrows
    class="d-flex justify-center pt-2"
    style="background-color: white"
  >
    <v-tabs-slider color="#FFAD69" centered></v-tabs-slider>
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
