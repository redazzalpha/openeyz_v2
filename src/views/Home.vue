<template>
  <div class="home-page-block">
    <HeadCpn />
    <PostCpn />
    <PublicationCpn
      v-for="(post, index) in posts"
      :key="index"
      :item="post"
    />
    <CommentBlock />
    <AlertCpn
      v-if="posts.length <= 0"
      message="just was born no publication is available"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import { getAllPosts, getAllNotifs } from "../utils/functions";
import {POST_GET_LIMIT } from "../utils/defines";
import HeadCpn from "@/components/cpn/Head-cpn.vue";
import PostCpn from "@/components/cpn/Post-cpn.vue";
import PublicationCpn from "@/components/cpn/Publication-cpn.vue";
import AlertCpn from "../components/cpn/Alert-cpn.vue";
import CommentBlock from "../components/comment/Comment-block.vue";
export default Vue.extend({
  name: "Home-page",
  components: {
    HeadCpn,
    PostCpn,
    PublicationCpn,
    AlertCpn,
    CommentBlock,
  },
  computed: {
    ...mapState(["currentUser", "posts"]),
  },
  data() {
    return {
      loader: true,
    };
  },
  methods: {
    ...mapActions(["updateLoader"]),
  },
  // TODO: got to find out a way to reload getallposts cause in this hook created it reloads only once when page is loaded or reloaded
  created() {
    getAllPosts(POST_GET_LIMIT);
  },
  mounted() {
    this.updateLoader(false);
  },
  updated() {
    getAllNotifs();
  },
});
</script>

<style lang="scss" scoped>
.logo {
  font-size: $size-logo-title-home !important;
}
</style>
