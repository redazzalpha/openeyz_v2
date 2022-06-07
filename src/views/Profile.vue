<template>
  <div>
    <!-- toolbar -->
    <ToolbarCpn
      icon="fa-solid fa-user"
      title="Profile"
    >
      <!-- center-extension -->
      <template v-slot:center>
          <!-- tabs -->
        <ProfileTabs />
      </template>
    </ToolbarCpn>

    <!-- tabs-items -->
    <v-tabs-items v-model="$store.state.tabProfile" style="padding-top: 65px">
      <ProfileInfo />
      <ProfilePassword />
      <ProfileAccount />
    </v-tabs-items>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import ProfileTabs from "../components/profile/Profile-tabs.vue";
import ProfileInfo from "../components/profile/Profile-info.vue";
import ProfilePassword from "../components/profile/Profile-password.vue";
import ProfileAccount from "../components/profile/Profile-account.vue";
import ToolbarCpn from "../components/cpn/Toolbar-cpn.vue";
export default Vue.extend({
  name: "Profile-page",
  components: {
    ProfileTabs,
    ProfileInfo,
    ProfilePassword,
    ProfileAccount,
    ToolbarCpn,
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
      ...mapActions([
          'updateTabProfile'
      ])
  },
  created(){
      this.updateTabProfile(0);

  },    
});
</script>

<style lang="scss" scoped>
.theme--light.v-tabs-items {
  background-color: transparent;
}
</style>
