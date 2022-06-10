<template>
  <div class="home">
    <HeadCpn />
    <PostCpn />
    <div v-for="(post, index) in posts" :key="index">
      <PublicationCpn :item="post" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import {getAllPosts} from '../utils/functions';
import HeadCpn from "@/components/cpn/Head-cpn.vue";
import PostCpn from "@/components/cpn/Post-cpn.vue";
import PublicationCpn from "@/components/cpn/Publication-cpn.vue";
export default Vue.extend({
  name: "Home-page",
  components: {
    HeadCpn,
    PostCpn,
    PublicationCpn,
  },
  computed: {
    ...mapState(["currentUser", "posts"]),
  },
  // TODO: got to find out a way to reload getallposts cause in this hook created it reloads only once when page is loaded or reloaded
  created() {
      getAllPosts();
  },
});
</script>

<style lang="scss" scoped>
.logo {
  font-size: $size-logo-title-home !important;
}
</style>
