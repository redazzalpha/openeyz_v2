<template>
  <div>
    <!-- main-card -->
    <v-card-title
      primary-title
      class="text-body-1 white--text text-body-2 text-sm-subtitle-1 pa-2"
      style="background-color: #00acc1"
    >
      <!-- author-avatar -->

      <span class="shrink">
        <AvatarCpn
          :avatarSrc="itemPost.post.author.avatarSrc"
          :role="itemPost.post.author.roles[0].roleName"
          size="45"
        />
      </span>
      post from {{ itemPost.post.author.name }} <br />
      {{ translateDate(itemPost.post.creation) }}
      <span> </span>
    </v-card-title>

    <!-- publication-content -->
    <v-card-text class="pa-0">
      <div v-html="itemPost.post.content"></div>
      <v-divider class="my-5"></v-divider>
    </v-card-text>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Item } from "../../utils/types";
import { translateDate } from "../../utils/functions";
import AvatarCpn from "../cpn/Avatar-cpn.vue";
export default Vue.extend({
  name: "Comment-publication",
  components: {
    AvatarCpn,
  },
  props: {
    itemPost: { type: Object as PropType<Item>, required: true },
  },
  data() {
    return {
      translateDate: translateDate,
    };
  },
});
</script>
