<template>
  <v-menu
    v-if="isAuthorized()"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
    @input="onload"
  >
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
              Role: {{ user.roles[0].roleName }} <br />
              Account state: {{ user.state ? "Enabled" : "Disabled" }} <br />
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Set role</v-list-item-title>
            <v-radio-group v-model="role" row>
              <v-radio label="Super Admin" value="SUPERADMIN"></v-radio>
              <v-radio label="Admin" value="ADMIN"></v-radio>
              <v-radio label="User" value="USER"></v-radio>
            </v-radio-group>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-action>
            <v-switch v-model="state" color="purple"></v-switch>
          </v-list-item-action>
          <v-list-item-title>{{
            "Account " + (state ? "enabled" : "disabled")
          }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text @click="menu = false"> Cancel </v-btn>
        <v-btn color="primary" text @click="saveChanges"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import Vue from "vue";
import { httpRequest } from "../../utils/http";
import * as Defines from "../../utils/defines";
import { Users, VueResponse } from "../../utils/types";
import { mapState, mapActions } from "vuex";
import { PropType } from "vue";
export default Vue.extend({
  name: "Authorization-cpn",
  props: {
    user: {
      type: Object as PropType<Users>,
      required: true,
    },
  },
  data() {
    return {
      role: "USER",
      state: true,
      menu: false,
    };
  },
  methods: {
    ...mapActions(["updateCurrentUser"]),
    getUserImg(): string {
      const { avatarSrc, roles } = this.user;

      if (typeof avatarSrc != "function") {
        if (!avatarSrc && roles[0].roleName == "SUPERADMIN")
          return require("../../assets/suadmin.png");
        else if (!avatarSrc && roles[0].roleName == "ADMIN")
          return require("../../assets/admin.png");
        else if (!avatarSrc && roles[0].roleName == "USER")
          return require("../../assets/user.png");
        else if (avatarSrc) return avatarSrc;
      }
      return require("../../assets/user.png");
    },
    async updateState(): Promise<Users> {
      const body: FormData = new FormData();
      if (this.state) body.append("state", "true");
      else body.append("state", "false");
      body.append("username", this.user.username);
      const res: VueResponse = await httpRequest.patch(
        Defines.SERVER_USER_STATE_URL,
        body
      );
      return res.body as Users;
    },
    async updateRole(): Promise<Users> {
      const body: FormData = new FormData();
      body.append("roleName", this.role);
      body.append("username", this.user.username);
      const res: VueResponse = await httpRequest.patch(
        Defines.SERVER_USER_ROLE_URL,
        body
      );
      return res.body as Users;
    },
    async saveChanges(): Promise<void> {
      let user: Users;
      user = await this.updateRole();
      user = await this.updateState();
      this.$emit("updated", user);

      this.menu = false;
    },
    isAuthorized(): boolean {
      return (
        this.currentUser.roles[0].roleName == "SUPERADMIN" &&
        this.currentUser.username != this.user.username
      );
    },
    onload(): void {
      this.role = this.user.roles[0].roleName as string;
      this.state =
        typeof this.user.state != "function" ? this.user.state : true;
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
});
</script>
