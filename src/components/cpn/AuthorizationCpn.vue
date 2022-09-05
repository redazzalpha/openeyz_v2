<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
    @input="onload"
  >
    <AlertCpn message="modification has been done successfully" v-if="false" />
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="red darken-3" dark v-bind="attrs" v-on="on">
        Authorization
      </v-btn>
    </template>

    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <img v-if="user" :src="getUserImg()" alt="" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ user.username }}</v-list-item-title>
            <v-list-item-subtitle>Authorizations</v-list-item-subtitle>
            <div v-if="user.roles[0] != undefined" class="pt-3">
              First name: {{ user.lname }} <br />
              Name: {{ user.name }} <br />
              Description:
              {{ user.description ? user.description : "no description" }}
              <br />
              Role: <span :class="roleClassColor">{{ user.roles[0].roleName }}</span> <br />
              Account state:
              <span :class="user.state ? 'success--text' : 'error--text'">{{
                user.state ? "Enabled" : "Disabled"
              }}</span>
              <br />
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Role</v-list-item-title>
            <v-radio-group v-model="role" row class="ml-5">
              <v-radio
                label="Super Admin"
                value="SUPERADMIN"
                color="error"
              ></v-radio>
              <v-radio label="Admin" value="ADMIN" color="warning"></v-radio>
              <v-radio label="User" value="USER" color="primary"></v-radio>
            </v-radio-group>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-action class="d-flex">
            <div class="d-flex flex-column">
              <v-list-item-title style="align-self: start"
                >Account</v-list-item-title
              >

              <div class="d-flex mt-5">
                <v-switch
                  v-model="state"
                  class="pr-5 pl-5"
                  color="purple"
                ></v-switch>
                <v-list-item-title
                  :class="state ? 'success--text' : 'error--text'"
                  >{{ state ? "enabled" : "disabled" }}</v-list-item-title
                >
              </div>
            </div>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="menu = false"> Cancel </v-btn>
        <v-btn color="primary" text @click="saveChanges" :loading="btnLoading" :disabled="btnLoading"> Save </v-btn>
      </v-card-actions>
    <!-- snackbar message -->
      <v-snackbar v-model="snackbar" :timeout="timeout" style="" class="test">
        {{ snackbarMessage }}

        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>

      
    </v-card>

  </v-menu>
</template>

<script lang="ts">
import Vue from "vue";
import { Users } from "../../utils/types";
import { mapState, mapActions } from "vuex";
import { PropType } from "vue";
import AlertCpn from "./Alert-cpn.vue";
import { updateUserRole, updateUserState } from "@/utils/functions";
export default Vue.extend({
  name: "Authorization-cpn",
  props: {
    user: {
      type: Object as PropType<Users>,
      required: true,
    },
  },
  components: {
    AlertCpn,
  },
  data() {
    return {
      role: "USER",
      state: true,
      menu: false,
      snackbar: false,
      snackbarMessage: "",
      timeout: 2000,
      btnLoading: false,
    };
  },
  computed: {
        ...mapState(["currentUser"]),

    roleClassColor(): string {
      let color: string;

      switch (this.user.roles[0].roleName) {
        case "SUPERADMIN":
          color = "error--text";
          break;
        case "ADMIN":
          color = "warning--text";
          break;
        default:
          color = "primary--text";
      }
      return color;
    },
  },
  methods: {
    ...mapActions(["updateCurrentUser"]),
    getUserImg(): string {
      const { avatarSrc, roles, state } = this.user;

      if (typeof avatarSrc != "function" && typeof state != "function") {
        if (!state)
          return require("../../assets/banned.png");
        else if (!avatarSrc && roles[0].roleName == "SUPERADMIN")
          return require("../../assets/suadmin.png");
        else if (!avatarSrc && roles[0].roleName == "ADMIN")
          return require("../../assets/admin.png");
        else if (!avatarSrc && roles[0].roleName == "USER")
          return require("../../assets/user.png");
        else if (avatarSrc) return avatarSrc;
      }
      return require("../../assets/user.png");
    },
    async saveChanges(): Promise<void> {
      this.btnLoading = true;
      let user: Users;
      user = await updateUserRole(this.user, this.role);
      user = await updateUserState(this.user, this.state);
      this.$emit("updated", user);
      this.snackbarMessage = "Modification has been done successfully";
      this.snackbar = true;
      setTimeout(() => {
        this.btnLoading = false;
      }, this.timeout);
    },
    onload(): void {
      this.role = this.user.roles[0].roleName as string;
      this.state =
        typeof this.user.state != "function" ? this.user.state : true;
    },
  },
});
</script>

<style lang="scss">
.v-snack__wrapper {
  min-width: unset;
}
</style>