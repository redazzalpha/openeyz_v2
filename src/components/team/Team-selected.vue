<template>
  <!-- selected-user-dialog -->
  <div>
    <v-dialog
      v-if="teamSelectedDialog"
      :value="teamSelectedDialog"
      fullscreen
      hide-overlay
      transition="dialog-transition"
      class="team-selected-dialog"
      @click:outside="closeDialog"
      @keydown="keyPressed"
    >
      <v-card
        v-scroll.self="infiniteScroll"
        class="inscroll team-selected-card"
        max-height="400"
        :style="background"
        style="overflow-y: auto"
      >
        <!-- toolbar -->
        <ToolbarCpn
          icon="fa-solid fa-users"
          title="Publications"
          style="position: fixed; width: 100%; z-index: 1"
          xs
        >
          <template v-slot:end>
            <LinksCpn
              :show="
                !(
                  $vuetify.breakpoint.name == 'xs' ||
                  $vuetify.breakpoint.name == 'sm'
                )
              "
            />
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
              <v-card-title
                primary-title
                class="d-flex flex-column justify-center"
              >
                <span> {{ user.name }} {{ user.lname }}</span>
                <AvatarCpn
                  :path="user.avatarSrc ? user.avatarSrc : ''"
                  :role="
                    user.roles[0] != undefined ? user.roles[0].roleName : 'USER'
                  "
                  :state="user.state"
                  size="175"
                />
                <div class="d-flex flex-column">
                  <span class="text-body-2">
                    {{ user.username }}
                  </span>
                </div>
              </v-card-title>

              <v-card-subtitle class="text-center; pb-0"> </v-card-subtitle>
              <v-card-subtitle style="opacity: 0.7">
                Here you could find all {{ author }} publications. From this
                place you can interact add comment or like publications.
              </v-card-subtitle>
            </v-col>
          </v-row>

          <!-- Authorization menu  -->
          <v-row>
            <v-col class="text-center" v-if="showAuth">
              <authorizationCpn :user="user" @updated="updated" />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <!-- publication component -->
              <PublicationCpn
                v-for="(post, index) in posts"
                :key="index"
                :item="post"
              />
              <!-- comment-component -->
              <CommentBlock />
            </v-col>
          </v-row>
          <!-- empty-post-info -->
          <v-row v-if="!posts.length">
            <v-col>
              <InfoCpn
                :message="`${author} has no post at now !`"
                :action="closeDialog"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <!-- scroll-top-button -->
      <v-hover v-slot="{ hover }">
        <v-btn
          v-scroll="infiniteScroll"
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
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import {
  addPosts,
  getCurrentRole,
  getPosts,
  getSimpleUsers,
  getUserData,
  overflow,
  translateDateToISO,
} from "../../utils/functions";
import {
  INFINITE_SCROLL_OFFSET,
  POST_GET_LIMIT,
  TEAM_PAGE_URL,
} from "../../utils/defines";
import PublicationCpn from "../cpn/Publication-cpn.vue";
import ToolbarCpn from "../cpn/Toolbar-cpn.vue";
import InfoCpn from "../cpn/Info-cpn.vue";
import LinksCpn from "../cpn/Links-cpn.vue";
import AuthorizationCpn from "../cpn/AuthorizationCpn.vue";
import CommentBlock from "../comment/Comment-block.vue";
import { Users, VueResponse } from "../../utils/types";
import AvatarCpn from "../cpn/Avatar-cpn.vue";
import { getCurrent } from "../../utils/functions";

export default Vue.extend({
  name: "Team-selected",
  components: {
    ToolbarCpn,
    PublicationCpn,
    InfoCpn,
    LinksCpn,
    AuthorizationCpn,
    CommentBlock,
    AvatarCpn,
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
      user: new Users(),
      role: "USER",
      state: false,
      showAuth: false,
    };
  },
  computed: {
    ...mapState(["teamSelectedDialog", "posts", "currentItem"]),
    background(): string {
      const isXs: boolean = this.$vuetify.breakpoint.name == "xs";
      const backgroundAf: string = this.$vuetify.theme.dark
        ? require("../../assets/backgrounds/secondary-dark.webp")
        : require("../../assets/backgrounds/secondary.webp");
      const backgroundXs: string = this.$vuetify.theme.dark
        ? require("../../assets/backgrounds/primary-xs-dark.webp")
        : require("../../assets/backgrounds/primary-xs.webp");
      const backgroundUrl = isXs ? backgroundXs : backgroundAf;
      const backgroundImage: string =
        "background-image:  url(" + backgroundUrl + ");";
      const backgroundRepeat = "background-repeat:  no-repeat;";
      const backgroundPosition = "background-position: center;";
      const backgroundSize = "background-size: cover;";
      const backgroundAttachment = "background-attachment: fixed;";
      const backgroundColor = " background-color: #cccccc;";
      const background: string =
        backgroundImage +
        backgroundRepeat +
        backgroundPosition +
        backgroundSize +
        backgroundColor +
        backgroundAttachment;
      return background;
    },

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
    ...mapActions([
      "updateTeamSelectedDialog",
      "updateCurrentItem",
      "updateCommentDialog",
      "updateTeamSelectedUser",
    ]),
    keyPressed({ code }: KeyboardEvent) {
      if (code.match("Escape")) this.closeDialog();
    },
    closeDialog() {
      this.updateTeamSelectedDialog(false);
      this.updateTeamSelectedUser(null);
      this.toTop();
      getSimpleUsers();
      overflow(true);
    },
    infiniteScroll(e: UIEvent) {
      let scroll: number =
        (e.target as Element).clientHeight + (e.target as Element).scrollTop;
      let bottom: number = (e.target as Element).scrollHeight;

      if (typeof window === "undefined") return;
      if (e.target != null) {
        const top = window.pageYOffset || (e.target as Element).scrollTop || 0;
        this.fab = top > 20;
      }

      if (bottom && scroll >= bottom - INFINITE_SCROLL_OFFSET) {
        if (
          this.posts.length &&
          (this.$router.currentRoute.path === TEAM_PAGE_URL ||
            this.$router.currentRoute.name === "teamId")
        ) {
          const date = translateDateToISO(
            this.posts[this.posts.length - 1].post.creation
          );
          addPosts(POST_GET_LIMIT, date, this.username);
        }
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
    updated(payload: Users): void {
      this.user = payload;
    },
    isAuthorized(): boolean {
      return (
        getCurrentRole() == "SUPERADMIN" &&
        getCurrent("username") != this.user.username
      );
    },
  },
  watch: {
    teamSelectedDialog(visible: boolean) {
      if (visible) {
        getPosts(POST_GET_LIMIT, undefined, this.username);
        getUserData(this.username).then((response: VueResponse) => {
          this.user = response.body as Users;
          this.showAuth = this.isAuthorized();
        });
      } else {
        this.showAuth = false;
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.btn:hover {
  cursor: default;
}

.v-dialog {
  border: solid red 3px;
}
</style>
