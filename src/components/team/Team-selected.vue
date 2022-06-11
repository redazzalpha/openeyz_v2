<template>
  <!-- selected-user-dialog -->
  <v-dialog
    :value="teamSelectDialog"
    fullscreen
    hide-overlay
    transition="dialog-transition"
    @keydown="keyPressed"
  >
    <v-card
      v-scroll.self="onScroll"
      class="overflow-y-auto test inscroll"
      max-height="400"
    >
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
          <v-btn icon class="pa-0 ma-0" width="30" height="30">
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

        <v-row>
          <v-col>
            <!-- publication component -->
            <div v-for="(post, index) in userPosts" :key="index">
              <PublicationCpn :item="post" @sent="sent" />
            </div>
          </v-col>
        </v-row>
      </v-container>

      <!-- alert part -->
      <div class="d-flex justify-center">
        <!-- alert-btn-block -->
        <v-btn class="btn" plain :ripple="false" @click="closeDialog">
          <!-- empty-post-alert -->
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
          <!-- end-of-post-alert -->
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
        </v-btn>
      </div>
    </v-card>

    <!--scroll-top-button-->
    <v-hover v-slot="{ hover }">
      <v-btn
        v-scroll="onScroll"
        v-show="fab"
        fab
        fixed
        bottom
        right
        tab="button"
        :color="$vuetify.theme.dark ? '#424242' : 'cyan darken-1'"
        :class="hover ? 'on-hover' : ''"
        @click="toTop"
      >
        <v-icon class="text-h3 white--text">mdi-chevron-up</v-icon>
      </v-btn>
    </v-hover>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { getAllUserPosts } from "../../utils/functions";
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
      fab: false,
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
    ...mapActions(["updateTeamSelectDialog"]),
    closeDialog() {
      this.updateTeamSelectDialog(false);
    },
    keyPressed({ code }: KeyboardEvent): void {
      if (code === "Escape") this.closeDialog();
    },
    sent() {
      getAllUserPosts(this.username);
    },
    onScroll(e: UIEvent) {
      if (typeof window === "undefined") return;
      if (e.target != null) {
        const top = window.pageYOffset || (e.target as Element).scrollTop || 0;
        this.fab = top > 20;
      }
    },
    toTop() {
      const container = document.querySelector(".inscroll");
      if (container)
        container.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
    },
  },
  watch: {
    teamSelectDialog(visible: boolean) {
      if (visible) getAllUserPosts(this.username);
      else if (!visible) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    },
    created() {
      console.log("Team cards selected created");
    },
    updated() {
      console.log("Team selected cards updated");
    },
  },
});
</script>

<style lang="scss" scoped>
.btn:hover {
  cursor: default;
}
</style>
