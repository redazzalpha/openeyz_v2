<template>
  <!-- selected-user-dialog -->
  <v-dialog
    :value="teamSelectedDialog"
    fullscreen
    hide-overlay
    transition="dialog-transition"
    class="team-selected-dialog"
    @click:outside="closeDialog"
    @keydown="keyPressed"
  >
    <v-card
      v-scroll.self="onScroll"
      class="overflow-y-auto inscroll"
      max-height="400"
      :style="
        'background:  url(' +
        ($vuetify.theme.dark
          ? require('../../assets/bg-team-selected-dark.webp')
          : require('../../assets/bg-team-selected.webp')) +
        ') no-repeat fixed center'
      "
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
            <v-card-title primary-title class="d-flex justify-center">
              {{ author }} 's publications
            </v-card-title>
            <v-card-subtitle style="opacity: 0.7">
              Here you could find all {{author}} publications. From this place 
              you can interact add comment or like publications.
            </v-card-subtitle>
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

            <CommentBlock />
          </v-col>
        </v-row>
      </v-container>

      <!-- alert part -->
      <div class="d-flex justify-center">
        <!-- empty-post-alert -->
        <AlertCpn
          v-if="!posts.length"
          :message="`${author} has no post at now !`"
          :action="closeDialog"
        />
        <!-- end-of-post-alert -->
        <AlertCpn
          v-else
          :message="`You have reach end of ${author} 's publications`"
          :action="closeDialog"
          class="pt-10"
        />
      </div>
    </v-card>

    <!-- scroll-top-button -->
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
import {
  addAllPosts,
  getAllPosts,
  translateDateToISO,
} from "../../utils/functions";
import { POST_GET_LIMIT, TEAM_PAGE_URL } from "../../utils/defines";
import PublicationCpn from "../cpn/Publication-cpn.vue";
import ToolbarCpn from "../cpn/Toolbar-cpn.vue";
import AlertCpn from "../cpn/Alert-cpn.vue";
import LinksCpn from "../cpn/Links-cpn.vue";
import CommentBlock from "../comment/Comment-block.vue";

export default Vue.extend({
  name: "Team-selected",
  components: {
    ToolbarCpn,
    PublicationCpn,
    AlertCpn,
    LinksCpn,
    CommentBlock,
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
    };
  },
  computed: {
    ...mapState(["teamSelectedDialog", "posts", "currentItem"]),
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
    },
    onScroll(e: UIEvent) {
      let scroll: number =
        (e.target as Element).clientHeight + (e.target as Element).scrollTop;
      let bottom: number = (e.target as Element).scrollHeight;

      if (typeof window === "undefined") return;
      if (e.target != null) {
        const top = window.pageYOffset || (e.target as Element).scrollTop || 0;
        this.fab = top > 20;
      }

      if (bottom && scroll === bottom) {
        if (
          this.posts.length &&
          this.$router.currentRoute.path === TEAM_PAGE_URL
        ) {
          const date = translateDateToISO(
            this.posts[this.posts.length - 1].post.creation
          );
          addAllPosts(POST_GET_LIMIT, date, this.username);
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
  },
  watch: {
    teamSelectedDialog(visible: boolean) {
      if (visible) getAllPosts(POST_GET_LIMIT, undefined, this.username);
      else if (!visible) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    },
  },
  created() {
    this.updateTeamSelectedDialog(false);
  },
  destroyed() {
    this.updateTeamSelectedDialog(false);
  },
});
</script>

<style lang="scss" scoped>
.btn:hover {
  cursor: default;
}
</style>
