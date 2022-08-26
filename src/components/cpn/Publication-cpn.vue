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
              <!-- publication-card -->
              <v-card max-width="700" class="mx-auto">
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
                    v-if="subline && isAuthorized()"
                    color="error"
                    absolute
                    right
                    icon
                    title="delete"
                    plain
                    :ripple="false"
                    @click.stop="deletePost"
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
                <v-card-actions
                  :style="`visibility: ${subline ? 'visible' : 'hidden'} `"
                >
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
                          @click="openComment(item)"
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
                          :loading="loading"
                          :disabled="disabled"
                          @click="like(item)"
                        >
                          <v-badge
                            :value="item.likeCount > 0"
                            :content="item.likeCount"
                            overlap
                            bottom
                            class="badge"
                          >
                            <i
                              class="fa fa-heart"
                              :style="`color: ${item.userLike ? 'red' : ''}`"
                            >
                            </i>
                          </v-badge>
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
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { mapState, mapActions } from "vuex";
import { Item, VueResponse } from "../../utils/types";
import { getAllPosts, translateDate } from "../../utils/functions";
import AvatarCpn from "./Avatar-cpn.vue";
import { httpRequest } from "../../utils/http";
import {
  POST_GET_LIMIT,
  SERVER_LIKE_COUNT_URL,
  SERVER_LIKE_URL,
  SERVER_PUBLICATION_URL,
} from "../../utils/defines";
export default Vue.extend({
  name: "Publication-cpn",
  components: {
    AvatarCpn,
  },
  props: {
    item: {
      type: Object as PropType<Item>,
      required: false,
    },
    subline: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      translateDate: translateDate,
      isActive: false,
      comments: [],
      loading: false,
      disabled: false,
    };
  },
  computed: {
    ...mapState(["posts", "currentUser"]),
  },
  methods: {
    ...mapActions(["updateCurrentItem", "updateCommentDialog"]),
    async like(item: Item) {
      this.loading = true;
      this.disabled = true;

      const postId: FormData = new FormData();
      if (item.post) postId.append("postId", item.post.id.toString());
      await httpRequest.post(SERVER_LIKE_URL, postId);

      const response: VueResponse = await httpRequest.get(
        SERVER_LIKE_COUNT_URL,
        { params: { postId: item.post?.id } }
      );
      item.likeCount = response.body as unknown as number;
      item.userLike = !item.userLike;

      setTimeout(() => {
        this.loading = false;
        this.disabled = false;
      }, 1000);
    },
    async deletePost() {
      await httpRequest.delete(SERVER_PUBLICATION_URL, {
        params: { postId: this.item.post?.id },
      });
      await getAllPosts(
        POST_GET_LIMIT,
        this.posts[this.posts.length - 1].creation
      );
    },
    openComment(item: Item) {
      this.updateCurrentItem(item);
      this.updateCommentDialog(true);
    },
    isAuthorized(): boolean {
      return (
        this.currentUser.roles[0].roleName == "SUPERADMIN" ||
        this.currentUser.roles[0].roleName == "ADMIN" ||
        this.currentUser.username == this.item.post?.author.username
      );
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
  width: 35px !important;
  height: 20px !important;
}
.v-btn--plain:not(.v-btn--active):not(.v-btn--loading):not(:focus):not(:hover)
  .v-btn__content {
  opacity: 1 !important;
}
</style>
