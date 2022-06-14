<template>
  <!-- main-row-container -->
  <v-row class="comment-block-row" justify="center">
    <!-- dialog-block -->
    <v-dialog
      v-if="itemPost.post"
      :value="dialog"
      dialog-transition
      @click:outside="$emit('stop')"
      @keydown="dialogStop"
      max-width="800"
    >
      <!-- main-card -->
      <v-card>
        <CommentPublication :itemPost="itemPost" />
        <CommentMessage :itemPost="itemPost" @send="send" @delete="deleteOne" />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Item } from "../../utils/types";
//TODO: this import cause error try to find out a way to fix this
import CommentPublication from "./Comment-publication.vue";
import CommentMessage from "./Comment-message.vue";
export default Vue.extend({
  name: "Comment-block",
  components: {
    CommentPublication,
    CommentMessage,
  },
  props: {
    dialog: { type: Boolean, required: true },
    itemPost: { type: Object as PropType<Item>, required: true },
  },
  methods: {
    dialogStop({ code }: KeyboardEvent): void {
      if (code.match("Escape")) this.$emit("stop");
    },
    send(itemPost: Item) {
      this.$emit("send", itemPost);
    },
    deleteOne(itemPost: Item) {
      this.$emit("delete", itemPost);
    }
  },
});
</script>
