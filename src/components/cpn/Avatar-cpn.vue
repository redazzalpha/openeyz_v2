<template>
  <v-avatar v-if="isReady" :size="size">
    <img :src="userImg" style="object-fit: cover" />
  </v-avatar>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
export default Vue.extend({
  name: "Avatar-cpn",
  props: {
    path: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    state: {
      type: Boolean,
      required: false,
      default: true,
    },
    size: {
      type: String,
      required: false,
      default: "55",
    },
  },
  computed: {
    ...mapState(["currentUser"]),
    userImg(): string | null {
      if (this.isReady) {
        let img = "";
        const isBanned = !this.state;
        const isSuperAdmin: boolean = this.role == "SUPERADMIN";
        const isAdmin: boolean = this.role == "ADMIN";
        const isUser: boolean = this.role == "USER";
        const isPath: boolean = this.path != null && this.path != "";
        const isAuthorized: boolean = this.currentUser.roles[0].roleName == "SUPERADMIN";

        if (isBanned && isAuthorized) img = require("../../assets/users/banned.png");
        else if (!isPath && isSuperAdmin)
          img = require("../../assets/users/suadmin.png");
        else if (!isPath && isAdmin)
          img = require("../../assets/users/admin.png");
        else if (!isPath && isUser)
          img = require("../../assets/users/user.png");
        else if (isPath) img = this.path;
        else img = require("../../assets/users/banned-horned.png");
        return img;
      }
      return null;
    },
    isReady(): boolean {
      const isPath: boolean =
        this.path != null || this.path != undefined || this.path != "";
      const isRole: boolean =
        this.role != null || this.role != undefined || this.role != "";
      const isState: boolean = this.state != null || this.state != undefined;
      return isPath && isRole && isState;
    },
  },
  methods: {},
});
</script>
