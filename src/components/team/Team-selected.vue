<template>
  <!-- selected-user-dialog -->
  <v-dialog
    :value="teamSelectDialog"
    fullscreen
    hide-overlay
    transition="dialog-transition"
    @keydown="keyPressed"
  >
    <v-card>
      <!-- toolbar -->
      <ToolbarCpn
        icon="fa-solid fa-users"
        title="Publications"
        style="position: fixed; width: 100%; z-index: 1"
        xs
      >
        <template v-slot:end>
          <!-- icon-links -->
          <div v-if="show" class="d-flex flex-column flex-sm-row">
            <v-btn
              v-for="icon in icons"
              :key="icon.title"
              class="btn d-flex mx-5"
              elevation="0"
              color="transparent"
              :title="icon.title"
              :to="icon.title == 'Logout' ? '' : icon.href"
              @click="icon.title == 'Logout' ? logout() : ''"
            >
              <i :class="icon.class + ' mr-1'"></i
              ><span style="font-size: 13px">{{ icon.title }}</span>
            </v-btn>
          </div>

          <!-- close-button -->
          <v-btn icon>
            <v-icon @click="closeDialog">mdi-close</v-icon>
          </v-btn>
        </template>
      </ToolbarCpn>

      <!-- card-title -->
      <v-container grid-list-xs fluid>
        <v-row class="mt-15">
          <v-col class="text-center">
            <v-card-title primary-title class="d-flex justify-center">
              {{ author }} 's publications
            </v-card-title>
          </v-col>
        </v-row>

        <!-- publication component -->
        <div v-for="(post, index) in userPosts" :key="index">
          <PublicationCpn :item="post" />
        </div>

        <!-- alert part -->
        <v-alert
          v-if="!userPosts.length"
          text
          color="red"
          :value="true"
          max-width="700"
          class="mx-auto text-center"
        >
          {{ author }} has no post at now !
        </v-alert>
        <v-alert
          v-else
          text
          color="primary"
          :value="true"
          max-width="700"
          class="mx-auto text-center"
        >
          You have reach end of {{ author }} 's publications
        </v-alert>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import PublicationCpn from "../cpn/Publication-cpn.vue";
import ToolbarCpn from "../cpn/Toolbar-cpn.vue";
import * as Defines from "../../utils/defines";
export default Vue.extend({
  name: "Team-selected",
  components: {
    ToolbarCpn,
    PublicationCpn,
  },
  props: {
    author: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      icons: [
        {
          title: "Home",
          class: "fa-solid fa-house",
          href: Defines.HOME_PAGE_URL,
        },
        {
          title: "Profile",
          class: "fa-solid fa-user",
          href: Defines.PROFILE_PAGE_URL,
        },
        {
          title: "Notifications",
          class: "fa-solid fa-bell",
          href: Defines.NOTIFICATION_PAGE_URL,
        },
        {
          title: "Team",
          class: "fa-solid fa-users",
          href: Defines.TEAM_PAGE_URL,
        },
        {
          title: "Logout",
          class: "fa-solid fa-right-from-bracket",
          href: "",
        },
      ],
    };
  },
  computed: {
    ...mapState(["teamSelectDialog", "userPosts"]),
    show(): boolean {
      let show = true;
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          show = false;
          break;
        case "sm":
          show = false;
          break;
        case "md":
          show = true;
          break;
        case "lg":
          show = true;
          break;
        case "xl":
          show = true;
          break;
      }
      return show;
    },
  },
  methods: {
    ...mapActions(["updateTeamSelectDialog", "getAllUserPosts"]),
    closeDialog() {
      this.updateTeamSelectDialog(false);
    },
    keyPressed({ code }: KeyboardEvent): void {
      if (code === "Escape") this.closeDialog();
    },
  },
  watch: {
    teamSelectDialog(visible: boolean) {
      if (visible) this.getAllUserPosts(this.username);
    },
  },
  created() {
    this.getAllUserPosts(this.username);
  },
});
</script>
