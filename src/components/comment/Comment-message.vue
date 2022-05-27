<template>
    <!-- main-container -->
    <v-container grid-list-xs>
        <!-- leave-comment-area -->
        <v-row>
            <v-col class="d-flex align-center">
                <Avatar :user="currentUser" size="40" />
                <v-textarea v-model="comment" placeholder="leave comment..." auto-grow outlined rows="1" row-height="15"
                    hide-details>
                    <!-- FIXME: fix btn bug sometimes does not appear - try to change with append directive -->
                    <!-- send-comment-button -->
                    <template v-slot:append>
                        <v-btn icon color="primary" @click="send">
                            <v-icon>mdi-send</v-icon>
                        </v-btn>
                    </template>
                </v-textarea>
            </v-col>
        </v-row>
        <!-- comment-message -->
        <v-row>
            <v-col>
                <v-card elevation="0">
                    <!-- comment-title -->
                    <v-card-title primary-title class="text-decoration-underline text-body-2 text-sm-body-1">
                        Comment:
                    </v-card-title>
                    <!-- comment-content-card -->
                    <v-card v-for="(item, index) in comments" :key="index" class="d-flex align-center mb-2"
                        elevation="0">
                        <Avatar :user="item.comment.author" size="40" class="flex-shrink-1" />
                        <div class="message-arrowed flex-grow-1 elevation-3" style="background-color:#2196F3; position: relative;">
                            <v-card-title primary-title class="text-body-2 text-sm-subtitle-1 white--text pa-2 mb-2">
                                {{ item.comment.author.name }}
                                said on
                                {{ item.creation }}
                            </v-card-title>
                            <div class="message-arrowed"></div>
                            <v-card-text class="white--text">
                                <div class="d-flex">
                                    {{ item.comment.content }}
                                </div>
                            </v-card-text>
                        </div>
                    </v-card>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Avatar from '../cpn/Avatar-cpn.vue';
import { mapState, mapActions } from 'vuex';
import { httpRequest } from '@/utils/http';
import * as Defines from '@/utils/defines';
export default Vue.extend({
    name: 'Comment-msg',
    components: {
        Avatar,
    },
    props: {
        postId: { type: Number, required: true },
    },
    data() {
        return {
            comment: "",
        };
    },
    computed: {
        ...mapState([
            'currentUser',
            'comments'
        ]),
    },
    methods: {
        ...mapActions([
            'getAllComments'
        ]),
        async send(): Promise<void> {
            const data: FormData = new FormData();
            data.append("comment", this.comment);
            data.append("postId", this.postId.toString());
            await httpRequest.post(Defines.SERVER_COMMENT_URL, data);
            this.comment = "";
            this.getAllComments(this.postId);
        }
    },
});
</script>

<style lang="scss">
.v-input__append-inner {
    margin-top: 8px !important;
}

.message-arrowed::after {
    content: "";
    position: absolute;
    left: -26px;
    top: 28%;
    border: solid transparent 15px;
    border-left: solid transparent 15px;
    border-right: solid #2196F3 15px;
}
</style>