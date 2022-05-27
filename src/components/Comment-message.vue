<template>
    <!-- main-container -->
    <v-container grid-list-xs>
        <!-- leave-comment-area -->
        <v-row>
            <v-col class="d-flex align-center">
                <Avatar :user="currentUser" size="40" />
                <v-textarea v-model="comment" placeholder="leave comment..." auto-grow outlined rows="1" row-height="15"
                    hide-details>
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
                    <v-card-title primary-title class="text-decoration-underline">
                        Comment:
                    </v-card-title>
                    <v-card-text >
                        maccclooouf
                    </v-card-text>
                    <!-- comment-content -->
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Avatar from '../components/Avatar-cpn.vue';
import { mapState } from 'vuex';
import { httpRequest } from '../utils/http';
import * as Defines from '../utils/defines';
import { VueResponse } from '../utils/types';
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
        ]),
    },
    methods: {
        async send() {
            const data: FormData = new FormData();
            data.append("comment", this.comment);
            data.append("postId", this.postId.toString());
            const response: VueResponse = await httpRequest.post(Defines.SERVER_COMMENT_URL, data);
            this.comment = "";
        }
    },

});
</script>

<style lang="scss">
.v-input__append-inner {
    margin-top: 8px !important;
}
</style>