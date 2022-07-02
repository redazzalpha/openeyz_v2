<template>
  <!-- main-row-container -->
  <!-- dialog-block -->
  <v-dialog
    v-if="currentItem.post"
    dialog-transition
    :value="commentDialog"
    @click:outside="closeComment"
    @keydown="keyPressed"
    max-width="800"
    :scrollable="comments.length < 1"
  >
    <!-- main-card -->
    <v-card
      v-scroll.self="onScroll"
      class="overflow-y-auto inscroll"
      max-height="600"
      :style="
        'background:  url(' +
        ($vuetify.theme.dark
          ? require('../../assets/bg-notfound-dark.webp')
          : require('../../assets/bg-notfound.webp')) +
        ') fixed no-repeat center; background-size: cover; '
      "
    >
      <PublicationCpn :item="currentItem" :subline="false" />
      <CommentArea :item="currentItem" />
      <CommentMessage
        v-for="(comment, index) in comments"
        :key="index"
        :comment="comment"
      />
      <AlertCpn
        v-if="comments.length < 1"
        message="This post has not comment be the first to leave one"
        class="mt-10"
        :action="closeComment"
      />
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
import AlertCpn from "../cpn/Alert-cpn.vue";
import PublicationCpn from "../cpn/Publication-cpn.vue";
import CommentArea from "./Comment-area.vue";
import CommentMessage from "./Comment-message.vue";
export default Vue.extend({
  name: "Comment-block",
  components: {
    PublicationCpn,
    CommentArea,
    CommentMessage,
    AlertCpn,
  },
  computed: {
    ...mapState(["currentItem", "commentDialog", "comments"]),
  },
  methods: {
    ...mapActions([
      "updateCommentDialog",
      "updateComments",
      "updateCurrentItem",
    ]),
    onScroll(e: UIEvent) {
      let scroll: number =
        (e.target as Element).clientHeight + (e.target as Element).scrollTop;
      let bottom: number = (e.target as Element).scrollHeight;

      // if (typeof window === "undefined") return;
      // if (e.target != null) {
      //   const top = window.pageYOffset || (e.target as Element).scrollTop || 0;
      //   this.fab = top > 20;
      // }&

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
    },
    keyPressed({ code }: KeyboardEvent) {
      if (code.match("Escape")) this.closeComment();
    },
  },
  watch: {
    commentDialog(visible: boolean) {
      if (visible) getAllComments(this.currentItem.post.id, COMMENT_GET_LIMIT);
      else {
        this.updateComments([]);
        this.updateCurrentItem({});
      }
    },
  },
});
</script>
