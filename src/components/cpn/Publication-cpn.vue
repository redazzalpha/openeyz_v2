<template>
  <div class="publication">
    <v-lazy
      v-model="isActive"
      :options="{
        threshold: 0.5,
      }"
      transition="fade-transition"
    >
      <div class="publication">
        <!-- main-container -->
        <v-container grid-list-xs fluid>
          <v-row no-gutters>
            <v-col>
              <!-- publication-card -->
              <v-card max-width="700" class="mx-auto" :style="background">
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
                    <router-link :to="'/team/' + item.post.author.username">
                      <AvatarCpn
                        :avatarSrc="item.post.author.avatarSrc"
                        :role="item.post.author.roles[0].roleName"
                      />
                    </router-link>
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
                <v-card-text v-html="getPostContent" class="pa-0"></v-card-text>
                <!-- buttons -->
                <v-card-actions
                  :style="`visibility: ${
                    subline ? 'visible' : 'hidden; height: 15px;'
                  } `"
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
import { deletePost, likePost, translateDate } from "../../utils/functions";
import AvatarCpn from "./Avatar-cpn.vue";

export default Vue.extend({
  name: "Publication-cpn",
  components: {
    AvatarCpn,
  },
  props: {
    item: {
      type: Object as PropType<Item>,
      required: true,
    },
    subline: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      isActive: false,
      comments: [],
      loading: false,
      disabled: false,
      translateDate: translateDate,
    };
  },
  computed: {
    ...mapState(["posts", "currentUser"]),
    getPostContent(): string | undefined {
      const isXs: boolean = this.$vuetify.breakpoint.name == "xs";
      const paragraph = "<p>";
      const paragraphReplace = "<p style='padding-left: 15px;'>";
      const cover = "cover";
      const coverReplace = `${
        isXs ? "cover; max-height: 1000px" : "contain; max-height: 700px"
      }`;

      return this.item.post?.content
        .replace(paragraph, paragraphReplace)
        .replace(cover, coverReplace);
    },
    background(): string {
      const backgroundUrl: string = this.$vuetify.theme.dark
        ? require("../../assets/backgrounds/tertiary-dark.webp")
        : require("../../assets/backgrounds/tertiary.webp");
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
    ...mapActions(["updateCurrentItem", "updateCommentDialog"]),
    async like(item: Item) {
      this.loading = true;
      this.disabled = true;
      const response: VueResponse = await likePost(item);
      item.likeCount = response.body as unknown as number;
      item.userLike = !item.userLike;
      setTimeout(() => {
        this.loading = false;
        this.disabled = false;
      }, 1000);
    },
    async deletePost() {
      deletePost(this.item, this.posts);
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
.badge {
  width: 35px !important;
  height: 20px !important;
}
.v-btn--plain:not(.v-btn--active):not(.v-btn--loading):not(:focus):not(:hover)
  .v-btn__content {
  opacity: 1 !important;
}
</style>
<style lang="scss" scoped>
p {
  border: solid red 3px;
  padding-left: 5px;
}
</style>
