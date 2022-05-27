<template>
    <div class="comment">
        <v-lazy v-model="isActive" :options="{
            threshold: 0.5
        }" min-height="200" transition="fade-transition">
            <div class="publication">
                <!-- main-container -->
                <v-container grid-list-xs fluid>
                    <v-row no-gutters>
                        <v-col>
                            <!-- publication-card -->
                            <v-card max-width="700" class=" mx-auto mb-8" v-for="(item, index) in posts" :key="index">
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
                                            <v-col class="d-flex justify-center pa-0">
                                                <v-btn text plain :ripple="false" @click="showComment(item)">
                                                    comments<i class="fa fa-comment-dots"></i>
                                                </v-btn>
                                            </v-col>
                                            <!-- like-button -->
                                            <v-col class="d-flex justify-center pa-0">
                                                <v-btn icon plain :ripple="false">
                                                    <i class="fa fa-heart"></i>
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
        <Comment :dialog="dialog" @stop="closeComment" :itemComPub="item" />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import Avatar from '@/components/cpn/Avatar-cpn.vue';
import Comment from '@/components/comment/Comment-block.vue';
import { Item } from '../../utils/types';

export default Vue.extend({
    name: "Publication-cpn",
    components: {
        Avatar,
        Comment,
    },
    data() {
        return {
            isActive: false,
            dialog: false,
            item: {},
            comments: [],
        };
    },
    computed: {
        ...mapState([
            'posts'
        ]),
    },
    methods: {
        ...mapActions([
            'getAllPosts',
            'getAllComments',
            'updateComments'
        ]),
        showComment(item: Item): void {
            if (item.post) {
                this.getAllComments(item.post.id);
                this.dialog = true;
                this.item = item;
            }
        },
        closeComment() {
            this.dialog = false;
            this.updateComments([]);

        }
    },
    created(): void {
        this.getAllPosts();
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
</style>
