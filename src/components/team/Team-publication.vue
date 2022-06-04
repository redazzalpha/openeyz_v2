<template>
    <div class="publication">
        <v-lazy v-model="isActive" :options="{
            threshold: 0.5
        }" min-height="200" transition="fade-transition">
            <div class="publication">
                <!-- main-container -->
                <v-container grid-list-xs fluid>
                    <v-row class="my-5">
                        <v-col class="text-center">
                            <v-card-title primary-title class="d-flex justify-center">
                                {{ author }} 's publications
                            </v-card-title>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col>
                            <!-- TODO: add cross icon to remove publication -->
                            <!-- publication-card -->
                            <v-card max-width="700" class=" mx-auto mb-8" v-for="(item, index) in userPosts"
                                :key="index">
                                <!-- header-title -->
                                <v-card-title primary-title
                                    class="text-body-1 white--text text-body-2 text-sm-subtitle-1 pa-2"
                                    style="background-color: #00ACC1;">
                                    <!-- author-avatar -->
                                    <Avatar :user="item.post.author" />
                                    {{ item.post.author.name }} posted on {{ item.creation }}
                                </v-card-title>
                                <!-- publication-content -->
                                <v-card-text v-html="item.post.content" class="pa-0"></v-card-text>
                                <!-- buttons -->
                                <v-card-actions>
                                    <v-container grid-list-xs fluid>
                                        <v-row>
                                            <!-- comment-button -->
                                            <v-col class="d-flex justify-center pa-0" style="opacity: 1">
                                                <v-btn text plain :ripple="false" title="see comments" color="primary"
                                                    @click="showComment(item)">
                                                    comments<i class="fa fa-comment-dots"> <span class="text-body-2">{{
                                                            item.commentCount > 0 ?
                                                                item.commentCount : ''
                                                    }}</span></i>
                                                </v-btn>
                                            </v-col>
                                            <!-- like-button -->
                                            <v-col class="d-flex justify-center pa-0">
                                                <v-btn icon plain :ripple="false" title="like this post"
                                                    @click="like(item)">
                                                    <i class="fa fa-heart"
                                                        :style="'color: ' + (item.userLike ? 'red' : '')">
                                                        <v-badge :value="true" :content="item.likeCount"
                                                            color="transparent">
                                                        </v-badge>
                                                    </i>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-actions>
                            </v-card>

                            <VAlert text color="primary" :value="true" max-width="700" class="mx-auto text-center">
                                You have reach end of {{ author }} 's publications
                            </VAlert>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
        </v-lazy>
        <Comment :dialog="dialog" @stop="closeComment" :itemPost="item" @send="commentSent" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import Avatar from '@/components/cpn/Avatar-cpn.vue';
import Comment from '@/components/comment/Comment-block.vue';
import { Item } from '../../utils/types';
import { httpRequest } from '../../utils/http';
import * as Defines from '../../utils/defines';

export default Vue.extend({
    name: "Team-publication",
    components: {
        Avatar,
        Comment,
    },
    props: {
        author: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            isActive: false,
            item: {},
            comments: [],
            dialog: false,
        };
    },
    computed: {
        ...mapState([
            'userPosts'
        ]),
    },
    methods: {
        ...mapActions([
            'getAllUserPosts',
            'getAllComments',
            'updateComments'
        ]),
        showComment(item: Item): void {
            this.getAllComments(item.post?.id);
            this.dialog = true;
            this.item = item;
        },
        closeComment() {
            this.dialog = false;
            this.updateComments([]);
        },
        commentSent(itemPost: Item) {
            if (itemPost.commentCount != undefined)
                itemPost.commentCount++;
        },
        async like(item: Item) {
            const postId: FormData = new FormData();
            if (item.post)
                postId.append("postId", item.post?.id.toString());
            await httpRequest.post(Defines.SERVER_LIKE_URL, postId);
            this.getAllUserPosts();
        },
    },
    created(): void {
        this.getAllUserPosts(this.username);
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
    color: #2196F3 !important;
}

/* 
.v-btn--plain:not(.v-btn--active):not(.v-btn--loading):not(:focus):not(:hover) 
.v-btn__content {
    opacity: 1 !important;
} */
</style>
