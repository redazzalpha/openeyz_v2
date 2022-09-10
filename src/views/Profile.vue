<template>
  <div class="profile-page-block">
    <!-- toolbar -->
    <ToolbarCpn icon="fa-solid fa-user" title="Profile">
      <!-- center-extension -->
      <template v-slot:center>
        <!-- tabs -->
        <ProfileTabs />
      </template>
    </ToolbarCpn>
    <!-- tabs-items -->
    <v-tabs-items
      v-model="$store.state.tabProfile"
      style="background-color: transparent;"
      touchless
    >
      <!-- title -->
      <v-card flat color="transparent">
        <v-card-title primary-title class="justify-center">
          <span v-if="tabProfile == 0">My informations</span>
          <span v-if="tabProfile == 1">My password</span>
          <span v-if="tabProfile == 2">My account</span>
        </v-card-title>
        <v-card-subtitle class="text-center">
          <span v-if="tabProfile == 0"
            >Take a look to your account informations and settings from
            here.</span
          >
          <span v-if="tabProfile == 1"
            >Password secures your account informations this is the right place
            to modify it if you need to
          </span>
          <span v-if="tabProfile == 2"
            >This section is about deleting your account and all stored
            informations</span
          >
        </v-card-subtitle>
      </v-card>
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
  data: function () {
    return {
      show: false,
      type: "",
      message: "",
    };
  },
  computed: {
    ...mapState(["currentUser", "tabProfile"]),
  },
  methods: {
    ...mapActions(["updateTabProfile", "updateLoader"]),
  },
  created() {
    this.updateTabProfile(0);
  },
  mounted() {
    this.updateLoader(false);
  },
  destroyed() {
    this.updateLoader(true);
  },
});
</script>
