<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
    @input="onload"
  >
    <InfoCpn message="modification has been done successfully" v-if="false" />
    <template v-slot:activator="{ on, attrs }">
      <v-badge
        bordered
        dense
        :color="$vuetify.theme.dark ? 'black' : 'white'"
        icon="mdi-account-circle"
        avatar
        overlap
      >
        <v-btn color="red darken-3" dark v-bind="attrs" v-on="on">
          Authorization
        </v-btn>
      </v-badge>
    </template>

    <v-card>
      <v-list>
        <v-list-item>
          <AvatarCpn
            :path="user.avatarSrc ? user.avatarSrc : ''"
            :role="user.roles[0].roleName"
            :state="user.state"
            size="55"
          />
          <v-list-item-avatar> </v-list-item-avatar>

          <v-list-item-content>
            <v-container
              fluid
              grid-list-xs
              v-if="user.roles[0] != undefined"
              class="pt-3"
            >
              <v-row>
                <v-col class="py-0 mb-4">
                  <span class="font-weight-bold">Username: </span
                  >{{ user.username }}
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0 mb-2">
                  <v-list-item-subtitle>Informations</v-list-item-subtitle>
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  class="py-0 mb-1 text-no-wrap col-sm-6"
                  style="overflow: hidden; text-overflow: ellipsis"
                >
                  <span class="font-weight-bold">Last name: </span>
                  {{ user.lname }}
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0 mb-1">
                  <span class="font-weight-bold">Name: </span> {{ user.name }}
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0 mb-1">
                  <span class="font-weight-bold">Description: </span>
                  {{ user.description ? user.description : "no description" }}
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0 mb-1">
                  <span class="font-weight-bold">Role: </span>
                  <span :class="roleClassColor">{{
                    user.roles[0].roleName
                  }}</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="py-0 mb-1">
                  <span class="font-weight-bold">Account state: </span>
                  <span :class="user.state ? 'success--text' : 'error--text'">{{
                    user.state ? "Enabled" : "Disabled"
                  }}</span>
                </v-col>
              </v-row>
            </v-container>
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
                active-class="font-weight-bold"
              ></v-radio>
              <v-radio
                label="Admin"
                value="ADMIN"
                color="warning"
                active-class="font-weight-bold"
              ></v-radio>
              <v-radio
                label="User"
                value="USER"
                color="primary"
                active-class="font-weight-bold"
              ></v-radio>
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
                  class="font-weight-bold"
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
        <v-btn
          color="primary"
          text
          @click="saveChanges"
          :loading="btnLoading"
          :disabled="btnLoading"
        >
          Save
        </v-btn>
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
import { mapActions } from "vuex";
import { PropType } from "vue";
import InfoCpn from "./Info-cpn.vue";
import {
  getCurrentRole,
  updateUserRole,
  updateUserState,
} from "@/utils/functions";
import AvatarCpn from "./Avatar-cpn.vue";

export default Vue.extend({
  name: "Authorization-cpn",
  components: {
    InfoCpn,
    AvatarCpn,
  },
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
      snackbar: false,
      snackbarMessage: "",
      timeout: 2000,
      btnLoading: false,
    };
  },
  computed: {
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
    /**
     * save modifications on authorization on the server
     * @function
     * @async
     * @return {Promise<void>}
     */
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
    /**
     * loads user role and account state
     * @function
     *
     */
    onload(): void {
      this.role = this.user.roles[0].roleName as string;
      this.state =
        typeof this.user.state != "function" ? this.user.state : true;
    },
    /**
     * check if current user has role SUPERADMIN or ADMIN
     * @function
     * @returns {boolean}
     */
    isAuthorized(): boolean {
      return getCurrentRole() == "SUPERADMIN" || getCurrentRole() == "ADMIN";
    },
  },
});
</script>

<style lang="scss">
.v-snack__wrapper {
  min-width: unset;
}
</style>
