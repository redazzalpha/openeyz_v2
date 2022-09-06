<template>
    <v-dialog :value="show" max-width="290" hide-overlay >
      <v-alert
        dense
        :type="type"
        elevation="5"
        class="mt-5"
        >{{ message }}</v-alert
      >

    </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Alert-cpn",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
    };
  }
});
</script>

<style lang="scss">
.v-dialog {
    box-shadow: unset!important;
}
</style>
