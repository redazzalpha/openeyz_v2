<template>
  <v-container class="comment-message-container pa-0 pb-5">
    <v-row no-gutters>
      <v-col>
        <v-card
          class="d-flex align-center mx-auto"
          elevation="0"
          style="background-color: transparent;"
          max-width="95%"
        >
          <AvatarCpn
            :avatarSrc="comment.author.avatarSrc"
            :role="comment.author.roles[0].roleName"
            size="55"
            class="flex-shrink-1"
          />
          <div
            class="message-arrowed flex-grow-1 elevation-3"
            style="
              background-color: #2196f3;
              position: relative;
              border-radius: 15px;
            "
          >
            <!-- comment-title-header -->
            <v-card-title
              primary-title
              class="text-body-2 text-sm-subtitle-1 white--text pa-2 mb-2"
            >
              <span class="mr-1">
                {{ comment.author.name }}
                said on
              </span>
              <span class="mr-5">
                {{ translateDate(comment.creation) }}
              </span>

              <!-- delete-button -->
              <v-btn
                v-if="isAuthorized()"
                color="error"
                icon
                title="delete"
                plain
                :ripple="false"
                @click.stop="deleteComment"
                style="position: absolute; top: 0px; right: 0"
              >
                <v-icon color="white">mdi-close-circle</v-icon>
              </v-btn>
            </v-card-title>
            <!-- comment-content -->
            <v-card-text class="white--text pt-0">
              <div class="d-flex text-break">
                {{ comment.content }}
              </div>
            </v-card-text>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { PropType } from "vue";
import { Comment } from "../../utils/types";
import { deleteComment, getAllComments, translateDate } from "../../utils/functions";
import AvatarCpn from "../cpn/Avatar-cpn.vue";
import { COMMENT_GET_LIMIT } from "../../utils/defines";
import { mapState } from "vuex";
export default Vue.extend({
  name: "Comment-message",
  components: {
    AvatarCpn,
  },
  props: {
    comment: {
      type: Object as PropType<Comment>,
      required: true,
    },
  },
  data() {
    return {
      translateDate: translateDate,
    };
  },
  computed: {
    ...mapState(["currentItem", "currentUser"]),
  },
  methods: {
    async deleteComment() {
      await deleteComment(this.comment);
      await getAllComments(this.currentItem, COMMENT_GET_LIMIT);
      this.currentItem.commentCount--;
    },
    isAuthorized(): boolean {
      return (
        this.currentUser.roles[0].roleName == "SUPERADMIN" ||
        this.currentUser.roles[0].roleName == "ADMIN" ||
        this.currentUser.username == this.comment.author.username
      );
    },
  },
});
</script>

<style lang="scss" scoped>
.message-arrowed::after {
  content: "";
  position: absolute;
  left: -26px;
  top: 45%;
  bottom: 50%;
  border: solid transparent 15px;
  border-left: solid transparent 15px;
  border-right: solid #2196f3 15px;
}
</style>
