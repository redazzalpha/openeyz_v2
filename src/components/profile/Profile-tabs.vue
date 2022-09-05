<template>
  <v-tabs
    v-model="$store.state.tabProfile"
    center-active
    show-arrows
    centered
    class="profile-tabs-tabs d-flex justify-center"
  >
    <v-tabs-slider color="#FF8124" centered />
    <v-tab v-for="item in items" :key="item" @click="$vuetify.goTo(0)">
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
  },
});
</script>
