<template>
  <div
    class="access-page-block"
    style="min-height: 100vh"
  >
    <v-img src="../assets/logos/primary-title.png" width="350" class="mx-auto" />

    <v-dialog
      class="access-page-dialog"
      v-model="dialog"
      width="500"
      persistent
      role="dialog"
    >
      <Tabs />
      <v-tabs-items v-model="$store.state.tabAccess">
        <Login />
        <Register />
      </v-tabs-items>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Tabs from "@/components/access/Access-tabs.vue";
import Login from "@/components/access/Access-login.vue";
import Register from "@/components/access/Access-register.vue";
import { mapActions } from "vuex";

export default Vue.extend({
  name: "Access-page",
  components: {
    Tabs,
    Login,
    Register,
  },
  data() {
    return {
      dialog: true,
    };
  },
  methods: {
    ...mapActions(["updateTabAccess", "updateLoader"]),
  },
  created() {
    this.updateTabAccess(0);
  },
  mounted() {
    this.updateLoader(false);
  },
  destroyed() {
    this.updateLoader(true);
  },
});
</script>

<style lang="scss">
.logo {
  font-size: $size-appbar-logo;
}
</style>
