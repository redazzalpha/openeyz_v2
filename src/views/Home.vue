<template>
  <div class="home">
    <Title />
    <PostInput />

    <!-- publication component -->
    <div v-for="(post, index) in posts" :key="index">
      <Publication :item="post" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Title from "@/components/cpn/Title-cpn.vue";
import PostInput from "@/components/cpn/Post-cpn.vue";
import Publication from "@/components/cpn/Publication-cpn.vue";
import { mapActions, mapState } from "vuex";
export default Vue.extend({
  name: "Home-page",
  components: {
    Title,
    PostInput,
    Publication,
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
