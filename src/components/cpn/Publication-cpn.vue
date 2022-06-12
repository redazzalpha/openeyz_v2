<template>
  <div class="publication">
    <v-lazy
      v-model="isActive"
      :options="{
        threshold: 0.5,
      }"
      min-height="200"
      transition="fade-transition"
    >
      <div class="publication">
        <!-- main-container -->
        <v-container grid-list-xs fluid>
          <v-row no-gutters>
            <v-col>
              <!-- TODO: add cross icon to remove publication from user and superuser-->
              <!-- publication-card -->
              <v-card max-width="700" class="mx-auto mb-8">
                <!-- header-title -->
                <v-card-title
                  primary-title
                  class="text-body-1 white--text text-body-2 text-sm-subtitle-1 pa-2"
                  :style="`background-color: ${
                    $vuetify.theme.dark ? '#424242' : '#00acc1'
                  }`"
                >
                  <!-- author-avatar -->
                  <span class="shrink">
                    <AvatarCpn
                      :avatarSrc="item.post.author.avatarSrc"
                      :role="item.post.author.roles[0].roleName"
                    />
                  </span>
                  <span>
                    post from {{ item.post.author.name }} <br />
                    {{ translateDate(item.post.creation) }}
                  </span>
                  <!-- delete-button -->
                  <v-btn
                    color="error"
                    absolute
                    right
                    icon
                    title="delete"
                    plain
                    :ripple="false"
                    @click.stop="deleteOne(item.post.id)"
                  >
                    <v-icon color="white">mdi-close-circle</v-icon>
                  </v-btn>
                </v-card-title>
                <!-- publication-content -->
                <v-card-text
                  v-html="item.post.content"
                  class="pa-0"
                ></v-card-text>

                <!-- buttons -->
                <v-card-actions>
                  <v-container grid-list-xs fluid>
                    <v-row>
                      <!-- comment-button -->
                      <v-col
                        class="d-flex justify-center pa-0"
                        style="opacity: 1"
                      >
                        <v-btn
                          text
                          plain
                          :ripple="false"
                          title="see comments"
                          color="primary"
                          @click="showComment(item)"
                        >
                          comments<i class="fa fa-comment-dots">
                            <span class="text-body-2">{{
                              item.commentCount > 0 ? item.commentCount : ""
                            }}</span></i
                          >
                        </v-btn>
                      </v-col>
                      <!-- // TODO: got to fix bug on like click cause nmber of like doesnt appaer -->
                      <!-- like-button -->
                      <v-col class="d-flex justify-center pa-0">
                        <v-badge
                          :value="item.likeCount > 0"
                          :content="item.likeCount"
                          overlap
                          bottom
                          class="badge"
                        >
                          <v-btn
                            icon
                            plain
                            :ripple="false"
                            title="like this post"
                            @click="like(item)"
                          >
                            <i
                              class="fa fa-heart"
                              :style="`color: ${item.userLike ? 'red' : ''}`"
                            >
                            </i>
                          </v-btn>
                        </v-badge>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-lazy>
    <CommentBlock
      :dialog="dialog"
      :itemPost="item"
      @stop="closeComment"
      @send="commentSent"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { mapActions } from "vuex";
import { Item } from "../../utils/types";
import { httpRequest } from "../../utils/http";
import { translateDate } from "../../utils/functions";
import { getAllPosts, getAllComments } from "../../utils/functions";
import AvatarCpn from "./Avatar-cpn.vue";
import CommentBlock from "../comment/Comment-block.vue";
import { POST_GET_LIMIT, SERVER_LIKE_URL, SERVER_PUBLICATION_LIMIT_URL } from "../../utils/defines";

export default Vue.extend({
  name: "Publication-cpn",
  components: {
    AvatarCpn,
    CommentBlock,
  },
  props: {
    item: {
      type: Object as PropType<Item[]>,
      required: false,
    },
  },
  data() {
    return {
      translateDate: translateDate,
      isActive: false,
      dialog: false,
      comments: [],
    };
  },
  methods: {
    ...mapActions(["updateComments"]),
    async showComment(item: Item): Promise<void> {
      await getAllComments(item.post.id);
      this.dialog = true;
    },
    closeComment() {
      this.dialog = false;
      this.updateComments([]);
    },
    // TODO: modify the way of value incrementation cause bad here need to get real value from the database at time need to make a request to the server
    commentSent(itemPost: Item) {
      if (itemPost.commentCount != undefined) itemPost.commentCount++;
    },
    async like(item: Item) {
      const postId: FormData = new FormData();
      if (item.post) postId.append("postId", item.post.id.toString());
      await httpRequest.post(SERVER_LIKE_URL, postId);
      await getAllPosts(POST_GET_LIMIT);
    },
    async deleteOne(postId: number) {
      await httpRequest.delete(SERVER_PUBLICATION_LIMIT_URL, {
        params: { postId },
      });
      await getAllPosts(POST_GET_LIMIT);
      this.$emit("sent");
    },
  },
});
</script>

<style lang="scss" scoped>


.fa-heart {
  font-size: 25px;
}

p {
  margin: 10px 10px !important;
}

/* .v-badge__badge{
    min-width: 15px!important;
    height: 15px!important;

} */
.badge {
    width: 32px!important;
    height: 27px!important;
}
.v-btn--plain:not(.v-btn--active):not(.v-btn--loading):not(:focus):not(:hover)
  .v-btn__content {
  opacity: 1 !important;
}
</style>
