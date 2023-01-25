<template>
  <v-app-bar
    dark
    :color="$vuetify.theme.dark ? '#212121' : 'cyan darken-1'"
    style="position: fixed; width: 100%; z-index: 2"
    hide-on-scroll
    scroll-threshold="100"
  >
    <v-toolbar-title
      v-if="$vuetify.breakpoint.name != 'xs' || xs"
      style="position: absolute"
    >
      <i class="mr-2" :class="icon"></i>
      {{ title }}
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <slot name="center"></slot>
    <v-spacer></v-spacer>
    <slot name="end"></slot>
  </v-app-bar>

  <!-- end-toolbar -->
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Toolbar-cpn",
  props: {
    title: {
      type: String,
      required: false,
      default: "",
    },
    icon: {
      type: String,
      required: true,
    },
    xs: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
});
</script>
