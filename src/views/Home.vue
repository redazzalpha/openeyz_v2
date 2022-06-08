<template>
  <div class="home">
    <TitleCpn />
    <PostCpn />
    <div v-for="(post, index) in posts" :key="index">
      <PublicationCpn :item="post" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import TitleCpn from "@/components/cpn/Title-cpn.vue";
import PostCpn from "@/components/cpn/Post-cpn.vue";
import PublicationCpn from "@/components/cpn/Publication-cpn.vue";
export default Vue.extend({
  name: "Home-page",
  components: {
    TitleCpn,
    PostCpn,
    PublicationCpn,
  },
  computed: {
    ...mapState(["posts"]),
  },
  methods: {
    ...mapActions(["getAllPosts"]),
  },
  created() {
      this.getAllPosts();
  },
});
</script>

<style lang="scss" scoped>
.logo {
  font-size: $size-logo-title-home !important;
}
</style>
