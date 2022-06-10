<template>
  <!-- main-card -->
  <v-card
    color="transparent"
    max-width="800"
    flat
    class="mx-auto"
    style="padding-top: 65px"
  >
    <!-- title -->
    <v-card flat color="transparent">
      <!-- title -->
      <v-card-title primary-title class="justify-center">
        {{title}}
      </v-card-title>
      <v-card-subtitle class="text-center">
        {{subtitle}}
      </v-card-subtitle>
    </v-card>
    <!-- content slot -->
    <slot name="content"></slot>
  </v-card>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "Container-cpn",
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
  },
});
</script>
