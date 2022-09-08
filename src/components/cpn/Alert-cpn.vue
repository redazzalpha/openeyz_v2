<template>
  <v-dialog :value="alert" hide-overlay max-width="390">
    <v-alert dense elevation="5" class="d-flex justify-center" :type="alertType"
      >{{ alertMessage }} <br />
    </v-alert>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
export default Vue.extend({
  name: "Alert-cpn",
  computed: {
    ...mapState(["alert", "alertMessage", "alertType"]),
  },
});
</script>

<style lang="scss">
.v-dialog {
  box-shadow: unset !important;
}
</style>
