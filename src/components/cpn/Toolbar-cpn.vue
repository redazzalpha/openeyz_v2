<template>
  <v-toolbar
    dark
    color="cyan darken-1"
    style="position: fixed; width: 100%; z-index: 1"
  >
    <v-toolbar-title v-if="$vuetify.breakpoint.name != 'xs' || xs" style="position: absolute">
        <i class="mr-2" :class="icon"></i>
      {{ title }}
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <slot name="center"></slot>

    <v-spacer></v-spacer>

    <slot name="button"></slot>
  </v-toolbar>

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
    }
  },
});
</script>
