<template>
  <div class="home-page-block">
    <HeadCpn />
    <PostCpn />
    <PublicationCpn v-for="(post, index) in posts" :key="index" :item="post" />
    <CommentBlock />
    <v-container grid-list-xs class="my-7">
      <v-row v-if="!posts.length">
        <v-col>
          <InfoCpn message="just was born no publication is available" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import { getPosts, initialize } from "../utils/functions";
import { POST_GET_LIMIT } from "../utils/defines";
import HeadCpn from "@/components/cpn/Head-cpn.vue";
import PostCpn from "@/components/cpn/Post-cpn.vue";
import PublicationCpn from "@/components/cpn/Publication-cpn.vue";
import InfoCpn from "../components/cpn/Info-cpn.vue";
import CommentBlock from "../components/comment/Comment-block.vue";
export default Vue.extend({
  name: "Home-page",
  components: {
    HeadCpn,
    PostCpn,
    PublicationCpn,
    InfoCpn,
    CommentBlock,
  },
  computed: {
    ...mapState(["currentUser", "posts"]),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["updateLoader"]),
  },
  created() {
    getPosts(POST_GET_LIMIT);
  },
  mounted() {
    initialize();
  },
  destroyed() {
    this.updateLoader(true);
  },
});
</script>

<style lang="scss" scoped>
.logo {
  font-size: $size-logo-title-home !important;
}
</style>
