<template>
  <!--access-container-->
  <div class="login-container">
    <!--access-dialog-->
    <v-dialog v-model="dialog" width="500" persistent role="dialog">
      <!--access-title-tabs-->
      <Tabs />
      <!--tabs-content-->
      <v-tabs-items v-model="$store.state.tabAccess">
        <!--login-tab-content-->
        <Login />
        <!--register-tab-content-->
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
});
</script>

<style lang="scss">
.logo {
  font-size: $size-appbar-logo;
}
</style>
