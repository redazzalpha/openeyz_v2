<template>
  <!-- main-container -->
  <v-container grid-list-xs>
    <!-- leave-comment-area -->
    <v-row>
      <v-col class="d-flex align-center">
        <AvatarCpn
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
          autofocus
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
          <v-alert
            v-if="comments.length < 1"
            text
            color="red"
            :value="true"
            class="text-center"
          >
            This post has not comment be the first to leave one
          </v-alert>
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
              v-for="(comment, index) in comments"
              :key="index"
              class="d-flex align-center mb-5"
              elevation="0"
            >
              <AvatarCpn
                :avatarSrc="comment.author.avatarSrc"
                :role="comment.author.roles[0].roleName"
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
                  {{ comment.author.name }}
                  said on
                  {{ translateDate(comment.creation) }}
                </v-card-title>
                <!-- comment-content -->
                <div class="message-arrowed"></div>
                <v-card-text class="white--text pt-0">
                  <div class="d-flex">
                    {{ comment.content }}
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
import { mapState, mapActions } from "vuex";
import { httpRequest } from "@/utils/http";
import { Item } from "../../utils/types";
import { translateDate } from "../../utils/function";
import AvatarCpn from "../cpn/Avatar-cpn.vue";
import * as Defines from "@/utils/defines";
export default Vue.extend({
  name: "Comment-msg",
  components: {
    AvatarCpn,
  },
  props: {
    itemPost: { type: Object as PropType<Item>, required: true },
  },
  data() {
    return {
      translateDate: translateDate,
      comment: "",
    };
  },
  computed: {
    ...mapState(["currentUser", "comments"]),
  },
  methods: {
    ...mapActions(["getAllComments"]),
    // TODO; block message length as 255 char max need to do it on server too
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
