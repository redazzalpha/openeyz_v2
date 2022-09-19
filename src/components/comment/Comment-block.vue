<template>
  <!-- main-row-container -->
  <!-- dialog-block -->
  <v-dialog
    v-if="currentItem.post"
    dialog-transition
    :value="commentDialog"
    @click:outside="closeComment"
    @keydown="keyPressed"
    max-width="900"
    :scrollable="comments.length < 1"
    overlay-opacity="0.7"
    :fullscreen="$vuetify.breakpoint.name == 'xs' ? true : false"
  >
    <!-- main-card -->
    <v-card
      v-scroll.self="infiniteScroll"
      class="overflow-y-auto inscroll"
      max-height="600"
      :style="background"
      style="border: solid white 3px"
    >
      <v-btn icon plain fixed @click="closeComment"
        ><v-icon>mdi-close</v-icon></v-btn
      >

      <v-container grid-list-xs>
        <v-row>
          <v-col class="text-center">
            <v-card-title class="justify-center" primary-title
              >Comments</v-card-title
            >
            <v-card-subtitle style="opacity: 0.7"
              >Look at the comments of this post or leave one</v-card-subtitle
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <PublicationCpn :item="currentItem" :subline="false" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <CommentArea :item="currentItem" />
          </v-col>
        </v-row>
        <v-row v-if="comments.length > 0">
          <v-col class="pa-0">
            <CommentMessage
              v-for="(comment, index) in comments"
              :key="index"
              :comment="comment"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pt-0">
            <InfoCpn
              v-if="!comments.length"
              message="This post has not comment be the first to leave one"
              class="mt-1"
              :action="closeComment"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import {
  COMMENT_GET_LIMIT,
  HOME_PAGE_URL,
  TEAM_PAGE_URL,
} from "../../utils/defines";
import {
  addAllComments,
  getAllComments,
  translateDateToISO,
} from "../../utils/functions";
import InfoCpn from "../cpn/Info-cpn.vue";
import PublicationCpn from "../cpn/Publication-cpn.vue";
import CommentArea from "./Comment-area.vue";
import CommentMessage from "./Comment-message.vue";
export default Vue.extend({
  name: "Comment-block",
  components: {
    PublicationCpn,
    CommentArea,
    CommentMessage,
    InfoCpn,
  },
  computed: {
    ...mapState(["currentItem", "commentDialog", "comments"]),
    background(): string {
      const isXs : boolean = this.$vuetify.breakpoint.name == "xs";
      const backgroundAf: string = this.$vuetify.theme.dark
        ? require("../../assets/backgrounds/tertiary-dark.webp")
        : require("../../assets/backgrounds/tertiary.webp");
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
  },
  methods: {
    ...mapActions([
      "updateCommentDialog",
      "updateComments",
      "updateCurrentItem",
    ]),
    infiniteScroll(e: UIEvent) {
      let scroll: number =
        (e.target as Element).clientHeight + (e.target as Element).scrollTop;
      let bottom: number = (e.target as Element).scrollHeight;
      if (bottom && scroll === bottom) {
        if (
          this.comments.length &&
          (this.$router.currentRoute.path === HOME_PAGE_URL ||
            this.$router.currentRoute.path === TEAM_PAGE_URL)
        ) {
          const date = translateDateToISO(
            this.comments[this.comments.length - 1].creation
          );
          addAllComments(this.currentItem.post.id, COMMENT_GET_LIMIT, date);
        }
      }
    },
    closeComment() {
      this.updateCommentDialog(false);
      this.updateComments([]);
      this.updateCurrentItem({});
    },
    keyPressed({ code }: KeyboardEvent) {
      if (code.match("Escape")) this.closeComment();
    },
  },
  watch: {
    commentDialog(visible: boolean) {
      if (visible) getAllComments(this.currentItem, COMMENT_GET_LIMIT);
    },
  },
});
</script>
