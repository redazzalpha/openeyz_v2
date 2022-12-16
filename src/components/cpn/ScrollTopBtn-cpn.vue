<template>
  <v-hover v-slot="{ hover }">
    <v-btn
      v-scroll="onScroll"
      v-show="fab"
      fab
      fixed
      bottom
      right
      tab="button"
      :color="$vuetify.theme.dark ? '#424242' : 'cyan darken-1'"
      :class="hover ? 'on-hover' : ''"
      @click="toTop"
    >
      <v-icon class="text-h3 white--text">mdi-chevron-up</v-icon>
    </v-btn>
  </v-hover>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "ScrollTopBtn-cpn",
  data() {
    return {
      fab: false,
    };
  },
  methods: {
    /**
     * shows button on scroll
     * @function
     * @param {UIEvent} e 
     */
    onScroll(e: UIEvent) {
      if (typeof window === "undefined") return;
      if (e.target != null) {
        const top = window.pageYOffset || (e.target as Element).scrollTop || 0;
        this.fab = top > 20;
      }
    },
    /**
     * scrolls page to top
     * @function
     */
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
});
</script>

<style></style>
