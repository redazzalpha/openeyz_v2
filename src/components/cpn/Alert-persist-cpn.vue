<template>
  <v-dialog
    :value="alertPersist"
    :persistent="true"
    overlay-color="#00ACC1"
    overlay-opacity="1"
    max-width="390"
  >
    <v-img src="../../assets/logos/secondary-title.png" width="350" class="mx-auto mb-5" />
    <v-alert dense elevation="5" class="d-flex justify-center" :type="alertType"
      >{{ alertMessage }} <br />
      <div
        @click="accessPage"
        style="text-decoration: unset"
        class="white--text alert-access-btn"
      >
        <i class="fa-solid fa-right-to-bracket"></i> access to login page
      </div>
    </v-alert>
  </v-dialog>
</template>

<script lang="ts">
import { pushAccessUrl } from "@/utils/functions";
import Vue from "vue";
import { mapState } from "vuex";
export default Vue.extend({
  name: "Alert-persist-cpn",
  computed: {
    ...mapState(["alertPersist", "alertMessage", "alertType"]),
  },
  data: function () {
    return {
      accessPage: pushAccessUrl,
    };
  },
});
</script>

<style lang="scss">
.v-dialog {
  box-shadow: unset !important;
}
.alert-access-btn {
  &:hover {
    cursor: pointer;
  }
}
</style>
