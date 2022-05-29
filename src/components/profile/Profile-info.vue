<template>
    <v-tab-item style="height: 100vh; overflow-y: hidden;">
        <!-- main-card -->
        <v-card flat max-width="600" class="mx-auto">
            <!-- header-title -->
            <v-card-title class="d-flex  flex-column justify-center align-center">
                <!-- user-avatar -->
                <span>{{ currentUser.name }}</span>
                <span style="position: relative">
                    <Avatar :user="currentUser" size="150" />
                    <v-btn icon color="primary" style="position: absolute; top: 122px; right: 18px; "
                        title="modify image">
                        <i class="fa-solid fa-camera" style="font-size: 20px;"></i>
                    </v-btn>
                </span>
            </v-card-title>
            <v-card-text>

                <v-container grid-list-xs>
                    <v-row>
                        <v-col>
                            <h3 class="text-decoration-underline">User's informations</h3>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <span class="mr-3">Last name: {{ currentUser.lname }} </span>
                        </v-col>
                        <v-col class="shrink">
                            <v-btn small color="primary">Modify</v-btn> <br>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <span class="mr-3">Name: {{ currentUser.name }} </span>
                        </v-col>
                        <v-col class="shrink">
                            <v-btn small color="primary">Modify</v-btn> <br>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <span class="mr-3">Username: {{ currentUser.username }} </span>
                        </v-col>
                        <v-col class="shrink">
                            <v-btn small color="primary">Modify</v-btn> <br>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <span class="mr-3">
                                description: {{ currentUser.description? currentUser.description : 'No description'  }}
                            </span>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <VTextarea outlined no-resize autoGrow v-model="description"
                                placeholder="New description here" rows=1 append="mdi-send">
                                <template v-slot:append>
                                    <v-btn icon color="primary" @click="send" title="send description">
                                        <v-icon>mdi-send</v-icon>
                                    </v-btn>
                                </template>
                            </VTextarea>
                        </v-col>

                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </v-tab-item>
</template>

<script lang="ts">
import { httpRequest } from '@/utils/http';
import Vue from 'vue';
import { mapState } from 'vuex';
import Avatar from '../cpn/Avatar-cpn.vue';
import * as Defines from '../../utils/defines';
export default Vue.extend({
    name: 'Profile-info',
    components: {
        Avatar,
    },
    data() {
        return {
            description: "",
        };
    },
    methods: {
        async send() {
            const description: FormData = new FormData();
            description.append("description", this.description);
            console.log('new description sent');
            await httpRequest.post(Defines.SERVER_DESCRIPTION_URL, description);
            this.currentUser.description = this.description;
            this.description = "";
        }
    },
    computed: {
        ...mapState([
            'currentUser',
        ]),
    },
});
</script>

