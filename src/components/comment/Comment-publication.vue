<template>
    <div>
        <v-card-title primary-title class="text-body-1 white--text text-body-2 text-sm-subtitle-1 pa-2"
            style="background-color: #00ACC1;">
            <!-- author-avatar -->
            <Avatar :avatarSrc="itemPost.post.author.avatarSrc" :role="itemPost.post.author.roles[0].roleName" size="45" />
            {{ itemPost.post.author.name }} posted on {{ itemPost.creation }}
        </v-card-title>
        <!-- main-content -->
        <v-card-text class="pa-0">
            <div v-html="itemPost.post.content"></div>
            <v-divider class="my-5"></v-divider>
        </v-card-text>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import Avatar from '../cpn/Avatar-cpn.vue';
import { Item } from '../../utils/types';
export default Vue.extend({
    name: 'Comment-publication',
    components: {
        Avatar,
    },
    props: {
        itemPost: { type: Object as PropType<Item>, required: true }
    }
});
</script>

