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
                  style="background-color: #00acc1"
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
                      <!-- like-button -->
                      <v-col class="d-flex justify-center pa-0">
                        <v-btn
                          icon
                          plain
                          :ripple="false"
                          title="like this post"
                          @click="like(item)"
                        >
                          <i
                            class="fa fa-heart"
                            :style="'color: ' + (item.userLike ? 'red' : '')"
                          >
                            <v-badge
                              :value="true"
                              :content="item.likeCount"
                              color="transparent"
                            >
                            </v-badge>
                          </i>
                        </v-btn>
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
import { getAllPosts, getAllComments} from '../../utils/functions';
import * as Defines from "../../utils/defines";
import AvatarCpn from "@/components/cpn/Avatar-cpn.vue";
import CommentBlock from "@/components/comment/Comment-block.vue";

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
    showComment(item: Item): void {
      getAllComments(item.post.id);
      this.dialog = true;
    },
    closeComment() {
      this.dialog = false;
      this.updateComments([]);
    },
    commentSent(itemPost: Item) {
      if (itemPost.commentCount != undefined) itemPost.commentCount++;
    },
    async like(item: Item) {
      const postId: FormData = new FormData();
      if (item.post) postId.append("postId", item.post.id.toString());
      await httpRequest.post(Defines.SERVER_LIKE_URL, postId);
      getAllPosts();
    },
  },
  created(): void {
    //TODO:find a why to get posts cause posts is only refresh on created wich means only once
    // this.getAllPosts();
  },
});
</script>

<style lang="scss">
.fa-heart {
  font-size: 30px;
}

p {
  margin: 10px 10px !important;
}

.v-badge__badge {
  inset: auto auto calc(100% - 9px) calc(100% - 11px) !important;
  font-size: 12px !important;
  font-weight: bold;
  /* background-color: transparent; */
  color: #2196f3 !important;
}
/* 
.v-btn--plain:not(.v-btn--active):not(.v-btn--loading):not(:focus):not(:hover) 
.v-btn__content {
    opacity: 1 !important;
} */
</style>
