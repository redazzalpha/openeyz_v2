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
import { getAllComments } from "../../utils/functions";
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
    closeComment() {
      this.updateCommentDialog(false);
    },
    keyPressed({ code }: KeyboardEvent) {
      if (code.match("Escape")) this.closeComment();
    },
  },
  watch: {
    commentDialog(visible: boolean) {
      if (visible) getAllComments(this.currentItem.post.id);
      else {
        this.updateComments([]);
        this.updateCurrentItem({});
      }
    },
  },
});
</script>
