<template>
  <!-- main-container -->
  <v-container grid-list-xs>
    <!-- leave-comment-area -->
    <v-row>
      <v-col class="d-flex align-center">
        <Avatar
          :avatarSrc="currentUser.avatarSrc"
          :role="currentUser.roles[0].roleName"
          size="40"
        />
        <v-textarea
          v-model="comment"
          placeholder="leave comment..."
          auto-grow
          outlined
          rows="1"
          row-height="15"
          rounded
          hide-details
        >
          <!-- FIXME: fix btn bug sometimes does not appear - try to change with append directive -->
          <!-- send-comment-button -->
          <template v-slot:append>
            <v-btn icon color="primary" @click="send">
              <v-icon>mdi-send</v-icon>
            </v-btn>
          </template>
        </v-textarea>
      </v-col>
    </v-row>
    <!-- comment-message -->
    <v-row>
      <v-col>
        <v-card elevation="0">
          <!-- no comment-message -->
          <VAlert
            v-if="comments.length < 1"
            text
            color="red"
            :value="true"
            class="text-center"
          >
            This post has not comment be the first to leave one
          </VAlert>
          <!-- comment-block -->
          <div v-else class="comment-block">
            <!-- comment-title -->
            <v-card-title
              primary-title
              class="text-decoration-underline text-body-2 text-sm-body-1"
            >
              Comment:
            </v-card-title>
            <!-- message-card -->
            <v-card
              v-for="(item, index) in comments"
              :key="index"
              class="d-flex align-center mb-5"
              elevation="0"
            >
              <Avatar
                :avatarSrc="item.comment.author.avatarSrc"
                :role="item.comment.author.roles[0].roleName"
                size="40"
                class="flex-shrink-1"
              />
              <div
                class="message-arrowed flex-grow-1 elevation-3"
                style="background-color: #2196f3; position: relative"
              >
                <!-- comment-title-header -->
                <v-card-title
                  primary-title
                  class="text-body-2 text-sm-subtitle-1 white--text pa-2 mb-2"
                >
                  {{ item.comment.author.name }}
                  said on
                  {{ item.creation }}
                </v-card-title>
                <!-- comment-content -->
                <div class="message-arrowed"></div>
                <v-card-text class="white--text pt-0">
                  <div class="d-flex">
                    {{ item.comment.content }}
                  </div>
                </v-card-text>
              </div>
            </v-card>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import Avatar from "../cpn/Avatar-cpn.vue";
import { mapState, mapActions } from "vuex";
import { httpRequest } from "@/utils/http";
import * as Defines from "@/utils/defines";
import { Item } from "../../utils/types";
export default Vue.extend({
  name: "Comment-msg",
  components: {
    Avatar,
  },
  props: {
    itemPost: { type: Object as PropType<Item>, required: true },
  },
  data() {
    return {
      comment: "",
    };
  },
  computed: {
    ...mapState(["currentUser", "comments"]),
  },
  methods: {
    ...mapActions(["getAllComments"]),
    async send(): Promise<void> {
      if (this.itemPost.post) {
        const data: FormData = new FormData();
        data.append("comment", this.comment);
        data.append("postId", this.itemPost.post?.id.toString());
        await httpRequest.post(Defines.SERVER_COMMENT_URL, data);
        this.comment = "";
        this.getAllComments(this.itemPost.post?.id);
        this.$emit("send", this.itemPost);
      }
    },
  },
});
</script>

<style lang="scss">
.v-input__append-inner {
  margin-top: 8px !important;
}

.message-arrowed::after {
  content: "";
  position: absolute;
  left: -26px;
  top: 28%;
  border: solid transparent 15px;
  border-left: solid transparent 15px;
  border-right: solid #2196f3 15px;
}
</style>
